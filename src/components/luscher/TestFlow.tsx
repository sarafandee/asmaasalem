'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { ColorId } from '@/lib/luscher/types';
import { ColorSequenceInput } from './ColorSequenceInput';
import { ColorSequenceDisplay } from './ColorSequenceDisplay';

interface Client {
  id: string;
  name: string;
}

interface TestFlowProps {
  locale: string;
  clients: Client[];
  preselectedClientId?: string;
  labels: {
    selectClient: string;
    firstSelection: string;
    secondSelection: string;
    selectColorPrompt: string;
    undo: string;
    reset: string;
    continue: string;
    review: string;
    interval: string;
    generateAnalysis: string;
    name: string;
    noResults: string;
  };
}

type Step = 'client' | 'first' | 'interval' | 'second' | 'review';

export function TestFlow({
  locale,
  clients,
  preselectedClientId,
  labels,
}: TestFlowProps) {
  const router = useRouter();

  const [step, setStep] = useState<Step>(preselectedClientId ? 'first' : 'client');
  const [clientId, setClientId] = useState(preselectedClientId || '');
  const [first, setFirst] = useState<ColorId[] | null>(null);
  const [second, setSecond] = useState<ColorId[] | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleFirstComplete(sequence: ColorId[]) {
    setFirst(sequence);
    setStep('interval');
  }

  function handleSecondComplete(sequence: ColorId[]) {
    setSecond(sequence);
    setStep('review');
  }

  async function handleSubmit() {
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/tests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientId,
          selection1: first,
          selection2: second,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong.');
        setLoading(false);
        return;
      }

      router.push(`/${locale}/dashboard/tests/${data.id}`);
      router.refresh();
    } catch {
      setError('Network error. Please try again.');
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      {error && (
        <div className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
      )}

      {/* Step: Select Client */}
      {step === 'client' && (
        <div className="rounded-2xl bg-white p-8 shadow-[var(--shadow-sm)]">
          <h2 className="mb-6 text-lg font-bold text-charcoal">{labels.selectClient}</h2>
          {clients.length === 0 ? (
            <p className="text-warm-gray">{labels.noResults}</p>
          ) : (
            <div className="space-y-2">
              {clients.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => {
                    setClientId(c.id);
                    setStep('first');
                  }}
                  className={`w-full rounded-xl border px-4 py-3 text-start text-sm font-medium transition-colors ${
                    clientId === c.id
                      ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/5 text-[var(--color-accent)]'
                      : 'border-sand text-charcoal hover:border-[var(--color-accent)]/30 hover:bg-light-gray/50'
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Step: First Selection */}
      {step === 'first' && (
        <div className="rounded-2xl bg-white p-8 shadow-[var(--shadow-sm)]">
          <h2 className="mb-6 text-center text-lg font-bold text-charcoal">{labels.firstSelection}</h2>
          <ColorSequenceInput
            locale={locale}
            labels={{
              selectColorPrompt: labels.selectColorPrompt,
              undo: labels.undo,
              reset: labels.reset,
            }}
            onComplete={handleFirstComplete}
          />
        </div>
      )}

      {/* Step: Interval */}
      {step === 'interval' && (
        <div className="rounded-2xl bg-white p-12 text-center shadow-[var(--shadow-sm)]">
          <p className="mb-8 text-lg text-warm-gray">{labels.interval}</p>
          <button
            type="button"
            onClick={() => setStep('second')}
            className="rounded-full bg-[var(--color-accent)] px-8 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            {labels.continue}
          </button>
        </div>
      )}

      {/* Step: Second Selection */}
      {step === 'second' && (
        <div className="rounded-2xl bg-white p-8 shadow-[var(--shadow-sm)]">
          <h2 className="mb-6 text-center text-lg font-bold text-charcoal">{labels.secondSelection}</h2>
          <ColorSequenceInput
            locale={locale}
            labels={{
              selectColorPrompt: labels.selectColorPrompt,
              undo: labels.undo,
              reset: labels.reset,
            }}
            onComplete={handleSecondComplete}
          />
        </div>
      )}

      {/* Step: Review */}
      {step === 'review' && first && second && (
        <div className="space-y-6">
          <div className="rounded-2xl bg-white p-8 shadow-[var(--shadow-sm)]">
            <h2 className="mb-6 text-center text-lg font-bold text-charcoal">{labels.review}</h2>

            <div className="space-y-6">
              <div>
                <h3 className="mb-3 text-sm font-medium text-warm-gray">{labels.firstSelection}</h3>
                <ColorSequenceDisplay sequence={first} locale={locale} />
              </div>
              <div>
                <h3 className="mb-3 text-sm font-medium text-warm-gray">{labels.secondSelection}</h3>
                <ColorSequenceDisplay sequence={second} locale={locale} />
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                setFirst(null);
                setSecond(null);
                setStep('first');
              }}
              className="rounded-full border border-sand px-6 py-3 text-sm font-medium text-warm-gray transition-colors hover:bg-sand"
            >
              {labels.reset}
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="rounded-full bg-[var(--color-accent)] px-8 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {loading ? '...' : labels.generateAnalysis}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
