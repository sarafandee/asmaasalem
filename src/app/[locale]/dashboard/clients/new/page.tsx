import type { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { ClientForm } from '@/components/dashboard/ClientForm';

export default async function NewClientPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-charcoal">{dict.dashboard.newClient}</h1>
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
        />
      </div>
    </div>
  );
}
