import Link from 'next/link';
import { eq } from 'drizzle-orm';
import type { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { db } from '@/lib/db';
import { testSessions, clients } from '@/lib/db/schema';

export default async function TestsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  const allTests = db
    .select({
      id: testSessions.id,
      clientId: testSessions.clientId,
      clientName: clients.name,
      status: testSessions.status,
      createdAt: testSessions.createdAt,
    })
    .from(testSessions)
    .leftJoin(clients, eq(testSessions.clientId, clients.id))
    .orderBy(testSessions.createdAt)
    .all();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-charcoal">{dict.dashboard.tests}</h1>
        <Link
          href={`/${locale}/dashboard/tests/new`}
          className="rounded-full bg-[var(--color-accent)] px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          {dict.dashboard.newTest}
        </Link>
      </div>

      {allTests.length === 0 ? (
        <div className="rounded-2xl bg-white p-12 text-center shadow-[var(--shadow-sm)]">
          <p className="text-warm-gray">{dict.dashboard.noResults}</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl bg-white shadow-[var(--shadow-sm)]">
          <table className="w-full text-start text-sm">
            <thead>
              <tr className="border-b border-sand bg-light-gray/50">
                <th className="px-6 py-3 text-start font-medium text-warm-gray">{dict.dashboard.name}</th>
                <th className="px-6 py-3 text-start font-medium text-warm-gray">{dict.dashboard.date}</th>
                <th className="px-6 py-3 text-start font-medium text-warm-gray">{dict.dashboard.status}</th>
                <th className="px-6 py-3 text-start font-medium text-warm-gray">{dict.dashboard.actions}</th>
              </tr>
            </thead>
            <tbody>
              {allTests.map((test) => (
                <tr key={test.id} className="border-b border-sand/50 last:border-0 hover:bg-light-gray/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-charcoal">{test.clientName || '—'}</td>
                  <td className="px-6 py-4 text-warm-gray">
                    {test.createdAt?.toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-US') || '—'}
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
  );
}
