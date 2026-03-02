import { readFile, mkdir } from 'fs/promises';
import path from 'path';
import { createId } from '@paralleldrive/cuid2';
import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { documents } from '@/lib/db/schema';
import { chunkText, createVisualChunk } from './chunking';
import { embedBatch } from './embeddings';
import { insertChunks, deleteDocumentChunks } from './lancedb';
import { describePageVisual, isVisualHeavyPage } from './vision';
import type { PageContent, ChunkWithVector, ProcessingResult } from './types';

/**
 * Extract text content from a PDF file, returning per-page text.
 */
async function extractPdfPages(filePath: string): Promise<PageContent[]> {
  // Import from lib directly to avoid pdf-parse's test code that runs on default import
  const pdfParse = (await import('pdf-parse/lib/pdf-parse.js')).default;
  const buffer = await readFile(filePath);

  // pdf-parse v1: use pagerender callback to get per-page text
  const pages: PageContent[] = [];
  let pageNum = 0;

  await pdfParse(buffer, {
    pagerender: (pageData: { getTextContent: () => Promise<{ items: Array<{ str: string }> }> }) => {
      pageNum++;
      const currentPageNum = pageNum;
      return pageData.getTextContent().then((textContent) => {
        const text = textContent.items.map((item) => item.str).join(' ');
        pages.push({ pageNumber: currentPageNum, text });
        return text;
      });
    },
  });

  // Sort by page number (callbacks may resolve out of order)
  pages.sort((a, b) => a.pageNumber - b.pageNumber);
  return pages;
}

/**
 * Extract text content from a DOCX file.
 */
async function extractDocxText(filePath: string): Promise<PageContent[]> {
  const mammoth = await import('mammoth');
  const buffer = await readFile(filePath);
  const result = await mammoth.extractRawText({ buffer });

  // DOCX doesn't have natural page breaks — treat as one logical page
  return [{ pageNumber: 1, text: result.value }];
}

/**
 * Render PDF pages to images for visual processing.
 */
async function renderPdfPages(
  filePath: string,
  pageNumbers: number[],
  documentId: string,
): Promise<Map<number, Buffer>> {
  const { pdf } = await import('pdf-to-img');
  const pageImages = new Map<number, Buffer>();

  const pagesDir = path.join('./data/uploads', documentId, 'pages');
  await mkdir(pagesDir, { recursive: true });

  let pageIndex = 0;
  for await (const image of await pdf(filePath, { scale: 2 })) {
    pageIndex++;
    if (pageNumbers.includes(pageIndex)) {
      const buffer = Buffer.from(image);
      pageImages.set(pageIndex, buffer);
    }
  }

  return pageImages;
}

/**
 * Full document processing pipeline:
 * Extract text → detect visuals → describe visuals → chunk → embed → store
 */
export async function processDocument(documentId: string): Promise<ProcessingResult> {
  // Update status to processing
  db.update(documents)
    .set({ status: 'processing' })
    .where(eq(documents.id, documentId))
    .run();

  try {
    const doc = db.select().from(documents).where(eq(documents.id, documentId)).get();
    if (!doc) throw new Error('Document not found');

    // Clean up any existing chunks from a previous attempt
    await deleteDocumentChunks(documentId);

    // Step 1: Extract text
    const filePath = doc.filePath;
    let pages: PageContent[];

    if (doc.fileType === 'pdf') {
      pages = await extractPdfPages(filePath);
    } else {
      pages = await extractDocxText(filePath);
    }

    const pageCount = pages.length;

    // Step 2: Detect visual-heavy pages (PDF only)
    const visualPageNumbers: number[] = [];
    if (doc.fileType === 'pdf') {
      for (const page of pages) {
        if (isVisualHeavyPage(page.text)) {
          visualPageNumbers.push(page.pageNumber);
        }
      }
    }

    // Step 3: Process visuals with Claude Vision
    const visualChunks: Array<{ content: string; pageNumber: number }> = [];
    if (visualPageNumbers.length > 0) {
      // Limit vision processing to avoid excessive cost
      const maxVisualPages = 30;
      const pagesToProcess = visualPageNumbers.slice(0, maxVisualPages);

      const pageImages = await renderPdfPages(filePath, pagesToProcess, documentId);

      for (const [pageNum, imageBuffer] of pageImages) {
        try {
          const description = await describePageVisual(imageBuffer, pageNum);
          if (description.trim()) {
            visualChunks.push({ content: description, pageNumber: pageNum });
          }
        } catch (err) {
          console.error(`Vision processing failed for page ${pageNum}:`, err);
          // Continue with other pages
        }
      }
    }

    // Step 4: Chunk text
    const textChunks = chunkText(pages);
    const allChunks = [
      ...textChunks.map((c) => ({ ...c, chunkType: 'text' as const })),
      ...visualChunks.map((vc) => {
        const visual = createVisualChunk(vc.content, vc.pageNumber);
        return { ...visual, chunkType: 'visual' as const };
      }),
    ];

    if (allChunks.length === 0) {
      throw new Error('No content could be extracted from the document');
    }

    // Step 5: Embed all chunks
    const texts = allChunks.map((c) => c.content);
    const embeddings = await embedBatch(texts);

    // Step 6: Store in LanceDB
    const chunksWithVectors: ChunkWithVector[] = allChunks.map((chunk, i) => ({
      id: createId(),
      documentId,
      documentName: doc.fileName,
      content: chunk.content,
      chunkIndex: i,
      pageNumber: chunk.pageNumber,
      sectionHeader: chunk.sectionHeader,
      chunkType: chunk.chunkType,
      tokenCount: chunk.tokenCount,
      vector: embeddings[i],
    }));

    await insertChunks(chunksWithVectors);

    // Step 7: Finalize
    const now = new Date();
    db.update(documents)
      .set({
        status: 'completed',
        pageCount,
        chunkCount: allChunks.length,
        processedAt: now,
        error: null,
      })
      .where(eq(documents.id, documentId))
      .run();

    return { pageCount, chunkCount: allChunks.length };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    db.update(documents)
      .set({ status: 'failed', error: errorMessage })
      .where(eq(documents.id, documentId))
      .run();

    // Clean up partial chunks
    try {
      await deleteDocumentChunks(documentId);
    } catch {
      // Ignore cleanup errors
    }

    return { pageCount: 0, chunkCount: 0, error: errorMessage };
  }
}
