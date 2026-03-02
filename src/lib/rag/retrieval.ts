import { embedText } from './embeddings';
import { searchChunks } from './lancedb';
import type { RetrievedChunk } from './types';

const DEFAULT_LIMIT = 8;

/**
 * Retrieve the most relevant chunks for a user query.
 * Embeds the query, searches LanceDB, and returns ranked results.
 */
export async function retrieveChunks(
  query: string,
  limit: number = DEFAULT_LIMIT,
): Promise<RetrievedChunk[]> {
  const queryVector = await embedText(query);
  const results = await searchChunks(queryVector, limit);

  return results.map((r) => ({
    id: r.id,
    documentId: r.documentId,
    documentName: r.documentName,
    content: r.content,
    chunkIndex: r.chunkIndex,
    pageNumber: r.pageNumber,
    sectionHeader: r.sectionHeader,
    chunkType: r.chunkType as 'text' | 'visual',
    tokenCount: r.tokenCount,
    // LanceDB returns _distance (L2), convert to similarity score
    score: 1 / (1 + r._distance),
  }));
}
