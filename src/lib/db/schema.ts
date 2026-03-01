import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  role: text('role', { enum: ['admin', 'user'] }).notNull().default('user'),
  locale: text('locale', { enum: ['ar', 'en'] }).notNull().default('ar'),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`),
});

export const clients = sqliteTable('clients', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email'),
  phone: text('phone'),
  age: integer('age'),
  gender: text('gender', { enum: ['male', 'female'] }),
  notes: text('notes'),
  createdBy: text('created_by')
    .notNull()
    .references(() => users.id),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`),
});

export const testSessions = sqliteTable('test_sessions', {
  id: text('id').primaryKey(),
  clientId: text('client_id')
    .notNull()
    .references(() => clients.id, { onDelete: 'cascade' }),
  instructorId: text('instructor_id')
    .notNull()
    .references(() => users.id),
  selection1: text('selection_1').notNull(), // JSON: [3,1,2,4,5,0,6,7]
  selection2: text('selection_2').notNull(), // JSON: [1,3,4,2,5,0,7,6]
  results: text('results'), // JSON: full LuscherTestReport
  status: text('status', { enum: ['draft', 'completed'] }).notNull().default('draft'),
  notes: text('notes'),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`),
});
