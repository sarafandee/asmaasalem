import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { db } from '@/lib/db';
import { clients } from '@/lib/db/schema';
import { ClientTable } from '@/components/dashboard/ClientTable';

export default async function ClientsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  const allClients = db.select().from(clients).orderBy(clients.createdAt).all();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-charcoal">{dict.dashboard.clients}</h1>
        <Link
          href={`/${locale}/dashboard/clients/new`}
          className="rounded-full bg-[var(--color-accent)] px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          {dict.dashboard.newClient}
        </Link>
      </div>

      <ClientTable
        clients={allClients}
        locale={locale}
        labels={{
          name: dict.dashboard.name,
          email: dict.dashboard.email,
          phone: dict.dashboard.phone,
          age: dict.dashboard.age,
          gender: dict.dashboard.gender,
          actions: dict.dashboard.actions,
          noResults: dict.dashboard.noResults,
          edit: dict.dashboard.edit,
          male: dict.dashboard.male,
          female: dict.dashboard.female,
        }}
      />
    </div>
  );
}
