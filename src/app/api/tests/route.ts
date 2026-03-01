import { NextRequest, NextResponse } from 'next/server';
import { createId } from '@paralleldrive/cuid2';
import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { testSessions, clients } from '@/lib/db/schema';
import { getSessionUser } from '@/lib/auth';
import { validateColorSequence } from '@/lib/luscher/engine/validation';
import { generateReport } from '@/lib/luscher/engine/interpreter';
import type { ColorSequence } from '@/lib/luscher/types';

export async function GET() {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const allTests = db
      .select({
        id: testSessions.id,
        clientId: testSessions.clientId,
        clientName: clients.name,
        instructorId: testSessions.instructorId,
        status: testSessions.status,
        notes: testSessions.notes,
        createdAt: testSessions.createdAt,
      })
      .from(testSessions)
      .leftJoin(clients, eq(testSessions.clientId, clients.id))
      .orderBy(testSessions.createdAt)
      .all();

    return NextResponse.json(allTests);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch tests.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { clientId, selection1, selection2, notes } = body;

    // Validate clientId
    if (!clientId || typeof clientId !== 'string') {
      return NextResponse.json({ error: 'Client ID is required.' }, { status: 400 });
    }

    const client = db.select().from(clients).where(eq(clients.id, clientId)).get();
    if (!client) {
      return NextResponse.json({ error: 'Client not found.' }, { status: 404 });
    }

    // Validate both color selections
    const v1 = validateColorSequence(selection1);
    if (!v1.valid) {
      return NextResponse.json({ error: `Selection 1 invalid: ${v1.errors.join(', ')}` }, { status: 400 });
    }

    const v2 = validateColorSequence(selection2);
    if (!v2.valid) {
      return NextResponse.json({ error: `Selection 2 invalid: ${v2.errors.join(', ')}` }, { status: 400 });
    }

    // Generate the Luscher report
    const id = createId();
    const report = generateReport({
      id,
      firstSelection: v1.sequence as ColorSequence,
      secondSelection: v2.sequence as ColorSequence,
      clientName: client.name,
      clientAge: client.age ?? undefined,
      clientGender: client.gender ?? undefined,
    });

    // Store in database
    db.insert(testSessions).values({
      id,
      clientId,
      instructorId: user.id,
      selection1: JSON.stringify(selection1),
      selection2: JSON.stringify(selection2),
      results: JSON.stringify(report),
      status: 'completed',
      notes: notes?.trim() || null,
    }).run();

    return NextResponse.json(report, { status: 201 });
  } catch (err) {
    console.error('Failed to create test:', err);
    return NextResponse.json({ error: 'Failed to create test session.' }, { status: 500 });
  }
}
