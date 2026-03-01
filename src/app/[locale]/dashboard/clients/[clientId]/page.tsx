import { notFound } from 'next/navigation';
import Link from 'next/link';
import { eq } from 'drizzle-orm';
import type { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { db } from '@/lib/db';
import { clients, testSessions } from '@/lib/db/schema';
import { ClientForm } from '@/components/dashboard/ClientForm';

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ locale: string; clientId: string }>;
}) {
  const { locale, clientId } = await params;
  const dict = await getDictionary(locale as Locale);

  const client = db.select().from(clients).where(eq(clients.id, clientId)).get();
  if (!client) notFound();

  const tests = db
    .select()
    .from(testSessions)
    .where(eq(testSessions.clientId, clientId))
    .orderBy(testSessions.createdAt)
    .all();

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-charcoal">{client.name}</h1>

      {/* Edit Form */}
      <div className="rounded-2xl bg-white p-6 shadow-[var(--shadow-sm)]">
        <ClientForm
          locale={locale}
          labels={{
            name: dict.dashboard.name,
            email: dict.dashboard.email,
            phone: dict.dashboard.phone,
            age: dict.dashboard.age,
            gender: dict.dashboard.gender,
            male: dict.dashboard.male,
            female: dict.dashboard.female,
            notes: dict.dashboard.notes,
            save: dict.dashboard.save,
            cancel: dict.dashboard.cancel,
          }}
          initialData={client}
        />
      </div>

      {/* Test History */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-charcoal">{dict.dashboard.tests}</h2>
          <Link
            href={`/${locale}/dashboard/tests/new?clientId=${clientId}`}
            className="rounded-full bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            {dict.dashboard.newTest}
          </Link>
        </div>

        {tests.length === 0 ? (
          <div className="rounded-2xl bg-white p-8 text-center shadow-[var(--shadow-sm)]">
            <p className="text-warm-gray">{dict.dashboard.noResults}</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl bg-white shadow-[var(--shadow-sm)]">
            <table className="w-full text-start text-sm">
              <thead>
                <tr className="border-b border-sand bg-light-gray/50">
                  <th className="px-6 py-3 text-start font-medium text-warm-gray">{dict.dashboard.date}</th>
                  <th className="px-6 py-3 text-start font-medium text-warm-gray">{dict.dashboard.status}</th>
                  <th className="px-6 py-3 text-start font-medium text-warm-gray">{dict.dashboard.actions}</th>
                </tr>
              </thead>
              <tbody>
                {tests.map((test) => (
                  <tr key={test.id} className="border-b border-sand/50 last:border-0 hover:bg-light-gray/30">
                    <td className="px-6 py-4 text-charcoal">
                      {test.createdAt.toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-US')}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                        test.status === 'completed'
                          ? 'bg-green-50 text-green-700'
                          : 'bg-yellow-50 text-yellow-700'
                      }`}>
                        {test.status === 'completed' ? dict.dashboard.completed : dict.dashboard.draft}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/${locale}/dashboard/tests/${test.id}`}
                        className="text-sm font-medium text-[var(--color-accent)] hover:underline"
                      >
                        {dict.dashboard.viewReport}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
