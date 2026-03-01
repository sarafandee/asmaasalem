import { NextRequest, NextResponse } from 'next/server';
import { createId } from '@paralleldrive/cuid2';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { getSessionUser } from '@/lib/auth';

export async function GET() {
  try {
    const user = await getSessionUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required.' }, { status: 403 });
    }

    const allUsers = db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
        locale: users.locale,
        createdAt: users.createdAt,
      })
      .from(users)
      .orderBy(users.createdAt)
      .all();

    return NextResponse.json(allUsers);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch users.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getSessionUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required.' }, { status: 403 });
    }

    const body = await request.json();
    const { name, email, password, role, locale } = body;

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json({ error: 'Name is required (min 2 characters).' }, { status: 400 });
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Valid email is required.' }, { status: 400 });
    }

    if (!password || typeof password !== 'string' || password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters.' }, { status: 400 });
    }

    const existing = db.select().from(users).where(eq(users.email, email.trim())).get();
    if (existing) {
      return NextResponse.json({ error: 'A user with this email already exists.' }, { status: 409 });
    }

    const id = createId();
    const passwordHash = await bcrypt.hash(password, 12);

    db.insert(users).values({
      id,
      name: name.trim(),
      email: email.trim(),
      passwordHash,
      role: role === 'admin' ? 'admin' : 'user',
      locale: locale === 'en' ? 'en' : 'ar',
    }).run();

    const newUser = db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
        locale: users.locale,
        createdAt: users.createdAt,
      })
      .from(users)
      .where(eq(users.id, id))
      .get();

    return NextResponse.json(newUser, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create user.' }, { status: 500 });
  }
}
