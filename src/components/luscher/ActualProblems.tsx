'use client';

import { LUSCHER_COLORS } from '@/lib/luscher/colors';
import type { ActualProblem, ColorId } from '@/lib/luscher/types';

interface ActualProblemsProps {
  problems: ActualProblem[];
  locale: string;
  labels: {
    title: string;
    rank: string;
    compensationLabel: string;
    anxietyLabel: string;
    noProblems: string;
    mostSignificant: string;
  };
}

export function ActualProblems({ problems, locale, labels }: ActualProblemsProps) {
  const lang = locale === 'ar' ? 'ar' : 'en';

  if (problems.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-[var(--shadow-sm)]">
        <h3 className="mb-2 text-sm font-bold text-charcoal">{labels.title}</h3>
        <p className="text-sm text-warm-gray">{labels.noProblems}</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-bold text-charcoal">{labels.title}</h3>
      {problems.map((problem, i) => {
        const compColor = LUSCHER_COLORS[problem.compensationColor];
        const anxColor = LUSCHER_COLORS[problem.anxietyColor];

        return (
          <div
            key={i}
            className={`rounded-2xl bg-white p-5 shadow-[var(--shadow-sm)] ${
              i === 0 ? 'ring-2 ring-[var(--color-accent)]/20' : ''
            }`}
          >
            {/* Header row */}
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {/* Rank badge */}
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                    i === 0
                      ? 'bg-[var(--color-accent)] text-white'
                      : 'bg-light-gray text-charcoal'
                  }`}
                >
                  #{problem.rank}
                </span>

                {i === 0 && (
                  <span className="text-xs font-medium text-[var(--color-accent)]">
                    {labels.mostSignificant}
                  </span>
                )}
              </div>

              {/* Asterisk badge */}
              {problem.interpretation.asterisks > 0 && (
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                    problem.interpretation.asterisks === 3
                      ? 'bg-red-50 text-red-700'
                      : problem.interpretation.asterisks === 2
                        ? 'bg-orange-50 text-orange-700'
                        : 'bg-yellow-50 text-yellow-700'
                  }`}
                >
                  {'*'.repeat(problem.interpretation.asterisks)}
                </span>
              )}
            </div>

            {/* Color pair display */}
            <div className="mb-3 flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <div
                  className="h-5 w-5 rounded"
                  style={{ backgroundColor: compColor.hex }}
                />
                <span className="text-xs text-purple-600">{labels.compensationLabel}</span>
              </div>
              <span className="text-warm-gray">&rarr;</span>
              <div className="flex items-center gap-1.5">
                <div
                  className="h-5 w-5 rounded"
                  style={{ backgroundColor: anxColor.hex }}
                />
                <span className="text-xs text-amber-600">{labels.anxietyLabel}</span>
              </div>
            </div>

            {/* Interpretation text */}
            <p className="text-sm leading-relaxed text-charcoal/80">
              {problem.interpretation.text[lang]}
            </p>
          </div>
        );
      })}
    </div>
  );
}
