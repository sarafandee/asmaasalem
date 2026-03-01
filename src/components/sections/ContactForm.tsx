'use client';

import { useState, type FormEvent } from 'react';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { ScrollReveal } from '@/components/animation/ScrollReveal';

interface ContactFormProps {
  form: {
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitText: string;
    successMessage: string;
    errorMessage: string;
  };
}

export function ContactForm({ form }: ContactFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      message: formData.get('message') as string,
      honeypot: formData.get('website') as string,
    };

    // Client validation
    const newErrors: Record<string, string> = {};
    if (!data.name || data.name.length < 2) newErrors.name = form.nameLabel;
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) newErrors.email = form.emailLabel;
    if (!data.message || data.message.length < 10) newErrors.message = form.messageLabel;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <section className="py-[var(--spacing-section)] bg-cream">
        <Container narrow>
          <div className="rounded-2xl bg-white p-8 md:p-12 text-center shadow-[var(--shadow-md)]">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-accent)]/10">
              <svg className="h-8 w-8 text-[var(--color-accent)]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
            </div>
            <p className="text-lg font-medium text-charcoal">{form.successMessage}</p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-[var(--spacing-section)] bg-cream">
      <Container narrow>
        <ScrollReveal>
          <div className="rounded-2xl bg-white p-8 md:p-12 shadow-[var(--shadow-md)]">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Honeypot */}
              <div className="hidden" aria-hidden="true">
                <input type="text" name="website" tabIndex={-1} autoComplete="off" />
              </div>

              <Input
                label={form.nameLabel}
                name="name"
                placeholder={form.namePlaceholder}
                error={errors.name}
                required
              />

              <Input
                label={form.emailLabel}
                name="email"
                type="email"
                placeholder={form.emailPlaceholder}
                error={errors.email}
                required
              />

              <Input
                label={form.phoneLabel}
                name="phone"
                type="tel"
                placeholder={form.phonePlaceholder}
              />

              <Textarea
                label={form.messageLabel}
                name="message"
                placeholder={form.messagePlaceholder}
                error={errors.message}
                required
              />

              {status === 'error' && (
                <p className="text-sm text-red-500">{form.errorMessage}</p>
              )}

              <Button type="submit" variant="primary" size="large" disabled={status === 'loading'}>
                {status === 'loading' ? (
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                ) : form.submitText}
              </Button>
            </form>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
