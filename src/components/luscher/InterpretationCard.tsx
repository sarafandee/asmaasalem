'use client';

import { LUSCHER_COLORS } from '@/lib/luscher/colors';
import type { ColorId, AsteriskCount } from '@/lib/luscher/types';

interface InterpretationCardProps {
  title: string;
  functionSymbol: string;
  primary: ColorId;
  secondary: ColorId;
  text: string;
  asterisks: AsteriskCount;
  locale: string;
  /** For Table IV entries that have multiple text sections */
  sections?: Array<{ label: string; text: string }>;
}

function AsteriskBadge({ count }: { count: AsteriskCount }) {
  if (count === 0) return null;

  const colors = {
    1: 'bg-yellow-50 text-yellow-700',
    2: 'bg-orange-50 text-orange-700',
    3: 'bg-red-50 text-red-700',
  };

  return (
    <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-bold ${colors[count]}`}>
      {'*'.repeat(count)}
    </span>
  );
}

export function InterpretationCard({
  title,
  functionSymbol,
  primary,
  secondary,
  text,
  asterisks,
  locale,
  sections,
}: InterpretationCardProps) {
  const primaryColor = LUSCHER_COLORS[primary];
  const secondaryColor = LUSCHER_COLORS[secondary];
  const lang = locale === 'ar' ? 'ar' : 'en';

  return (
    <div className="rounded-2xl bg-white p-6 shadow-[var(--shadow-sm)]">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-light-gray text-sm font-bold text-charcoal">
            {functionSymbol}
          </span>
          <h3 className="text-sm font-bold text-charcoal">{title}</h3>
        </div>
        <AsteriskBadge count={asterisks} />
      </div>

      {/* Color pair */}
      <div className="mb-4 flex items-center gap-2">
        <div
          className="h-6 w-6 rounded"
          style={{ backgroundColor: primaryColor.hex }}
          title={primaryColor.name[lang]}
        />
        <span className="text-xs text-warm-gray">{primaryColor.name[lang]}</span>
        <span className="text-warm-gray">/</span>
        <div
          className="h-6 w-6 rounded"
          style={{ backgroundColor: secondaryColor.hex }}
          title={secondaryColor.name[lang]}
        />
        <span className="text-xs text-warm-gray">{secondaryColor.name[lang]}</span>
      </div>

      {/* Interpretation text */}
      {sections && sections.length > 0 ? (
        <div className="space-y-3">
          {sections.map((section, i) => (
            <div key={i}>
              <p className="text-xs font-bold uppercase tracking-wide text-warm-gray">{section.label}</p>
              <p className="mt-1 text-sm leading-relaxed text-charcoal">{section.text}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm leading-relaxed text-charcoal">{text}</p>
      )}
    </div>
  );
}
