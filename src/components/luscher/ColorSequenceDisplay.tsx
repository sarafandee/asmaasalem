'use client';

import { LUSCHER_COLORS } from '@/lib/luscher/colors';
import type { ColorId } from '@/lib/luscher/types';

interface ColorSequenceDisplayProps {
  sequence: ColorId[];
  locale: string;
  showPositions?: boolean;
}

const FUNCTION_LABELS: Record<string, string> = {
  '0': '+',
  '1': '+',
  '2': '\u00d7',
  '3': '\u00d7',
  '4': '=',
  '5': '=',
  '6': '\u2013',
  '7': '\u2013',
};

export function ColorSequenceDisplay({
  sequence,
  locale,
  showPositions = true,
}: ColorSequenceDisplayProps) {
  return (
    <div className="flex items-end gap-1.5">
      {sequence.map((colorId, index) => {
        const color = LUSCHER_COLORS[colorId as ColorId];
        return (
          <div key={index} className="flex flex-col items-center gap-1">
            {showPositions && (
              <span className="text-xs font-medium text-warm-gray">
                {FUNCTION_LABELS[index.toString()]}
              </span>
            )}
            <div
              className="h-10 w-10 rounded-lg shadow-sm"
              style={{ backgroundColor: color.hex }}
              title={color.name[locale === 'ar' ? 'ar' : 'en']}
            />
            <span className="text-[10px] text-warm-gray">{colorId}</span>
          </div>
        );
      })}
    </div>
  );
}
