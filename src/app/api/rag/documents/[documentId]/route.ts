import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { rm } from 'fs/promises';
import path from 'path';
import { db } from '@/lib/db';
import { documents } from '@/lib/db/schema';
import { getSessionUser } from '@/lib/auth';
import { deleteDocumentChunks } from '@/lib/rag/lancedb';

export async function GET(
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

    return NextResponse.json(doc);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch document.' }, { status: 500 });
  }
}

export async function DELETE(
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

    // Delete chunks from LanceDB
    await deleteDocumentChunks(documentId);

    // Delete from SQLite
    db.delete(documents).where(eq(documents.id, documentId)).run();

    // Delete files from disk
    const uploadDir = path.join('./data/uploads', documentId);
    try {
      await rm(uploadDir, { recursive: true, force: true });
    } catch {
      // File cleanup is best-effort
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete document.' }, { status: 500 });
  }
}
