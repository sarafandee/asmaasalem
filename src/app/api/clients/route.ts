import { NextRequest, NextResponse } from 'next/server';
import { createId } from '@paralleldrive/cuid2';
import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { clients } from '@/lib/db/schema';
import { getSessionUser } from '@/lib/auth';

export async function GET() {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const allClients = db.select().from(clients).orderBy(clients.createdAt).all();
    return NextResponse.json(allClients);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch clients.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, email, phone, age, gender, notes } = body;

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json({ error: 'Name is required (min 2 characters).' }, { status: 400 });
    }

    if (email && typeof email === 'string' && email.trim()) {
      const existing = db.select().from(clients).where(eq(clients.email, email.trim())).get();
      if (existing) {
        return NextResponse.json({ error: 'A client with this email already exists.' }, { status: 409 });
      }
    }

    const id = createId();
    db.insert(clients).values({
      id,
      name: name.trim(),
      email: email?.trim() || null,
      phone: phone?.trim() || null,
      age: age ? Number(age) : null,
      gender: gender || null,
      notes: notes?.trim() || null,
      createdBy: user.id,
    }).run();

    const newClient = db.select().from(clients).where(eq(clients.id, id)).get();
    return NextResponse.json(newClient, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create client.' }, { status: 500 });
  }
}
