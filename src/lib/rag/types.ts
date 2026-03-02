export interface DocumentChunkRecord {
  id: string;
  documentId: string;
  documentName: string;
  content: string;
  chunkIndex: number;
  pageNumber: number | null;
  sectionHeader: string | null;
  chunkType: 'text' | 'visual';
  tokenCount: number;
}

export interface ChunkWithVector extends DocumentChunkRecord {
  vector: number[];
}

export interface RetrievedChunk extends DocumentChunkRecord {
  score: number;
}

export interface ProcessingResult {
  pageCount: number;
  chunkCount: number;
  error?: string;
}

export interface PageContent {
  pageNumber: number;
  text: string;
}
