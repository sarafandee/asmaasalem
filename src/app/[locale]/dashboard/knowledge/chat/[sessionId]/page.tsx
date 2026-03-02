import { notFound } from 'next/navigation';
import { locales } from '@/lib/i18n/config';
import type { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { requireAuth } from '@/lib/auth';
import { db } from '@/lib/db';
import { chatSessions, chatMessages } from '@/lib/db/schema';
import { eq, desc, asc } from 'drizzle-orm';
import { ChatSidebar } from '@/components/dashboard/rag/ChatSidebar';
import { ChatThread } from '@/components/dashboard/rag/ChatThread';

export default async function ChatSessionPage({
  params,
}: {
  params: Promise<{ locale: string; sessionId: string }>;
}) {
  const { locale, sessionId } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  const user = await requireAuth(locale);
  if (user.role !== 'admin') notFound();

  const dict = await getDictionary(locale as Locale);

  const session = db.select().from(chatSessions).where(eq(chatSessions.id, sessionId)).get();
  if (!session) notFound();

  const sessions = db
    .select()
    .from(chatSessions)
    .where(eq(chatSessions.userId, user.id))
    .orderBy(desc(chatSessions.updatedAt))
    .all();

  const serializedSessions = sessions.map((s) => ({
    ...s,
    createdAt: s.createdAt.toISOString(),
    updatedAt: s.updatedAt.toISOString(),
  }));

  const messages = db
    .select()
    .from(chatMessages)
    .where(eq(chatMessages.sessionId, sessionId))
    .orderBy(asc(chatMessages.createdAt))
    .all();

  return (
    <div className="-m-6 flex h-[calc(100vh-4rem)]">
      <ChatSidebar
        locale={locale}
        sessions={serializedSessions}
        labels={dict.knowledge}
      />
      <div className="flex-1">
        <ChatThread
          sessionId={sessionId}
          initialMessages={messages.map((m) => ({
            id: m.id,
            role: m.role as 'user' | 'assistant',
            content: m.content,
          }))}
          labels={dict.knowledge}
        />
      </div>
    </div>
  );
}
