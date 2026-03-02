import { NextRequest, NextResponse } from 'next/server';
import { eq, asc } from 'drizzle-orm';
import { db } from '@/lib/db';
import { chatSessions, chatMessages } from '@/lib/db/schema';
import { getSessionUser } from '@/lib/auth';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> },
) {
  try {
    const user = await getSessionUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { sessionId } = await params;
    const session = db.select().from(chatSessions).where(eq(chatSessions.id, sessionId)).get();

    if (!session) {
      return NextResponse.json({ error: 'Session not found.' }, { status: 404 });
    }

    const messages = db
      .select()
      .from(chatMessages)
      .where(eq(chatMessages.sessionId, sessionId))
      .orderBy(asc(chatMessages.createdAt))
      .all();

    return NextResponse.json({ ...session, messages });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch session.' }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> },
) {
  try {
    const user = await getSessionUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { sessionId } = await params;
    const session = db.select().from(chatSessions).where(eq(chatSessions.id, sessionId)).get();

    if (!session) {
      return NextResponse.json({ error: 'Session not found.' }, { status: 404 });
    }

    // Messages are cascade-deleted
    db.delete(chatSessions).where(eq(chatSessions.id, sessionId)).run();

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete session.' }, { status: 500 });
  }
}
