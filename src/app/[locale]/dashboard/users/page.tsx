import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { requireAdmin } from '@/lib/auth';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';

export default async function UsersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  await requireAdmin(locale);
  const dict = await getDictionary(locale as Locale);

  const allUsers = db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      role: users.role,
      locale: users.locale,
      createdAt: users.createdAt,
    })
    .from(users)
    .orderBy(users.createdAt)
    .all();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-charcoal">{dict.dashboard.users}</h1>
        <Link
          href={`/${locale}/dashboard/users/new`}
          className="rounded-full bg-[var(--color-accent)] px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          + {dict.dashboard.addUser}
        </Link>
      </div>

      {allUsers.length === 0 ? (
        <div className="rounded-2xl bg-white p-12 text-center shadow-[var(--shadow-sm)]">
          <p className="text-warm-gray">{dict.dashboard.noResults}</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl bg-white shadow-[var(--shadow-sm)]">
          <table className="w-full text-start text-sm">
            <thead>
              <tr className="border-b border-sand bg-light-gray/50">
                <th className="px-6 py-3 text-start font-medium text-warm-gray">{dict.dashboard.name}</th>
                <th className="px-6 py-3 text-start font-medium text-warm-gray">{dict.dashboard.email}</th>
                <th className="px-6 py-3 text-start font-medium text-warm-gray">{dict.dashboard.role}</th>
                <th className="px-6 py-3 text-start font-medium text-warm-gray">{dict.dashboard.date}</th>
                <th className="px-6 py-3 text-end font-medium text-warm-gray">{dict.dashboard.actions}</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((u) => (
                <tr key={u.id} className="border-b border-sand/50 last:border-0 hover:bg-light-gray/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-charcoal">{u.name}</td>
                  <td className="px-6 py-4 text-warm-gray">{u.email}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                      u.role === 'admin' ? 'bg-purple-50 text-purple-700' : 'bg-blue-50 text-blue-700'
                    }`}>
                      {u.role === 'admin' ? dict.dashboard.admin : dict.dashboard.user}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-warm-gray">
                    {u.createdAt.toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-US')}
                  </td>
                  <td className="px-6 py-4 text-end">
                    <Link
                      href={`/${locale}/dashboard/users/${u.id}/edit`}
                      className="text-xs font-medium text-[var(--color-accent)] hover:underline"
                    >
                      {dict.dashboard.edit}
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
