import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { documents } from '@/lib/db/schema';
import { getSessionUser } from '@/lib/auth';
import { deleteDocumentChunks } from '@/lib/rag/lancedb';
import { processDocument } from '@/lib/rag/processing';

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ documentId: string }> },
) {
  try {
    const user = await getSessionUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { documentId } = await params;
    const doc = db.select().from(documents).where(eq(documents.id, documentId)).get();

    if (!doc) {
      return NextResponse.json({ error: 'Document not found.' }, { status: 404 });
    }

    // Reset: delete existing chunks, set status to pending
    await deleteDocumentChunks(documentId);
    db.update(documents)
      .set({ status: 'pending', chunkCount: null, error: null })
      .where(eq(documents.id, documentId))
      .run();

    const result = await processDocument(documentId);

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      pageCount: result.pageCount,
      chunkCount: result.chunkCount,
    });
  } catch {
    return NextResponse.json({ error: 'Failed to reprocess document.' }, { status: 500 });
  }
}
