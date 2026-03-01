import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { clients, testSessions } from '@/lib/db/schema';
import { getSessionUser } from '@/lib/auth';

type RouteParams = { params: Promise<{ clientId: string }> };

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { clientId } = await params;
    const client = db.select().from(clients).where(eq(clients.id, clientId)).get();

    if (!client) {
      return NextResponse.json({ error: 'Client not found.' }, { status: 404 });
    }

    // Fetch associated test sessions
    const tests = db.select().from(testSessions).where(eq(testSessions.clientId, clientId)).all();

    return NextResponse.json({ ...client, testSessions: tests });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch client.' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { clientId } = await params;
    const existing = db.select().from(clients).where(eq(clients.id, clientId)).get();
    if (!existing) {
      return NextResponse.json({ error: 'Client not found.' }, { status: 404 });
    }

    const body = await request.json();
    const updates: Record<string, unknown> = {};

    if (body.name !== undefined) updates.name = body.name.trim();
    if (body.email !== undefined) updates.email = body.email?.trim() || null;
    if (body.phone !== undefined) updates.phone = body.phone?.trim() || null;
    if (body.age !== undefined) updates.age = body.age ? Number(body.age) : null;
    if (body.gender !== undefined) updates.gender = body.gender || null;
    if (body.notes !== undefined) updates.notes = body.notes?.trim() || null;

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: 'No fields to update.' }, { status: 400 });
    }

    db.update(clients).set(updates).where(eq(clients.id, clientId)).run();
    const updated = db.select().from(clients).where(eq(clients.id, clientId)).get();

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: 'Failed to update client.' }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (user.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required.' }, { status: 403 });
    }

    const { clientId } = await params;
    const existing = db.select().from(clients).where(eq(clients.id, clientId)).get();
    if (!existing) {
      return NextResponse.json({ error: 'Client not found.' }, { status: 404 });
    }

    db.delete(clients).where(eq(clients.id, clientId)).run();
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete client.' }, { status: 500 });
  }
}
