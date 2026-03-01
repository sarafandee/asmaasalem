import Link from 'next/link';
import { notFound } from 'next/navigation';
import { eq } from 'drizzle-orm';
import type { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { requireAuth } from '@/lib/auth';
import { db } from '@/lib/db';
import { testSessions, clients } from '@/lib/db/schema';
import { ReportView } from '@/components/luscher/ReportView';
import type { LuscherTestReport } from '@/lib/luscher/types';

export default async function TestResultPage({
  params,
}: {
  params: Promise<{ locale: string; testId: string }>;
}) {
  const { locale, testId } = await params;
  const user = await requireAuth(locale);
  const dict = await getDictionary(locale as Locale);

  const test = db.select().from(testSessions).where(eq(testSessions.id, testId)).get();
  if (!test) notFound();

  const client = db.select().from(clients).where(eq(clients.id, test.clientId)).get();

  const report: LuscherTestReport | null = test.results ? JSON.parse(test.results) : null;

  if (!report) {
    return (
      <div className="rounded-2xl bg-white p-12 text-center shadow-[var(--shadow-sm)]">
        <p className="text-warm-gray">No report data available.</p>
      </div>
    );
  }

  const r = dict.luscher.report;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between print:hidden">
        <div>
          <h1 className="text-2xl font-bold text-charcoal">{r.title}</h1>
          {client && (
            <p className="mt-1 text-sm text-warm-gray">
              {client.name}
              {test.createdAt && ` — ${test.createdAt.toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-US')}`}
            </p>
          )}
        </div>
        {user.role === 'admin' && (
          <Link
            href={`/${locale}/dashboard/tests/${testId}/edit`}
            className="rounded-full border border-sand px-5 py-2.5 text-sm font-medium text-warm-gray transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
          >
            {dict.dashboard.editTest}
          </Link>
        )}
      </div>

      {/* Print-only header */}
      <div className="hidden print:block print:mb-6">
        <h1 className="text-xl font-bold text-charcoal">{r.title}</h1>
        {client && (
          <p className="mt-1 text-sm text-warm-gray">
            {client.name}
            {test.createdAt && ` — ${test.createdAt.toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-US')}`}
          </p>
        )}
      </div>

      <ReportView
        report={report}
        locale={locale}
        labels={{
          firstSelection: dict.luscher.firstSelection,
          secondSelection: dict.luscher.secondSelection,
          desiredObjective: r.desiredObjective,
          existingSituation: r.existingSituation,
          restrainedCharacteristics: r.restrainedCharacteristics,
          stressSources: r.stressSources,
          actualProblem: r.actualProblem,
          prognosis: r.prognosis,
          favorable: r.favorable,
          unfavorable: r.unfavorable,
          stable: r.stable,
          anxietyMarkers: r.anxietyMarkers,
          compensationMarkers: r.compensationMarkers,
          physiological: r.physiological,
          psychological: r.psychological,
          inBrief: r.inBrief,
          printReport: r.printReport,
          scoringProtocol: r.scoringProtocol,
          compensation: r.compensation,
          anxiety: r.anxiety,
          totalMarkers: r.totalMarkers,
          actualProblems: r.actualProblems,
          deepAnalysis: r.deepAnalysis,
          colorNotes: r.colorNotes,
          normality: r.normality,
        }}
      />
    </div>
  );
}
