import * as lancedb from '@lancedb/lancedb';
import type { Table } from '@lancedb/lancedb';
import type { ChunkWithVector } from './types';

const DB_PATH = './data/lancedb';
const TABLE_NAME = 'document_chunks';

let dbInstance: lancedb.Connection | null = null;

async function getDb(): Promise<lancedb.Connection> {
  if (!dbInstance) {
    dbInstance = await lancedb.connect(DB_PATH);
  }
  return dbInstance;
}

export async function getChunksTable(): Promise<Table> {
  const db = await getDb();
  const tables = await db.tableNames();

  if (tables.includes(TABLE_NAME)) {
    return db.openTable(TABLE_NAME);
  }

  // Create with a dummy record then delete it — LanceDB requires data to infer schema
  const table = await db.createTable(TABLE_NAME, [
    {
      id: '__init__',
      documentId: '',
      documentName: '',
      content: '',
      chunkIndex: 0,
      pageNumber: 0,
      sectionHeader: '',
      chunkType: 'text',
      tokenCount: 0,
      vector: new Array(1536).fill(0),
    },
  ]);
  await table.delete('"id" = \'__init__\'');
  return table;
}

export async function insertChunks(chunks: ChunkWithVector[]): Promise<void> {
  if (chunks.length === 0) return;
  const table = await getChunksTable();
  // Cast to satisfy LanceDB's Data type (Record<string, unknown>[])
  await table.add(chunks as unknown as Record<string, unknown>[]);
}

export async function searchChunks(
  queryVector: number[],
  limit: number = 8,
): Promise<Array<ChunkWithVector & { _distance: number }>> {
  const table = await getChunksTable();
  const results = await table
    .search(queryVector)
    .limit(limit)
    .toArray();
  return results as Array<ChunkWithVector & { _distance: number }>;
}

export async function deleteDocumentChunks(documentId: string): Promise<void> {
  const table = await getChunksTable();
  await table.delete(`"documentId" = '${documentId}'`);
}
