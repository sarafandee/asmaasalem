'use server';

import { headers } from 'next/headers';

export type ContactTopic = 'general' | 'booking' | 'platform';

export interface ContactState {
  status: 'idle' | 'success' | 'error' | 'invalid';
  /** Increments on every submit so the form can tell two errors apart. */
  attempt: number;
}

const TOPIC_SUBJECT: Record<ContactTopic, string> = {
  general: 'General inquiry',
  booking: 'Session booking request',
  platform: 'Lüscher Platform inquiry',
};

// Sender must be on a domain verified in Resend; the key in use is restricted
// to sending, and offplate.ai is the verified domain on that account.
const FROM = process.env.CONTACT_FROM ?? 'Asmaa Salem website <notifications@offplate.ai>';
const TO = process.env.CONTACT_TO ?? 'ali@offplate.ai';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Forms filled in faster than this are bots.
const MIN_FILL_MS = 3000;

// Small in-memory limit per visitor: a single container serves the site.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const recent = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  recent.set(ip, hits);
  if (recent.size > 5000) recent.clear();
  return hits.length > MAX_PER_WINDOW;
}

function field(form: FormData, name: string, max: number): string {
  const value = form.get(name);
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
}

export async function sendContact(prev: ContactState, form: FormData): Promise<ContactState> {
  const attempt = prev.attempt + 1;

  // Honeypot and timing: pretend success so bots learn nothing.
  const startedAt = Number(form.get('startedAt'));
  if (field(form, 'website', 200) || !startedAt || Date.now() - startedAt < MIN_FILL_MS) {
    return { status: 'success', attempt };
  }

  const name = field(form, 'name', 120);
  const email = field(form, 'email', 200);
  const country = field(form, 'country', 80);
  const phone = field(form, 'phone', 40);
  const topicRaw = field(form, 'topic', 20);
  const message = field(form, 'message', 5000);
  const locale = field(form, 'locale', 2) === 'en' ? 'English' : 'Arabic';
  const topic = (topicRaw in TOPIC_SUBJECT ? topicRaw : null) as ContactTopic | null;

  if (!name || !EMAIL_RE.test(email) || !country || !phone || !topic) {
    return { status: 'invalid', attempt };
  }

  const h = await headers();
  const ip = h.get('cf-connecting-ip') ?? h.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (rateLimited(ip)) return { status: 'error', attempt };

  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    console.error('[contact] RESEND_API_KEY is not set');
    return { status: 'error', attempt };
  }

  const rows: [string, string][] = [
    ['Topic', TOPIC_SUBJECT[topic]],
    ['Name', name],
    ['Email', email],
    ['Country', country],
    ['Phone', phone],
    ['Site language', locale],
  ];
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\n${message || '(no message)'}\n`;
  const html = `<table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">${rows
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#666">${k}</td><td style="padding:4px 0">${escapeHtml(v)}</td></tr>`)
    .join('')}</table><p style="font-family:sans-serif;font-size:14px;white-space:pre-wrap;margin-top:16px" dir="auto">${escapeHtml(message || '(no message)')}</p>`;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        reply_to: email,
        subject: `[asmaasalem.com] ${TOPIC_SUBJECT[topic]}: ${name}`,
        text,
        html,
      }),
    });
    if (!res.ok) {
      console.error(`[contact] Resend ${res.status}: ${(await res.text()).slice(0, 300)}`);
      return { status: 'error', attempt };
    }
  } catch (err) {
    console.error('[contact] Resend request failed', err);
    return { status: 'error', attempt };
  }

  return { status: 'success', attempt };
}
