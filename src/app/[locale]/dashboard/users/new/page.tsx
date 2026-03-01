'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function NewUserPage() {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role, locale }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong.');
        setLoading(false);
        return;
      }

      router.push(`/${locale}/dashboard/users`);
      router.refresh();
    } catch {
      setError('Network error. Please try again.');
      setLoading(false);
    }
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-charcoal">New User</h1>
      <div className="max-w-lg rounded-2xl bg-white p-6 shadow-[var(--shadow-sm)]">
        {error && (
          <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-charcoal">Name *</label>
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
            <label className="mb-1.5 block text-sm font-medium text-charcoal">Email *</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-sand bg-white px-4 py-2.5 text-charcoal outline-none transition-colors focus:border-[var(--color-accent)]"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-charcoal">Password *</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-sand bg-white px-4 py-2.5 text-charcoal outline-none transition-colors focus:border-[var(--color-accent)]"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-charcoal">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-xl border border-sand bg-white px-4 py-2.5 text-charcoal outline-none transition-colors focus:border-[var(--color-accent)]"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="rounded-full bg-[var(--color-accent)] px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {loading ? '...' : 'Create User'}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="rounded-full border border-sand px-6 py-2.5 text-sm font-medium text-warm-gray transition-colors hover:bg-sand"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
