'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface ClientFormProps {
  locale: string;
  labels: {
    name: string;
    email: string;
    phone: string;
    age: string;
    gender: string;
    male: string;
    female: string;
    notes: string;
    save: string;
    cancel: string;
  };
  initialData?: {
    id: string;
    name: string;
    email: string | null;
    phone: string | null;
    age: number | null;
    gender: string | null;
    notes: string | null;
  };
}

export function ClientForm({ locale, labels, initialData }: ClientFormProps) {
  const router = useRouter();
  const isEditing = !!initialData;

  const [name, setName] = useState(initialData?.name || '');
  const [email, setEmail] = useState(initialData?.email || '');
  const [phone, setPhone] = useState(initialData?.phone || '');
  const [age, setAge] = useState(initialData?.age?.toString() || '');
  const [gender, setGender] = useState(initialData?.gender || '');
  const [notes, setNotes] = useState(initialData?.notes || '');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const url = isEditing ? `/api/clients/${initialData.id}` : '/api/clients';
      const method = isEditing ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email: email || undefined,
          phone: phone || undefined,
          age: age ? parseInt(age) : undefined,
          gender: gender || undefined,
          notes: notes || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong.');
        return;
      }

      router.push(`/${locale}/dashboard/clients`);
      router.refresh();
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-5">
      {error && (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
      )}

      <div>
        <label className="mb-1.5 block text-sm font-medium text-charcoal">{labels.name} *</label>
        <input
          type="text"
          required
          minLength={2}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl border border-sand bg-white px-4 py-2.5 text-charcoal outline-none transition-colors focus:border-[var(--color-accent)]"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-charcoal">{labels.email}</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-sand bg-white px-4 py-2.5 text-charcoal outline-none transition-colors focus:border-[var(--color-accent)]"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-charcoal">{labels.phone}</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-xl border border-sand bg-white px-4 py-2.5 text-charcoal outline-none transition-colors focus:border-[var(--color-accent)]"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-charcoal">{labels.age}</label>
          <input
            type="number"
            min={1}
            max={120}
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full rounded-xl border border-sand bg-white px-4 py-2.5 text-charcoal outline-none transition-colors focus:border-[var(--color-accent)]"
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-charcoal">{labels.gender}</label>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="w-full rounded-xl border border-sand bg-white px-4 py-2.5 text-charcoal outline-none transition-colors focus:border-[var(--color-accent)]"
        >
          <option value="">—</option>
          <option value="male">{labels.male}</option>
          <option value="female">{labels.female}</option>
        </select>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-charcoal">{labels.notes}</label>
        <textarea
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full resize-none rounded-xl border border-sand bg-white px-4 py-2.5 text-charcoal outline-none transition-colors focus:border-[var(--color-accent)]"
        />
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-[var(--color-accent)] px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {loading ? '...' : labels.save}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-full border border-sand px-6 py-2.5 text-sm font-medium text-warm-gray transition-colors hover:bg-sand"
        >
          {labels.cancel}
        </button>
      </div>
    </form>
  );
}
