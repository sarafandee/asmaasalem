'use client';

import { LUSCHER_COLORS } from '@/lib/luscher/colors';
import type { ColorId, SelectionAnalysis } from '@/lib/luscher/types';

interface ScoringProtocolProps {
  firstSelection: SelectionAnalysis;
  secondSelection: SelectionAnalysis;
  locale: string;
  labels: {
    firstSelection: string;
    secondSelection: string;
    compensation: string;
    anxiety: string;
    totalMarkers: string;
  };
}

const FUNCTION_SYMBOLS = ['+', '+', '\u00d7', '\u00d7', '=', '=', '\u2013', '\u2013'];

function SelectionRow({
  analysis,
  label,
  locale,
  compensationLabel,
  anxietyLabel,
}: {
  analysis: SelectionAnalysis;
  label: string;
  locale: string;
  compensationLabel: string;
  anxietyLabel: string;
}) {
  const lang = locale === 'ar' ? 'ar' : 'en';
  const compPositions = new Set(analysis.compensationMarkers.map(m => m.position));
  const anxPositions = new Set(analysis.anxietyMarkers.map(m => m.position));

  // Build exclamation lookup: position → count
  const exclamationMap = new Map<number, number>();
  for (const m of analysis.compensationMarkers) {
    exclamationMap.set(m.position, m.exclamations);
  }
  for (const m of analysis.anxietyMarkers) {
    exclamationMap.set(m.position, m.exclamations);
  }

  return (
    <div className="rounded-xl bg-white p-4 shadow-[var(--shadow-sm)]">
      <p className="mb-3 text-xs font-bold uppercase tracking-wide text-warm-gray">{label}</p>
      <div className="flex items-end gap-1 overflow-x-auto pb-1">
        {analysis.sequence.map((colorId, index) => {
          const color = LUSCHER_COLORS[colorId as ColorId];
          const isComp = compPositions.has(index);
          const isAnx = anxPositions.has(index);
          const exclamations = exclamationMap.get(index);

          return (
            <div key={index} className="flex min-w-[3rem] flex-col items-center gap-0.5">
              {/* C marker */}
              {isComp && (
                <span className="text-[10px] font-bold text-purple-600">{compensationLabel}</span>
              )}
              {!isComp && <span className="text-[10px] opacity-0">C</span>}

              {/* Function symbol */}
              <span className="text-[11px] font-medium text-warm-gray">
                {FUNCTION_SYMBOLS[index]}
              </span>

              {/* Color swatch */}
              <div
                className="h-10 w-10 rounded-lg shadow-sm transition-transform hover:scale-105"
                style={{ backgroundColor: color.hex }}
                title={`${color.name[lang]} (${colorId})`}
              />

              {/* Color ID */}
              <span className="text-[10px] text-warm-gray">{colorId}</span>

              {/* A marker */}
              {isAnx && (
                <span className="text-[10px] font-bold text-amber-600">{anxietyLabel}</span>
              )}
              {!isAnx && <span className="text-[10px] opacity-0">A</span>}

              {/* Exclamation badges */}
              {exclamations && (
                <span className={`text-[10px] font-bold ${isComp ? 'text-purple-600' : 'text-amber-600'}`}>
                  {'!'.repeat(exclamations)}
                </span>
              )}
              {!exclamations && <span className="text-[10px] opacity-0">!</span>}
            </div>
          );
        })}

        {/* Total */}
        <div className="flex min-w-[3rem] flex-col items-center justify-end ps-2 border-s border-sand">
          <span className="text-[10px] text-warm-gray">&Sigma;</span>
          <span className="text-lg font-bold text-charcoal">{analysis.totalExclamations}</span>
          <span className="text-[10px] text-warm-gray">!</span>
        </div>
      </div>
    </div>
  );
}

export function ScoringProtocol({
  firstSelection,
  secondSelection,
  locale,
  labels,
}: ScoringProtocolProps) {
  return (
    <div className="space-y-3">
      <SelectionRow
        analysis={firstSelection}
        label={labels.firstSelection}
        locale={locale}
        compensationLabel={labels.compensation}
        anxietyLabel={labels.anxiety}
      />
      <SelectionRow
        analysis={secondSelection}
        label={labels.secondSelection}
        locale={locale}
        compensationLabel={labels.compensation}
        anxietyLabel={labels.anxiety}
      />
    </div>
  );
}
