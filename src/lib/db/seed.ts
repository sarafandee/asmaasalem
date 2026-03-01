import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import bcrypt from 'bcryptjs';
import { createId } from '@paralleldrive/cuid2';
import * as schema from './schema';
import { generateReport } from '../luscher/engine/interpreter';
import type { ColorSequence } from '../luscher/types';
import path from 'path';
import fs from 'fs';

const DB_PATH = process.env.DATABASE_PATH || path.join(process.cwd(), 'data', 'luscher.db');

// ---------- Color Sequences (varied to produce different prognoses) ----------

const SEQUENCES: [number[], number[]][] = [
  // ~Favorable pairs (2nd selection fewer ! than 1st)
  [[3, 1, 2, 4, 5, 0, 6, 7], [1, 2, 3, 4, 5, 0, 6, 7]],
  [[4, 3, 1, 2, 5, 6, 0, 7], [2, 1, 4, 3, 5, 0, 6, 7]],
  [[2, 4, 3, 1, 0, 5, 7, 6], [1, 4, 2, 3, 5, 0, 6, 7]],
  [[3, 4, 2, 1, 7, 5, 6, 0], [3, 4, 1, 2, 5, 0, 6, 7]],
  [[1, 3, 4, 2, 6, 5, 7, 0], [4, 1, 3, 2, 5, 0, 6, 7]],
  [[4, 2, 3, 1, 7, 0, 5, 6], [2, 3, 4, 1, 5, 0, 6, 7]],
  [[0, 3, 2, 4, 5, 1, 7, 6], [3, 2, 4, 1, 5, 0, 6, 7]],
  [[7, 1, 3, 4, 2, 5, 0, 6], [1, 3, 4, 2, 5, 0, 6, 7]],
  [[6, 4, 2, 3, 1, 5, 0, 7], [4, 2, 3, 1, 5, 0, 6, 7]],
  [[3, 2, 7, 4, 1, 5, 6, 0], [2, 3, 1, 4, 5, 0, 6, 7]],
  [[0, 7, 3, 1, 4, 2, 5, 6], [3, 1, 2, 4, 5, 0, 6, 7]],
  [[5, 1, 0, 3, 4, 2, 7, 6], [1, 2, 5, 3, 4, 0, 6, 7]],
  // ~Unfavorable pairs (2nd selection more ! than 1st)
  [[1, 2, 3, 4, 5, 0, 6, 7], [6, 0, 5, 7, 3, 1, 4, 2]],
  [[2, 1, 4, 3, 5, 0, 6, 7], [7, 6, 0, 5, 3, 2, 1, 4]],
  [[3, 4, 1, 2, 5, 0, 6, 7], [0, 7, 5, 6, 4, 1, 2, 3]],
  [[4, 1, 2, 3, 5, 0, 6, 7], [7, 0, 6, 5, 2, 3, 4, 1]],
  [[1, 3, 2, 4, 5, 0, 6, 7], [6, 7, 0, 5, 1, 3, 4, 2]],
  [[2, 4, 1, 3, 5, 0, 6, 7], [0, 6, 7, 5, 4, 2, 1, 3]],
  [[4, 3, 2, 1, 5, 0, 6, 7], [7, 6, 5, 0, 1, 4, 3, 2]],
  [[3, 1, 4, 2, 5, 0, 6, 7], [0, 7, 6, 5, 3, 4, 2, 1]],
  [[1, 4, 3, 2, 5, 0, 6, 7], [6, 0, 7, 5, 2, 4, 1, 3]],
  // ~Stable pairs (similar ! counts)
  [[2, 3, 4, 1, 5, 0, 6, 7], [3, 2, 4, 1, 5, 0, 6, 7]],
  [[1, 4, 2, 3, 5, 0, 6, 7], [4, 1, 2, 3, 5, 0, 6, 7]],
  [[3, 2, 1, 4, 5, 0, 6, 7], [2, 3, 1, 4, 5, 0, 6, 7]],
  [[4, 1, 3, 2, 5, 0, 6, 7], [1, 4, 3, 2, 5, 0, 6, 7]],
  [[4, 2, 1, 3, 5, 0, 6, 7], [2, 4, 1, 3, 5, 0, 6, 7]],
  [[2, 1, 3, 4, 0, 5, 6, 7], [1, 2, 3, 4, 0, 5, 6, 7]],
  [[3, 4, 2, 1, 0, 5, 7, 6], [4, 3, 2, 1, 0, 5, 7, 6]],
];

// ---------- Client Names ----------

const CLIENT_NAMES = [
  'فاطمة العلي', 'نور الحسن', 'ريم الشمري', 'سارة القحطاني', 'هند المطيري',
  'دانا الرشيدي', 'ليلى الدوسري', 'مريم العتيبي', 'أمل الغامدي', 'جنى البلوي',
  'لمياء الحربي', 'رانيا السبيعي', 'خلود الزهراني', 'عبير الشهري', 'ياسمين العنزي',
  'محمد الأحمدي', 'عبدالله الخالدي', 'خالد الحارثي', 'فيصل المالكي', 'سلطان العمري',
  'أحمد السلمي', 'إبراهيم الجهني', 'عمر الفيفي', 'يوسف الثقفي', 'مشاري الشراري',
  'Emily Johnson', 'James Carter', 'Olivia Thompson', 'Benjamin Scott', 'Sophia Davis',
  'Daniel Wilson', 'Chloe Anderson', 'Lucas Martinez', 'Amelia Robinson', 'Ethan Clark',
  'Charlotte Lewis', 'Mason Walker', 'Ava Young', 'Logan Hall', 'Isabella King',
  'William Allen', 'Mia Wright', 'Alexander Lee', 'Harper Adams', 'Jackson Nelson',
  'Leila Abdallah', 'Karim Mansour', 'Yasmine Farouk', 'Tariq Hassan', 'Dina Nabil',
  'Salma Youssef', 'Rami Khouri', 'Nadia Taha', 'Zain Mostafa', 'Hana Barakat',
];

async function seed() {
  // Ensure data directory exists
  const dataDir = path.dirname(DB_PATH);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  // Remove existing DB for clean seed
  if (fs.existsSync(DB_PATH)) {
    fs.unlinkSync(DB_PATH);
    console.log('Removed existing database.');
  }
  [DB_PATH + '-wal', DB_PATH + '-journal', DB_PATH + '-shm'].forEach(f => {
    if (fs.existsSync(f)) fs.unlinkSync(f);
  });

  const sqlite = new Database(DB_PATH);
  sqlite.pragma('journal_mode = WAL');
  sqlite.pragma('foreign_keys = ON');

  // Create tables
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'user',
      locale TEXT NOT NULL DEFAULT 'ar',
      created_at INTEGER NOT NULL DEFAULT (unixepoch())
    );
    CREATE TABLE IF NOT EXISTS clients (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT,
      phone TEXT,
      age INTEGER,
      gender TEXT,
      notes TEXT,
      created_by TEXT NOT NULL REFERENCES users(id),
      created_at INTEGER NOT NULL DEFAULT (unixepoch())
    );
    CREATE TABLE IF NOT EXISTS test_sessions (
      id TEXT PRIMARY KEY,
      client_id TEXT NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
      instructor_id TEXT NOT NULL REFERENCES users(id),
      selection_1 TEXT NOT NULL,
      selection_2 TEXT NOT NULL,
      results TEXT,
      status TEXT NOT NULL DEFAULT 'draft',
      notes TEXT,
      created_at INTEGER NOT NULL DEFAULT (unixepoch())
    );
  `);

  const db = drizzle(sqlite, { schema });
  const passwordHash = await bcrypt.hash('password123', 12);

  // ---------- Create Users ----------
  console.log('Creating users...');
  const usersData = [
    { name: 'Asmaa Salem', email: 'admin@asmaasalem.com', role: 'admin' as const, locale: 'ar' as const },
    { name: 'Dr. Nadia Khalil', email: 'nadia@asmaasalem.com', role: 'user' as const, locale: 'ar' as const },
    { name: 'Sarah Mitchell', email: 'sarah@asmaasalem.com', role: 'user' as const, locale: 'en' as const },
    { name: 'Layla Hassan', email: 'layla@asmaasalem.com', role: 'user' as const, locale: 'ar' as const },
    { name: 'Omar Farouk', email: 'omar@asmaasalem.com', role: 'user' as const, locale: 'ar' as const },
  ];

  const userIds: string[] = [];
  for (const u of usersData) {
    const id = createId();
    userIds.push(id);
    db.insert(schema.users).values({ id, ...u, passwordHash }).run();
    console.log(`  ${u.role === 'admin' ? 'Admin' : 'Instructor'}: ${u.name} (${u.email})`);
  }

  // Instructor distribution: Asmaa=15, Nadia=15, Sarah=12, Layla=8, Omar=5
  const instructorDistribution = [
    ...Array(15).fill(0),
    ...Array(15).fill(1),
    ...Array(12).fill(2),
    ...Array(8).fill(3),
    ...Array(5).fill(4),
  ];

  // ---------- Create Clients & Tests ----------
  const totalClients = 55;
  const startDate = new Date('2025-12-01');
  const endDate = new Date('2026-03-01');
  const dateRange = endDate.getTime() - startDate.getTime();

  console.log(`\nCreating ${totalClients} clients with test sessions...`);

  for (let i = 0; i < totalClients; i++) {
    const clientId = createId();
    const instructorIdx = instructorDistribution[i];
    const instructorId = userIds[instructorIdx];

    const age = 18 + Math.floor((i * 47) / totalClients);
    const gender = i % 3 === 0 ? 'male' : 'female';
    const clientName = CLIENT_NAMES[i % CLIENT_NAMES.length];

    const timestamp = new Date(startDate.getTime() + (dateRange * i) / totalClients);
    const createdAtEpoch = Math.floor(timestamp.getTime() / 1000);

    db.insert(schema.clients).values({
      id: clientId,
      name: clientName,
      email: i % 3 === 0 ? `client${i + 1}@example.com` : null,
      phone: i % 4 === 0 ? `+97150${String(1000000 + i).slice(-7)}` : null,
      age,
      gender,
      notes: null,
      createdBy: instructorId,
      createdAt: new Date(createdAtEpoch * 1000),
    }).run();

    // Pick color sequence pair
    const seqIdx = i % SEQUENCES.length;
    const [sel1, sel2] = SEQUENCES[seqIdx];

    const testId = createId();
    const report = generateReport({
      id: testId,
      firstSelection: sel1 as unknown as ColorSequence,
      secondSelection: sel2 as unknown as ColorSequence,
      clientName,
      clientAge: age,
      clientGender: gender,
    });

    db.insert(schema.testSessions).values({
      id: testId,
      clientId,
      instructorId,
      selection1: JSON.stringify(sel1),
      selection2: JSON.stringify(sel2),
      results: JSON.stringify(report),
      status: 'completed',
      notes: null,
      createdAt: new Date(createdAtEpoch * 1000),
    }).run();
  }

  console.log(`\nSeed complete!`);
  console.log(`  Users: ${usersData.length}`);
  console.log(`  Clients: ${totalClients}`);
  console.log(`  Test Sessions: ${totalClients}`);
  console.log(`\n  All users have password: password123`);
  console.log(`  Admin: admin@asmaasalem.com`);
  console.log(`  Instructors: nadia@, sarah@, layla@, omar@ @asmaasalem.com`);

  sqlite.close();
}

seed().catch(console.error);
