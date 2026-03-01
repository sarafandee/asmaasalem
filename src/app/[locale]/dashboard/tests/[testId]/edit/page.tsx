'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ColorSequenceEditor } from '@/components/luscher/ColorSequenceEditor';
import { ColorSequenceDisplay } from '@/components/luscher/ColorSequenceDisplay';
import type { ColorId } from '@/lib/luscher/types';

interface TestData {
  id: string;
  clientId: string;
  instructorId: string;
  selection1: number[];
  selection2: number[];
  notes: string | null;
  status: string;
}

interface SelectOption {
  id: string;
  name: string;
}

export default function TestEditPage() {
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;
  const testId = params.testId as string;

  const [test, setTest] = useState<TestData | null>(null);
  const [allClients, setAllClients] = useState<SelectOption[]>([]);
  const [allUsers, setAllUsers] = useState<SelectOption[]>([]);
  const [selection1, setSelection1] = useState<ColorId[]>([]);
  const [selection2, setSelection2] = useState<ColorId[]>([]);
  const [clientId, setClientId] = useState('');
  const [instructorId, setInstructorId] = useState('');
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`/api/tests/${testId}`).then(r => r.json()),
      fetch('/api/clients').then(r => r.json()),
      fetch('/api/users').then(r => r.json()),
    ]).then(([testData, clientsData, usersData]) => {
      setTest(testData);
      setSelection1(testData.selection1 as ColorId[]);
      setSelection2(testData.selection2 as ColorId[]);
      setClientId(testData.clientId);
      setInstructorId(testData.instructorId);
      setNotes(testData.notes || '');
      setAllClients(Array.isArray(clientsData) ? clientsData.map((c: { id: string; name: string }) => ({ id: c.id, name: c.name })) : []);
      setAllUsers(Array.isArray(usersData) ? usersData.map((u: { id: string; name: string }) => ({ id: u.id, name: u.name })) : []);
      setLoading(false);
    }).catch(() => {
      setError('Failed to load data');
      setLoading(false);
    });
  }, [testId]);

  const handleSave = async () => {
    setSaving(true);
    setError('');

    try {
      const body: Record<string, unknown> = { notes };
      if (JSON.stringify(selection1) !== JSON.stringify(test?.selection1)) body.selection1 = selection1;
      if (JSON.stringify(selection2) !== JSON.stringify(test?.selection2)) body.selection2 = selection2;
      if (clientId !== test?.clientId) body.clientId = clientId;
      if (instructorId !== test?.instructorId) body.instructorId = instructorId;

      const res = await fetch(`/api/tests/${testId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Failed to save');
        setSaving(false);
        return;
      }

      router.push(`/${locale}/dashboard/tests/${testId}`);
    } catch {
      setError('Failed to save changes');
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center py-20 text-warm-gray">Loading...</div>;
  }

  if (!test) {
    return <div className="flex items-center justify-center py-20 text-warm-gray">Test not found</div>;
  }

  const labels = {
    selectColorPrompt: locale === 'ar' ? 'اختر الألوان بالترتيب' : 'Click colors in order',
    undo: locale === 'ar' ? 'تراجع' : 'Undo',
    reset: locale === 'ar' ? 'إعادة' : 'Re-select',
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-charcoal">
          {locale === 'ar' ? 'تعديل الاختبار' : 'Edit Test'}
        </h1>
        <button
          onClick={() => router.back()}
          className="rounded-full border border-sand px-5 py-2 text-sm font-medium text-warm-gray hover:bg-sand"
        >
          {locale === 'ar' ? 'إلغاء' : 'Cancel'}
        </button>
      </div>

      {error && (
        <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      )}

      {/* Reassignment */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow-[var(--shadow-sm)]">
          <label className="mb-2 block text-sm font-medium text-charcoal">
            {locale === 'ar' ? 'العميل' : 'Client'}
          </label>
          <select
            value={clientId}
            onChange={e => setClientId(e.target.value)}
            className="w-full rounded-lg border border-sand bg-white px-3 py-2 text-sm text-charcoal focus:border-[var(--color-accent)] focus:outline-none"
          >
            {allClients.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-[var(--shadow-sm)]">
          <label className="mb-2 block text-sm font-medium text-charcoal">
            {locale === 'ar' ? 'المدرب' : 'Instructor'}
          </label>
          <select
            value={instructorId}
            onChange={e => setInstructorId(e.target.value)}
            className="w-full rounded-lg border border-sand bg-white px-3 py-2 text-sm text-charcoal focus:border-[var(--color-accent)] focus:outline-none"
          >
            {allUsers.map(u => (
              <option key={u.id} value={u.id}>{u.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Color Selections */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow-[var(--shadow-sm)]">
          <ColorSequenceEditor
            locale={locale}
            initialSequence={selection1}
            label={locale === 'ar' ? 'الاختيار الأول' : 'First Selection'}
            labels={labels}
            onChange={setSelection1}
          />
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-[var(--shadow-sm)]">
          <ColorSequenceEditor
            locale={locale}
            initialSequence={selection2}
            label={locale === 'ar' ? 'الاختيار الثاني' : 'Second Selection'}
            labels={labels}
            onChange={setSelection2}
          />
        </div>
      </div>

      {/* Notes */}
      <div className="rounded-2xl bg-white p-6 shadow-[var(--shadow-sm)]">
        <label className="mb-2 block text-sm font-medium text-charcoal">
          {locale === 'ar' ? 'ملاحظات' : 'Notes'}
        </label>
        <textarea
          value={notes}
          onChange={e => setNotes(e.target.value)}
          rows={3}
          className="w-full rounded-lg border border-sand bg-white px-3 py-2 text-sm text-charcoal focus:border-[var(--color-accent)] focus:outline-none"
        />
      </div>

      {/* Save */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="rounded-full bg-[var(--color-accent)] px-8 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {saving
            ? (locale === 'ar' ? 'جاري الحفظ...' : 'Saving...')
            : (locale === 'ar' ? 'حفظ التغييرات' : 'Save Changes')}
        </button>
      </div>
    </div>
  );
}
