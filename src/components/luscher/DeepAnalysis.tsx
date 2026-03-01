'use client';

import { useState } from 'react';
import { LUSCHER_COLORS } from '@/lib/luscher/colors';
import type {
  DeepAnalysis as DeepAnalysisType,
  ColorId,
} from '@/lib/luscher/types';

interface DeepAnalysisProps {
  analysis: DeepAnalysisType;
  locale: string;
  labels: {
    title: string;
    workGroup: {
      title: string;
      intact: string;
      fragmented: string;
      inAbeyance: string;
      exhaustibility: string;
      leadingColor: string;
      prestige: string;
      achievement: string;
      interest: string;
    };
    autonomic: {
      title: string;
      stable: string;
      unstable: string;
    };
    conflict: {
      title: string;
      detected: string;
      none: string;
    };
    ambivalence: {
      title: string;
      noAmbivalence: string;
      preferredToRejected: string;
      rejectedToPreferred: string;
    };
    comparison: {
      title: string;
      similarity: string;
      rigid: string;
      normal: string;
      volatile: string;
      movedForward: string;
      movedBackward: string;
    };
  };
}

function Section({
  title,
  badge,
  badgeColor,
  defaultOpen = false,
  children,
}: {
  title: string;
  badge?: string;
  badgeColor?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="rounded-xl bg-white shadow-[var(--shadow-sm)]">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between p-4 text-start"
      >
        <div className="flex items-center gap-2">
          <h4 className="text-sm font-bold text-charcoal">{title}</h4>
          {badge && (
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${badgeColor}`}>
              {badge}
            </span>
          )}
        </div>
        <svg
          className={`h-4 w-4 text-warm-gray transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <div className="border-t border-sand px-4 pb-4 pt-3">{children}</div>}
    </div>
  );
}

export function DeepAnalysis({ analysis, locale, labels }: DeepAnalysisProps) {
  const lang = locale === 'ar' ? 'ar' : 'en';

  const { workGroup, autonomicStability, conflict, ambivalentColors, selectionComparison } = analysis;

  // Work-group leading color label
  const leadingApproach = workGroup.leadingColor === 2 ? labels.workGroup.prestige
    : workGroup.leadingColor === 3 ? labels.workGroup.achievement
    : workGroup.leadingColor === 4 ? labels.workGroup.interest
    : '';

  // Comparison rigidity label
  const rigidityLabel = selectionComparison.rigidity === 'rigid' ? labels.comparison.rigid
    : selectionComparison.rigidity === 'volatile' ? labels.comparison.volatile
    : labels.comparison.normal;

  const rigidityColor = selectionComparison.rigidity === 'rigid' ? 'bg-orange-50 text-orange-700'
    : selectionComparison.rigidity === 'volatile' ? 'bg-red-50 text-red-700'
    : 'bg-green-50 text-green-700';

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-bold text-charcoal">{labels.title}</h3>

      {/* Work-Group */}
      <Section
        title={labels.workGroup.title}
        badge={workGroup.intact ? labels.workGroup.intact : labels.workGroup.fragmented}
        badgeColor={workGroup.intact ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}
        defaultOpen
      >
        <p className="text-sm leading-relaxed text-charcoal/80">{workGroup.assessment[lang]}</p>

        {workGroup.intact && workGroup.leadingColor && (
          <div className="mt-3 flex items-center gap-2">
            <div
              className="h-4 w-4 rounded"
              style={{ backgroundColor: LUSCHER_COLORS[workGroup.leadingColor].hex }}
            />
            <span className="text-xs text-warm-gray">
              {labels.workGroup.leadingColor}: {leadingApproach}
            </span>
          </div>
        )}

        {workGroup.exhaustibility && (
          <p className="mt-2 text-xs font-medium text-orange-600">
            {labels.workGroup.exhaustibility}
          </p>
        )}

        {/* Position indicators */}
        <div className="mt-3 flex gap-3">
          {([2, 3, 4] as ColorId[]).map(cid => {
            const pos = cid === 2 ? workGroup.positions.color2
              : cid === 3 ? workGroup.positions.color3
              : workGroup.positions.color4;
            return (
              <div key={cid} className="flex items-center gap-1">
                <div
                  className="h-4 w-4 rounded"
                  style={{ backgroundColor: LUSCHER_COLORS[cid].hex }}
                />
                <span className="text-[10px] text-warm-gray">pos {pos + 1}</span>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Autonomic Stability */}
      <Section
        title={labels.autonomic.title}
        badge={autonomicStability.unstable ? labels.autonomic.unstable : labels.autonomic.stable}
        badgeColor={autonomicStability.unstable ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}
      >
        <p className="text-sm leading-relaxed text-charcoal/80">
          {autonomicStability.assessment[lang]}
        </p>
      </Section>

      {/* Conflict */}
      <Section
        title={labels.conflict.title}
        badge={conflict.conflictPresent ? labels.conflict.detected : labels.conflict.none}
        badgeColor={conflict.conflictPresent ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}
      >
        <p className="text-sm leading-relaxed text-charcoal/80">
          {conflict.assessment[lang]}
        </p>
      </Section>

      {/* Ambivalence */}
      <Section
        title={labels.ambivalence.title}
        badge={ambivalentColors.length > 0 ? String(ambivalentColors.length) : undefined}
        badgeColor="bg-amber-50 text-amber-700"
      >
        {ambivalentColors.length === 0 ? (
          <p className="text-sm text-warm-gray">{labels.ambivalence.noAmbivalence}</p>
        ) : (
          <div className="space-y-3">
            {ambivalentColors.map((ac, i) => {
              const color = LUSCHER_COLORS[ac.colorId];
              const dirLabel = ac.direction === 'preferred_to_rejected'
                ? labels.ambivalence.preferredToRejected
                : labels.ambivalence.rejectedToPreferred;

              return (
                <div key={i} className="flex items-start gap-3">
                  <div
                    className="mt-0.5 h-5 w-5 shrink-0 rounded"
                    style={{ backgroundColor: color.hex }}
                  />
                  <div>
                    <p className="text-sm font-medium text-charcoal">
                      {color.name[lang]}: {dirLabel}
                    </p>
                    <p className="text-xs text-warm-gray">
                      pos {ac.firstPosition + 1} &rarr; pos {ac.secondPosition + 1}
                    </p>
                    {ac.interpretation && (
                      <p className="mt-1 text-sm text-charcoal/70">
                        {ac.interpretation.text[lang]}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Section>

      {/* Selection Comparison */}
      <Section
        title={labels.comparison.title}
        badge={rigidityLabel}
        badgeColor={rigidityColor}
      >
        {/* Similarity bar */}
        <div className="mb-3">
          <div className="flex items-center justify-between text-xs text-warm-gray">
            <span>{labels.comparison.similarity}</span>
            <span>{Math.round(selectionComparison.similarityScore * 100)}%</span>
          </div>
          <div className="mt-1 h-2 overflow-hidden rounded-full bg-light-gray">
            <div
              className="h-full rounded-full bg-[var(--color-accent)] transition-all"
              style={{ width: `${selectionComparison.similarityScore * 100}%` }}
            />
          </div>
        </div>

        <p className="text-sm leading-relaxed text-charcoal/80">
          {selectionComparison.assessment[lang]}
        </p>

        {/* Moved colors */}
        {selectionComparison.movedForward.length > 0 && (
          <div className="mt-3">
            <p className="text-xs font-medium text-green-700">{labels.comparison.movedForward}</p>
            <div className="mt-1 flex flex-wrap gap-2">
              {selectionComparison.movedForward.map((m, i) => (
                <div key={i} className="flex items-center gap-1">
                  <div
                    className="h-4 w-4 rounded"
                    style={{ backgroundColor: LUSCHER_COLORS[m.colorId].hex }}
                  />
                  <span className="text-[10px] text-warm-gray">
                    {m.from + 1} &rarr; {m.to + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectionComparison.movedBackward.length > 0 && (
          <div className="mt-3">
            <p className="text-xs font-medium text-red-700">{labels.comparison.movedBackward}</p>
            <div className="mt-1 flex flex-wrap gap-2">
              {selectionComparison.movedBackward.map((m, i) => (
                <div key={i} className="flex items-center gap-1">
                  <div
                    className="h-4 w-4 rounded"
                    style={{ backgroundColor: LUSCHER_COLORS[m.colorId].hex }}
                  />
                  <span className="text-[10px] text-warm-gray">
                    {m.from + 1} &rarr; {m.to + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </Section>
    </div>
  );
}
