import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { testSessions, clients, users } from '@/lib/db/schema';
import { getSessionUser } from '@/lib/auth';
import { validateColorSequence } from '@/lib/luscher/engine/validation';
import { generateReport } from '@/lib/luscher/engine/interpreter';
import type { ColorSequence } from '@/lib/luscher/types';

type RouteParams = { params: Promise<{ testId: string }> };

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { testId } = await params;
    const test = db.select().from(testSessions).where(eq(testSessions.id, testId)).get();

    if (!test) {
      return NextResponse.json({ error: 'Test session not found.' }, { status: 404 });
    }

    return NextResponse.json({
      ...test,
      selection1: JSON.parse(test.selection1),
      selection2: JSON.parse(test.selection2),
      results: test.results ? JSON.parse(test.results) : null,
    });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch test session.' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { testId } = await params;
    const existing = db.select().from(testSessions).where(eq(testSessions.id, testId)).get();
    if (!existing) {
      return NextResponse.json({ error: 'Test session not found.' }, { status: 404 });
    }

    const body = await request.json();
    const updates: Record<string, unknown> = {};
    let needsReanalysis = false;

    // Simple field updates
    if (body.notes !== undefined) updates.notes = body.notes?.trim() || null;
    if (body.status !== undefined) updates.status = body.status;

    // Selection changes (admin only — triggers re-analysis)
    if (body.selection1 !== undefined) {
      if (user.role !== 'admin') {
        return NextResponse.json({ error: 'Admin access required to edit selections.' }, { status: 403 });
      }
      const v = validateColorSequence(body.selection1);
      if (!v.valid) {
        return NextResponse.json({ error: `Selection 1 invalid: ${v.errors.join(', ')}` }, { status: 400 });
      }
      updates.selection1 = JSON.stringify(body.selection1);
      needsReanalysis = true;
    }

    if (body.selection2 !== undefined) {
      if (user.role !== 'admin') {
        return NextResponse.json({ error: 'Admin access required to edit selections.' }, { status: 403 });
      }
      const v = validateColorSequence(body.selection2);
      if (!v.valid) {
        return NextResponse.json({ error: `Selection 2 invalid: ${v.errors.join(', ')}` }, { status: 400 });
      }
      updates.selection2 = JSON.stringify(body.selection2);
      needsReanalysis = true;
    }

    // Client reassignment (admin only)
    if (body.clientId !== undefined) {
      if (user.role !== 'admin') {
        return NextResponse.json({ error: 'Admin access required to reassign client.' }, { status: 403 });
      }
      const client = db.select().from(clients).where(eq(clients.id, body.clientId)).get();
      if (!client) {
        return NextResponse.json({ error: 'Client not found.' }, { status: 404 });
      }
      updates.clientId = body.clientId;
      needsReanalysis = true;
    }

    // Instructor reassignment (admin only)
    if (body.instructorId !== undefined) {
      if (user.role !== 'admin') {
        return NextResponse.json({ error: 'Admin access required to reassign instructor.' }, { status: 403 });
      }
      const instructor = db.select().from(users).where(eq(users.id, body.instructorId)).get();
      if (!instructor) {
        return NextResponse.json({ error: 'Instructor not found.' }, { status: 404 });
      }
      updates.instructorId = body.instructorId;
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: 'No fields to update.' }, { status: 400 });
    }

    // Re-run analysis if selections or client changed
    if (needsReanalysis) {
      const sel1 = updates.selection1
        ? JSON.parse(updates.selection1 as string)
        : JSON.parse(existing.selection1);
      const sel2 = updates.selection2
        ? JSON.parse(updates.selection2 as string)
        : JSON.parse(existing.selection2);

      const clientId = (updates.clientId as string) || existing.clientId;
      const client = db.select().from(clients).where(eq(clients.id, clientId)).get();

      const report = generateReport({
        id: testId,
        firstSelection: sel1 as ColorSequence,
        secondSelection: sel2 as ColorSequence,
        clientName: client?.name,
        clientAge: client?.age ?? undefined,
        clientGender: client?.gender ?? undefined,
      });

      updates.results = JSON.stringify(report);
    }

    db.update(testSessions).set(updates).where(eq(testSessions.id, testId)).run();
    const updated = db.select().from(testSessions).where(eq(testSessions.id, testId)).get();

    return NextResponse.json({
      ...updated,
      selection1: JSON.parse(updated!.selection1),
      selection2: JSON.parse(updated!.selection2),
      results: updated!.results ? JSON.parse(updated!.results) : null,
    });
  } catch {
    return NextResponse.json({ error: 'Failed to update test session.' }, { status: 500 });
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

    const { testId } = await params;
    const existing = db.select().from(testSessions).where(eq(testSessions.id, testId)).get();
    if (!existing) {
      return NextResponse.json({ error: 'Test session not found.' }, { status: 404 });
    }

    db.delete(testSessions).where(eq(testSessions.id, testId)).run();
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete test session.' }, { status: 500 });
  }
}
