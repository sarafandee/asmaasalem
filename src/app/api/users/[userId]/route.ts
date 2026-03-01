import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { getSessionUser } from '@/lib/auth';

type RouteParams = { params: Promise<{ userId: string }> };

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const user = await getSessionUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required.' }, { status: 403 });
    }

    const { userId } = await params;
    const target = db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
        locale: users.locale,
        createdAt: users.createdAt,
      })
      .from(users)
      .where(eq(users.id, userId))
      .get();

    if (!target) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    return NextResponse.json(target);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch user.' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await getSessionUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required.' }, { status: 403 });
    }

    const { userId } = await params;
    const existing = db.select().from(users).where(eq(users.id, userId)).get();
    if (!existing) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    const body = await request.json();
    const updates: Record<string, unknown> = {};

    if (body.name !== undefined) updates.name = body.name.trim();
    if (body.email !== undefined) updates.email = body.email.trim();
    if (body.role !== undefined) updates.role = body.role;
    if (body.locale !== undefined) updates.locale = body.locale;
    if (body.password !== undefined && body.password.length >= 6) {
      updates.passwordHash = await bcrypt.hash(body.password, 12);
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: 'No fields to update.' }, { status: 400 });
    }

    db.update(users).set(updates).where(eq(users.id, userId)).run();

    const updated = db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
        locale: users.locale,
        createdAt: users.createdAt,
      })
      .from(users)
      .where(eq(users.id, userId))
      .get();

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: 'Failed to update user.' }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  try {
    const user = await getSessionUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required.' }, { status: 403 });
    }

    const { userId } = await params;

    // Prevent deleting yourself
    if (userId === user.id) {
      return NextResponse.json({ error: 'Cannot delete your own account.' }, { status: 400 });
    }

    const existing = db.select().from(users).where(eq(users.id, userId)).get();
    if (!existing) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    db.delete(users).where(eq(users.id, userId)).run();
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete user.' }, { status: 500 });
  }
}
