'use client';

import { LUSCHER_COLORS } from '@/lib/luscher/colors';
import type { ColorId } from '@/lib/luscher/types';

interface ColorProfileNoteProps {
  colorId: ColorId;
  position: number;
  note: string;
  locale: string;
  positionLabel: string;
}

export function ColorProfileNote({
  colorId,
  position,
  note,
  locale,
  positionLabel,
}: ColorProfileNoteProps) {
  const color = LUSCHER_COLORS[colorId];
  const lang = locale === 'ar' ? 'ar' : 'en';

  return (
    <div
      className="rounded-xl bg-white p-4 shadow-[var(--shadow-sm)]"
      style={{ borderInlineStart: `4px solid ${color.hex}` }}
    >
      <div className="mb-2 flex items-center gap-2">
        <div
          className="h-5 w-5 rounded"
          style={{ backgroundColor: color.hex }}
        />
        <span className="text-sm font-bold text-charcoal">{color.name[lang]}</span>
        <span className="text-xs text-warm-gray">
          {positionLabel} {position + 1}
        </span>
      </div>
      <p className="text-sm leading-relaxed text-charcoal/80">{note}</p>
    </div>
  );
}
