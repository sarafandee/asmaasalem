'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  locale: string;
}

export default function UserEditPage() {
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;
  const userId = params.userId as string;

  const [userData, setUserData] = useState<UserData | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('user');
  const [userLocale, setUserLocale] = useState('ar');
  const [newPassword, setNewPassword] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then(r => r.json())
      .then(data => {
        if (data.error) {
          setError(data.error);
          setLoading(false);
          return;
        }
        setUserData(data);
        setName(data.name);
        setEmail(data.email);
        setRole(data.role);
        setUserLocale(data.locale);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load user');
        setLoading(false);
      });
  }, [userId]);

  const handleSave = async () => {
    setSaving(true);
    setError('');

    try {
      const body: Record<string, string> = {};
      if (name !== userData?.name) body.name = name;
      if (email !== userData?.email) body.email = email;
      if (role !== userData?.role) body.role = role;
      if (userLocale !== userData?.locale) body.locale = userLocale;
      if (newPassword.length >= 6) body.password = newPassword;

      if (Object.keys(body).length === 0) {
        router.push(`/${locale}/dashboard/users`);
        return;
      }

      const res = await fetch(`/api/users/${userId}`, {
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

      router.push(`/${locale}/dashboard/users`);
    } catch {
      setError('Failed to save changes');
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center py-20 text-warm-gray">Loading...</div>;
  }

  if (!userData) {
    return <div className="flex items-center justify-center py-20 text-warm-gray">User not found</div>;
  }

  const isAr = locale === 'ar';

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-charcoal">
          {isAr ? 'تعديل المستخدم' : 'Edit User'}
        </h1>
        <button
          onClick={() => router.back()}
          className="rounded-full border border-sand px-5 py-2 text-sm font-medium text-warm-gray hover:bg-sand"
        >
          {isAr ? 'إلغاء' : 'Cancel'}
        </button>
      </div>

      {error && (
        <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      )}

      <div className="rounded-2xl bg-white p-6 shadow-[var(--shadow-sm)] space-y-5">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-charcoal">
            {isAr ? 'الاسم' : 'Name'}
          </label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full rounded-lg border border-sand bg-white px-3 py-2 text-sm text-charcoal focus:border-[var(--color-accent)] focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-charcoal">
            {isAr ? 'البريد الإلكتروني' : 'Email'}
          </label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full rounded-lg border border-sand bg-white px-3 py-2 text-sm text-charcoal focus:border-[var(--color-accent)] focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-charcoal">
              {isAr ? 'الدور' : 'Role'}
            </label>
            <select
              value={role}
              onChange={e => setRole(e.target.value)}
              className="w-full rounded-lg border border-sand bg-white px-3 py-2 text-sm text-charcoal focus:border-[var(--color-accent)] focus:outline-none"
            >
              <option value="admin">{isAr ? 'مدير' : 'Admin'}</option>
              <option value="user">{isAr ? 'مدرب' : 'Instructor'}</option>
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-charcoal">
              {isAr ? 'اللغة' : 'Language'}
            </label>
            <select
              value={userLocale}
              onChange={e => setUserLocale(e.target.value)}
              className="w-full rounded-lg border border-sand bg-white px-3 py-2 text-sm text-charcoal focus:border-[var(--color-accent)] focus:outline-none"
            >
              <option value="ar">العربية</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-charcoal">
            {isAr ? 'كلمة المرور الجديدة' : 'New Password'}{' '}
            <span className="text-warm-gray font-normal">({isAr ? 'اختياري' : 'optional'})</span>
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            placeholder={isAr ? 'اتركه فارغاً للإبقاء على كلمة المرور الحالية' : 'Leave blank to keep current password'}
            className="w-full rounded-lg border border-sand bg-white px-3 py-2 text-sm text-charcoal placeholder:text-gray focus:border-[var(--color-accent)] focus:outline-none"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="rounded-full bg-[var(--color-accent)] px-8 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {saving
            ? (isAr ? 'جاري الحفظ...' : 'Saving...')
            : (isAr ? 'حفظ التغييرات' : 'Save Changes')}
        </button>
      </div>
    </div>
  );
}
