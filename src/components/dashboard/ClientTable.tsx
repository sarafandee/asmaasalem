'use client';

import Link from 'next/link';

interface Client {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  age: number | null;
  gender: string | null;
  createdAt: Date;
}

interface ClientTableProps {
  clients: Client[];
  locale: string;
  labels: {
    name: string;
    email: string;
    phone: string;
    age: string;
    gender: string;
    actions: string;
    noResults: string;
    edit: string;
    male: string;
    female: string;
  };
}

export function ClientTable({ clients, locale, labels }: ClientTableProps) {
  if (clients.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-12 text-center shadow-[var(--shadow-sm)]">
        <p className="text-warm-gray">{labels.noResults}</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-[var(--shadow-sm)]">
      <table className="w-full text-start text-sm">
        <thead>
          <tr className="border-b border-sand bg-light-gray/50">
            <th className="px-6 py-3 text-start font-medium text-warm-gray">{labels.name}</th>
            <th className="px-6 py-3 text-start font-medium text-warm-gray">{labels.email}</th>
            <th className="px-6 py-3 text-start font-medium text-warm-gray">{labels.phone}</th>
            <th className="px-6 py-3 text-start font-medium text-warm-gray">{labels.age}</th>
            <th className="px-6 py-3 text-start font-medium text-warm-gray">{labels.gender}</th>
            <th className="px-6 py-3 text-start font-medium text-warm-gray">{labels.actions}</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id} className="border-b border-sand/50 last:border-0 hover:bg-light-gray/30 transition-colors">
              <td className="px-6 py-4 font-medium text-charcoal">{client.name}</td>
              <td className="px-6 py-4 text-warm-gray">{client.email || '—'}</td>
              <td className="px-6 py-4 text-warm-gray">{client.phone || '—'}</td>
              <td className="px-6 py-4 text-warm-gray">{client.age || '—'}</td>
              <td className="px-6 py-4 text-warm-gray">
                {client.gender === 'male' ? labels.male : client.gender === 'female' ? labels.female : '—'}
              </td>
              <td className="px-6 py-4">
                <Link
                  href={`/${locale}/dashboard/clients/${client.id}`}
                  className="text-sm font-medium text-[var(--color-accent)] hover:underline"
                >
                  {labels.edit}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
