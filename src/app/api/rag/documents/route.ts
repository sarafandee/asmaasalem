import { NextRequest, NextResponse } from 'next/server';
import { createId } from '@paralleldrive/cuid2';
import { eq } from 'drizzle-orm';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { db } from '@/lib/db';
import { documents } from '@/lib/db/schema';
import { getSessionUser } from '@/lib/auth';

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const ALLOWED_TYPES = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
const TYPE_MAP: Record<string, 'pdf' | 'docx'> = {
  'application/pdf': 'pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
};

export async function GET() {
  try {
    const user = await getSessionUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const allDocs = db.select().from(documents).orderBy(documents.createdAt).all();
    return NextResponse.json(allDocs);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch documents.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getSessionUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided.' }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ error: 'Only PDF and DOCX files are supported.' }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'File size exceeds 50MB limit.' }, { status: 400 });
    }

    const id = createId();
    const fileType = TYPE_MAP[file.type];
    const ext = fileType === 'pdf' ? '.pdf' : '.docx';
    const uploadDir = path.join('./data/uploads', id);
    const filePath = path.join(uploadDir, `original${ext}`);

    await mkdir(uploadDir, { recursive: true });

    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(filePath, buffer);

    db.insert(documents).values({
      id,
      fileName: file.name,
      fileType,
      fileSize: file.size,
      filePath,
      status: 'pending',
      uploadedBy: user.id,
    }).run();

    const newDoc = db.select().from(documents).where(eq(documents.id, id)).get();

    return NextResponse.json(newDoc, { status: 201 });
  } catch (err) {
    console.error('Document upload error:', err);
    return NextResponse.json({ error: 'Failed to upload document.' }, { status: 500 });
  }
}
