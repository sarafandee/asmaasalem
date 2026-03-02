import type { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { requireAuth } from '@/lib/auth';
import { db } from '@/lib/db';
import { clients, testSessions, users } from '@/lib/db/schema';
import { count, eq, sql } from 'drizzle-orm';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { AnalyticsBar } from '@/components/dashboard/AnalyticsBar';
import { RecentActivityTable } from '@/components/dashboard/RecentActivityTable';
import { LUSCHER_COLORS } from '@/lib/luscher/colors';
import type { LuscherTestReport, ColorId } from '@/lib/luscher/types';

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const user = await requireAuth(locale);
  const dict = await getDictionary(locale as Locale);
  const isAdmin = user.role === 'admin';

  // ---- Queries (filtered by role) ----
  const clientCountQuery = db.select({ value: count() }).from(clients);
  const [clientCount] = isAdmin
    ? clientCountQuery.all()
    : clientCountQuery.where(eq(clients.createdBy, user.id)).all();

  const allTests = isAdmin
    ? db.select().from(testSessions).all()
    : db.select().from(testSessions).where(eq(testSessions.instructorId, user.id)).all();

  const totalTests = allTests.length;
  const completedTests = allTests.filter(t => t.status === 'completed').length;

  // Active instructors
  const instructorIds = new Set(allTests.map(t => t.instructorId));

  // ---- Parse reports for analytics ----
  let favorable = 0;
  let unfavorableCount = 0;
  let stableCount = 0;
  const colorFrequency: Record<number, number> = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 };
  const monthlyMap = new Map<string, number>();

  for (const t of allTests) {
    if (t.results) {
      try {
        const report: LuscherTestReport = JSON.parse(t.results);
        if (report.prognosis === 'favorable') favorable++;
        else if (report.prognosis === 'unfavorable') unfavorableCount++;
        else stableCount++;

        const firstColor = report.secondSelection.sequence[0];
        colorFrequency[firstColor] = (colorFrequency[firstColor] || 0) + 1;
      } catch { /* skip */ }
    }

    if (t.createdAt) {
      const d = t.createdAt instanceof Date ? t.createdAt : new Date(t.createdAt as unknown as string);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      monthlyMap.set(key, (monthlyMap.get(key) || 0) + 1);
    }
  }

  // ---- Tests per instructor (admin only) ----
  const instructorTestCounts: { name: string; count: number }[] = [];
  if (isAdmin) {
    const allUsers = db.select({ id: users.id, name: users.name }).from(users).all();
    const userMap = new Map(allUsers.map(u => [u.id, u.name]));
    const countMap = new Map<string, number>();
    for (const t of allTests) {
      countMap.set(t.instructorId, (countMap.get(t.instructorId) || 0) + 1);
    }
    for (const [id, cnt] of countMap) {
      instructorTestCounts.push({ name: userMap.get(id) || 'Unknown', count: cnt });
    }
    instructorTestCounts.sort((a, b) => b.count - a.count);
  }

  // ---- Client demographics ----
  const allClients = isAdmin
    ? db.select({ age: clients.age, gender: clients.gender }).from(clients).all()
    : db.select({ age: clients.age, gender: clients.gender }).from(clients).where(eq(clients.createdBy, user.id)).all();

  const maleCount = allClients.filter(c => c.gender === 'male').length;
  const femaleCount = allClients.filter(c => c.gender === 'female').length;
  const totalGendered = maleCount + femaleCount || 1;

  const ageRanges = [
    { label: '<25', min: 0, max: 24 },
    { label: '25-35', min: 25, max: 35 },
    { label: '36-45', min: 36, max: 45 },
    { label: '46-55', min: 46, max: 55 },
    { label: '55+', min: 56, max: 999 },
  ];
  const ageDistribution = ageRanges.map(r => ({
    label: r.label,
    count: allClients.filter(c => c.age != null && c.age >= r.min && c.age <= r.max).length,
  }));
  const maxAge = Math.max(...ageDistribution.map(a => a.count), 1);

  // ---- Recent activity ----
  const recentQuery = db
    .select({
      id: testSessions.id,
      clientName: clients.name,
      instructorId: testSessions.instructorId,
      results: testSessions.results,
      createdAt: testSessions.createdAt,
    })
    .from(testSessions)
    .leftJoin(clients, eq(testSessions.clientId, clients.id));

  const recentTests = isAdmin
    ? recentQuery.orderBy(sql`${testSessions.createdAt} DESC`).limit(10).all()
    : recentQuery.where(eq(testSessions.instructorId, user.id)).orderBy(sql`${testSessions.createdAt} DESC`).limit(10).all();

  const allUsersLookup = db.select({ id: users.id, name: users.name }).from(users).all();
  const userNameMap = new Map(allUsersLookup.map(u => [u.id, u.name]));

  const recentRows = recentTests.map(t => {
    let prognosis = 'stable';
    if (t.results) {
      try {
        const r: LuscherTestReport = JSON.parse(t.results);
        prognosis = r.prognosis;
      } catch { /* skip */ }
    }
    const d = t.createdAt instanceof Date ? t.createdAt : new Date(t.createdAt as unknown as string);
    return {
      id: t.id,
      clientName: t.clientName || '—',
      instructorName: userNameMap.get(t.instructorId) || '—',
      prognosis,
      date: d.toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };
  });

  // ---- Computed maximums ----
  const months = Array.from(monthlyMap.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  const maxMonthly = Math.max(...months.map(m => m[1]), 1);
  const prognosisMax = Math.max(favorable, unfavorableCount, stableCount, 1);
  const maxColorFreq = Math.max(...Object.values(colorFrequency), 1);
  const maxInstructorTests = instructorTestCounts.length > 0 ? Math.max(...instructorTestCounts.map(i => i.count)) : 1;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-charcoal">
          {isAdmin ? dict.dashboard.welcome : dict.dashboard.yourDashboard}, {user.name}
        </h1>
        <p className="mt-1 text-sm text-warm-gray">
          {isAdmin ? dict.dashboard.overviewDescription : dict.dashboard.yourOverviewDescription}
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard label={dict.dashboard.totalClients} value={clientCount.value} icon={'\u263B'} />
        <StatsCard label={dict.dashboard.totalTests} value={totalTests} icon={'\u2605'} />
        <StatsCard label={dict.dashboard.completedTests} value={completedTests} icon={'\u2713'} />
        <StatsCard
          label={isAdmin ? dict.dashboard.activeInstructors : dict.dashboard.favorable}
          value={isAdmin ? instructorIds.size : favorable}
          icon={isAdmin ? '\u2699' : '\u2714'}
        />
      </div>

      {/* Row 1: Prognosis + Instructor/Monthly */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Prognosis Distribution */}
        <div className="rounded-2xl bg-white p-6 shadow-[var(--shadow-sm)]">
          <h2 className="mb-5 text-base font-semibold text-charcoal">{dict.dashboard.prognosisDistribution}</h2>
          <div className="space-y-3">
            <AnalyticsBar label={dict.dashboard.favorable} value={favorable} max={prognosisMax} color="#10b981" />
            <AnalyticsBar label={dict.dashboard.unfavorable} value={unfavorableCount} max={prognosisMax} color="#ef4444" />
            <AnalyticsBar label={dict.dashboard.stable} value={stableCount} max={prognosisMax} color="#f59e0b" />
          </div>
        </div>

        {/* Tests per Instructor (admin) or Monthly Volume (instructor) */}
        {isAdmin ? (
          <div className="rounded-2xl bg-white p-6 shadow-[var(--shadow-sm)]">
            <h2 className="mb-5 text-base font-semibold text-charcoal">{dict.dashboard.testsPerInstructor}</h2>
            <div className="space-y-3">
              {instructorTestCounts.map((item) => (
                <AnalyticsBar
                  key={item.name}
                  label={item.name}
                  value={item.count}
                  max={maxInstructorTests}
                  color="var(--color-accent)"
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="rounded-2xl bg-white p-6 shadow-[var(--shadow-sm)]">
            <h2 className="mb-5 text-base font-semibold text-charcoal">{dict.dashboard.monthlyVolume}</h2>
            <div className="space-y-3">
              {months.map(([month, cnt]) => (
                <AnalyticsBar key={month} label={month} value={cnt} max={maxMonthly} color="var(--color-accent)" />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Row 2: Preferred Color + Demographics */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Most Preferred First Color */}
        <div className="rounded-2xl bg-white p-6 shadow-[var(--shadow-sm)]">
          <h2 className="mb-5 text-base font-semibold text-charcoal">{dict.dashboard.preferredFirstColor}</h2>
          <div className="space-y-3">
            {Object.entries(colorFrequency)
              .sort((a, b) => b[1] - a[1])
              .map(([colorId, freq]) => {
                const c = LUSCHER_COLORS[Number(colorId) as ColorId];
                return (
                  <AnalyticsBar
                    key={colorId}
                    label={c.name[locale as 'en' | 'ar']}
                    value={freq}
                    max={maxColorFreq}
                    color={c.hex}
                  />
                );
              })}
          </div>
        </div>

        {/* Client Demographics */}
        <div className="rounded-2xl bg-white p-6 shadow-[var(--shadow-sm)]">
          <h2 className="mb-5 text-base font-semibold text-charcoal">{dict.dashboard.clientDemographics}</h2>

          {/* Gender split */}
          <h3 className="mb-3 text-sm font-medium text-warm-gray">{dict.dashboard.genderSplit}</h3>
          <div className="mb-6 flex overflow-hidden rounded-full">
            {femaleCount > 0 && (
              <div
                className="flex h-8 items-center justify-center text-xs font-medium text-white"
                style={{ width: `${(femaleCount / totalGendered) * 100}%`, backgroundColor: '#ec4899' }}
              >
                {dict.dashboard.female} ({femaleCount})
              </div>
            )}
            {maleCount > 0 && (
              <div
                className="flex h-8 items-center justify-center text-xs font-medium text-white"
                style={{ width: `${(maleCount / totalGendered) * 100}%`, backgroundColor: '#3b82f6' }}
              >
                {dict.dashboard.male} ({maleCount})
              </div>
            )}
          </div>

          {/* Age distribution */}
          <h3 className="mb-3 text-sm font-medium text-warm-gray">{dict.dashboard.ageDistribution}</h3>
          <div className="space-y-3">
            {ageDistribution.map((a) => (
              <AnalyticsBar key={a.label} label={a.label} value={a.count} max={maxAge} color="var(--color-accent)" />
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Volume bar chart (admin) */}
      {isAdmin && months.length > 0 && (
        <div className="rounded-2xl bg-white p-6 shadow-[var(--shadow-sm)]">
          <h2 className="mb-5 text-base font-semibold text-charcoal">{dict.dashboard.monthlyVolume}</h2>
          <div className="flex items-end gap-3" style={{ height: 160 }}>
            {months.map(([month, cnt]) => (
              <div key={month} className="flex flex-1 flex-col items-center gap-1">
                <span className="text-xs font-medium text-charcoal">{cnt}</span>
                <div
                  className="w-full rounded-t-lg"
                  style={{ height: `${(cnt / maxMonthly) * 120}px`, backgroundColor: 'var(--color-accent)', opacity: 0.8 }}
                />
                <span className="text-xs text-warm-gray">{month}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Activity */}
      <div>
        <h2 className="mb-4 text-base font-semibold text-charcoal">{dict.dashboard.recentActivity}</h2>
        {recentRows.length > 0 ? (
          <RecentActivityTable
            rows={recentRows}
            locale={locale}
            labels={{
              client: dict.dashboard.client,
              instructor: dict.dashboard.instructor,
              prognosis: dict.dashboard.prognosis,
              date: dict.dashboard.date,
              viewReport: dict.dashboard.viewReport,
              favorable: dict.dashboard.favorable,
              unfavorable: dict.dashboard.unfavorable,
              stable: dict.dashboard.stable,
            }}
          />
        ) : (
          <div className="rounded-2xl bg-white p-12 text-center shadow-[var(--shadow-sm)]">
            <p className="text-warm-gray">{dict.dashboard.noTests}</p>
          </div>
        )}
      </div>
    </div>
  );
}
