import { NextRequest, NextResponse } from 'next/server';
import { createId } from '@paralleldrive/cuid2';
import { eq, desc } from 'drizzle-orm';
import { db } from '@/lib/db';
import { chatSessions, users } from '@/lib/db/schema';
import { getSessionUser } from '@/lib/auth';

export async function GET() {
  try {
    const user = await getSessionUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const sessions = db
      .select()
      .from(chatSessions)
      .where(eq(chatSessions.userId, user.id))
      .orderBy(desc(chatSessions.updatedAt))
      .all();

    return NextResponse.json(sessions);
  } catch (err) {
    console.error('[RAG Sessions] List error:', err);
    return NextResponse.json({ error: 'Failed to fetch sessions.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getSessionUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify user exists in DB (JWT may reference a stale user ID after re-seed)
    const dbUser = db.select({ id: users.id }).from(users).where(eq(users.id, user.id)).get();
    if (!dbUser) {
      return NextResponse.json(
        { error: 'Session expired. Please log out and log back in.' },
        { status: 401 },
      );
    }

    const body = await request.json();
    const title = body.title || 'New Chat';

    const id = createId();
    db.insert(chatSessions).values({
      id,
      title,
      userId: user.id,
    }).run();

    const session = db.select().from(chatSessions).where(eq(chatSessions.id, id)).get();
    return NextResponse.json(session, { status: 201 });
  } catch (err) {
    console.error('[RAG Sessions] Create error:', err);
    return NextResponse.json({ error: 'Failed to create session.' }, { status: 500 });
  }
}
