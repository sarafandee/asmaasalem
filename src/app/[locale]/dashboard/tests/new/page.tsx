import type { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { db } from '@/lib/db';
import { clients } from '@/lib/db/schema';
import { TestFlow } from '@/components/luscher/TestFlow';

export default async function NewTestPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ clientId?: string }>;
}) {
  const { locale } = await params;
  const { clientId } = await searchParams;
  const dict = await getDictionary(locale as Locale);

  const allClients = db.select({ id: clients.id, name: clients.name }).from(clients).all();

  return (
    <div>
      <h1 className="mb-6 text-center text-2xl font-bold text-charcoal">
        {dict.luscher.testTitle}
      </h1>
      <TestFlow
        locale={locale}
        clients={allClients}
        preselectedClientId={clientId}
        labels={{
          selectClient: dict.dashboard.clients,
          firstSelection: dict.luscher.firstSelection,
          secondSelection: dict.luscher.secondSelection,
          selectColorPrompt: dict.luscher.selectColorPrompt,
          undo: dict.luscher.undo,
          reset: dict.luscher.reset,
          continue: dict.luscher.continue,
          review: dict.luscher.review,
          interval: dict.luscher.interval,
          generateAnalysis: dict.luscher.generateAnalysis,
          name: dict.dashboard.name,
          noResults: dict.dashboard.noResults,
        }}
      />
    </div>
  );
}
