import type { PageContent } from './types';

interface Chunk {
  content: string;
  pageNumber: number | null;
  sectionHeader: string | null;
  tokenCount: number;
}

const TARGET_CHUNK_SIZE = 600; // tokens
const MAX_CHUNK_SIZE = 800;
const OVERLAP_SIZE = 100;

/** Rough token count estimate (~4 chars per token for mixed Arabic/English) */
function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

/** Split text into sentences (handles both English and Arabic punctuation) */
function splitSentences(text: string): string[] {
  return text
    .split(/(?<=[.!?\u061F\u060C\n])\s+/)
    .filter((s) => s.trim().length > 0);
}

/** Detect if a line is a section header */
function isSectionHeader(line: string): boolean {
  const trimmed = line.trim();
  if (trimmed.length === 0 || trimmed.length > 120) return false;

  // Numbered sections: "1.", "1.1", "Chapter 1", etc.
  if (/^(\d+\.?\d*\s|chapter\s|section\s)/i.test(trimmed)) return true;

  // All caps lines (likely headers)
  if (trimmed === trimmed.toUpperCase() && trimmed.length > 3 && trimmed.length < 80) return true;

  // Short lines ending without punctuation (likely headers)
  if (trimmed.length < 60 && !/[.!?\u061F]$/.test(trimmed)) return true;

  return false;
}

/**
 * Chunk text from extracted pages into semantically meaningful chunks
 * with overlap for context continuity.
 */
export function chunkText(pages: PageContent[]): Chunk[] {
  const chunks: Chunk[] = [];
  let currentChunk = '';
  let currentHeader: string | null = null;
  let currentPage: number | null = null;

  function flushChunk() {
    const trimmed = currentChunk.trim();
    if (trimmed.length > 0) {
      chunks.push({
        content: trimmed,
        pageNumber: currentPage,
        sectionHeader: currentHeader,
        tokenCount: estimateTokens(trimmed),
      });
    }
    currentChunk = '';
  }

  function addOverlap(): string {
    if (chunks.length === 0) return '';
    const lastChunk = chunks[chunks.length - 1].content;
    const sentences = splitSentences(lastChunk);

    // Take sentences from the end until we hit ~OVERLAP_SIZE tokens
    let overlap = '';
    for (let i = sentences.length - 1; i >= 0; i--) {
      const candidate = sentences[i] + ' ' + overlap;
      if (estimateTokens(candidate) > OVERLAP_SIZE) break;
      overlap = candidate.trim();
    }
    return overlap ? overlap + '\n\n' : '';
  }

  for (const page of pages) {
    const lines = page.text.split('\n');

    for (const line of lines) {
      const trimmedLine = line.trim();
      if (trimmedLine.length === 0) continue;

      // Check for section header
      if (isSectionHeader(trimmedLine)) {
        // Flush current chunk before starting new section
        if (currentChunk.trim().length > 0) {
          flushChunk();
        }
        currentHeader = trimmedLine;
        currentPage = page.pageNumber;
        currentChunk = addOverlap();
        continue;
      }

      currentPage = currentPage ?? page.pageNumber;
      currentChunk += (currentChunk.length > 0 ? '\n' : '') + trimmedLine;

      // Check if chunk is getting too large
      if (estimateTokens(currentChunk) >= TARGET_CHUNK_SIZE) {
        if (estimateTokens(currentChunk) >= MAX_CHUNK_SIZE) {
          // Force split at sentence boundary
          const sentences = splitSentences(currentChunk);
          let accumulated = '';
          for (const sentence of sentences) {
            if (estimateTokens(accumulated + ' ' + sentence) > TARGET_CHUNK_SIZE && accumulated.length > 0) {
              currentChunk = accumulated;
              flushChunk();
              accumulated = addOverlap() + sentence;
            } else {
              accumulated += (accumulated.length > 0 ? ' ' : '') + sentence;
            }
          }
          currentChunk = accumulated;
        }
      }
    }
  }

  // Flush remaining content
  flushChunk();

  return chunks;
}

/**
 * Create a visual chunk from a Claude Vision description.
 */
export function createVisualChunk(
  description: string,
  pageNumber: number,
): Chunk {
  return {
    content: description,
    pageNumber,
    sectionHeader: `[Visual content - Page ${pageNumber}]`,
    tokenCount: estimateTokens(description),
  };
}
