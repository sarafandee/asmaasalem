import { notFound } from 'next/navigation';
import Link from 'next/link';
import { locales } from '@/lib/i18n/config';
import type { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { requireAuth } from '@/lib/auth';
import { db } from '@/lib/db';
import { documents } from '@/lib/db/schema';
import { DocumentUploadWrapper } from '@/components/dashboard/rag/DocumentUploadWrapper';
import { DocumentList } from '@/components/dashboard/rag/DocumentList';

export default async function KnowledgePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  const user = await requireAuth(locale);
  if (user.role !== 'admin') notFound();

  const dict = await getDictionary(locale as Locale);
  const allDocs = db.select().from(documents).orderBy(documents.createdAt).all();

  // Serialize Date objects to ISO strings for client component
  const serializedDocs = allDocs.map((doc) => ({
    ...doc,
    createdAt: doc.createdAt.toISOString(),
    processedAt: doc.processedAt?.toISOString() ?? null,
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-charcoal">
            {dict.knowledge.title}
          </h1>
          <p className="mt-1 text-sm text-warm-gray">
            {dict.knowledge.description}
          </p>
        </div>
        <Link
          href={`/${locale}/dashboard/knowledge/chat`}
          className="rounded-full bg-[var(--color-accent)] px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          {dict.knowledge.chat}
        </Link>
      </div>

      <DocumentUploadWrapper labels={dict.knowledge} />

      <DocumentList
        initialDocuments={serializedDocs}
        labels={dict.knowledge}
      />
    </div>
  );
}
