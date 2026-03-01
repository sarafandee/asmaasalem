'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface LoginFormProps {
  locale: string;
  labels: {
    email: string;
    password: string;
    submit: string;
    error: string;
  };
  callbackUrl?: string;
}

export function LoginForm({ locale, labels, callbackUrl }: LoginFormProps) {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(labels.error);
      } else {
        router.push(callbackUrl || `/${locale}/dashboard`);
        router.refresh();
      }
    } catch {
      setError(labels.error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <Input
        label={labels.email}
        name="email"
        type="email"
        required
        autoComplete="email"
        placeholder="admin@asmaasalem.com"
      />

      <Input
        label={labels.password}
        name="password"
        type="password"
        required
        autoComplete="current-password"
      />

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? '...' : labels.submit}
      </Button>
    </form>
  );
}
