import Link from 'next/link';

interface ActivityRow {
  id: string;
  clientName: string;
  instructorName: string;
  prognosis: string;
  date: string;
}

interface RecentActivityTableProps {
  rows: ActivityRow[];
  locale: string;
  labels: {
    client: string;
    instructor: string;
    prognosis: string;
    date: string;
    viewReport: string;
    favorable: string;
    unfavorable: string;
    stable: string;
  };
}

const PROGNOSIS_STYLES: Record<string, string> = {
  favorable: 'bg-emerald-50 text-emerald-700',
  unfavorable: 'bg-red-50 text-red-700',
  stable: 'bg-amber-50 text-amber-700',
};

export function RecentActivityTable({ rows, locale, labels }: RecentActivityTableProps) {
  const prognosisLabel = (p: string) => {
    if (p === 'favorable') return labels.favorable;
    if (p === 'unfavorable') return labels.unfavorable;
    return labels.stable;
  };

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-[var(--shadow-sm)]">
      <table className="w-full text-start text-sm">
        <thead>
          <tr className="border-b border-sand bg-light-gray/50">
            <th className="px-5 py-3 text-start font-medium text-warm-gray">{labels.client}</th>
            <th className="px-5 py-3 text-start font-medium text-warm-gray">{labels.instructor}</th>
            <th className="px-5 py-3 text-start font-medium text-warm-gray">{labels.prognosis}</th>
            <th className="px-5 py-3 text-start font-medium text-warm-gray">{labels.date}</th>
            <th className="px-5 py-3" />
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-b border-sand/50 last:border-0 transition-colors hover:bg-light-gray/30">
              <td className="px-5 py-3 font-medium text-charcoal">{r.clientName}</td>
              <td className="px-5 py-3 text-warm-gray">{r.instructorName}</td>
              <td className="px-5 py-3">
                <span className={`inline-block rounded-full px-3 py-0.5 text-xs font-medium ${PROGNOSIS_STYLES[r.prognosis] || PROGNOSIS_STYLES.stable}`}>
                  {prognosisLabel(r.prognosis)}
                </span>
              </td>
              <td className="px-5 py-3 text-warm-gray">{r.date}</td>
              <td className="px-5 py-3 text-end">
                <Link
                  href={`/${locale}/dashboard/tests/${r.id}`}
                  className="text-xs font-medium text-[var(--color-accent)] hover:underline"
                >
                  {labels.viewReport}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
