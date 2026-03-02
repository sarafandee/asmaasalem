import { notFound } from 'next/navigation';
import { locales } from '@/lib/i18n/config';
import type { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { requireAuth } from '@/lib/auth';
import { db } from '@/lib/db';
import { chatSessions } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';
import { ChatSidebar } from '@/components/dashboard/rag/ChatSidebar';

export default async function ChatPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  const user = await requireAuth(locale);
  if (user.role !== 'admin') notFound();

  const dict = await getDictionary(locale as Locale);

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

  return (
    <div className="-m-6 flex h-[calc(100vh-4rem)]">
      <ChatSidebar
        locale={locale}
        sessions={serializedSessions}
        labels={dict.knowledge}
      />
      <div className="flex flex-1 items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-medium text-warm-gray">
            {dict.knowledge.noChatSessions}
          </p>
        </div>
      </div>
    </div>
  );
}
