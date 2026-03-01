'use client';

import { useState, useCallback } from 'react';
import { LUSCHER_COLORS } from '@/lib/luscher/colors';
import type { ColorId } from '@/lib/luscher/types';
import { ColorCard } from './ColorCard';

interface ColorSequenceInputProps {
  locale: string;
  labels: {
    selectColorPrompt: string;
    undo: string;
    reset: string;
  };
  onComplete: (sequence: ColorId[]) => void;
  initialOrder?: number[];
}

/** Deterministic shuffle using a seed (Fisher-Yates) */
function shuffleWithSeed(arr: ColorId[], seed: number): ColorId[] {
  const result = [...arr];
  let s = seed;
  for (let i = result.length - 1; i > 0; i--) {
    s = (s * 16807 + 0) % 2147483647;
    const j = s % (i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

const ALL_COLORS: ColorId[] = [0, 1, 2, 3, 4, 5, 6, 7];

export function ColorSequenceInput({
  locale,
  labels,
  onComplete,
  initialOrder,
}: ColorSequenceInputProps) {
  const [displayOrder] = useState<ColorId[]>(() => {
    if (initialOrder) return initialOrder as ColorId[];
    return shuffleWithSeed(ALL_COLORS, Date.now());
  });

  const [selected, setSelected] = useState<ColorId[]>([]);

  const handleColorClick = useCallback((colorId: ColorId) => {
    setSelected((prev) => {
      const next = [...prev, colorId];
      if (next.length === 8) {
        // Defer the callback to avoid state update during render
        setTimeout(() => onComplete(next), 0);
      }
      return next;
    });
  }, [onComplete]);

  const handleUndo = useCallback(() => {
    setSelected((prev) => prev.slice(0, -1));
  }, []);

  const handleReset = useCallback(() => {
    setSelected([]);
  }, []);

  const selectedSet = new Set(selected);

  return (
    <div className="space-y-8">
      {/* Instruction */}
      <p className="text-center text-sm font-medium text-warm-gray">
        {labels.selectColorPrompt} ({selected.length}/8)
      </p>

      {/* Selected sequence bar */}
      <div className="flex items-center justify-center gap-2 min-h-[4rem]">
        {selected.map((colorId, index) => (
          <ColorCard
            key={`selected-${index}`}
            hex={LUSCHER_COLORS[colorId].hex}
            label={LUSCHER_COLORS[colorId].name[locale === 'ar' ? 'ar' : 'en']}
            size="sm"
            order={index + 1}
          />
        ))}
        {/* Empty placeholders */}
        {Array.from({ length: 8 - selected.length }).map((_, i) => (
          <div
            key={`empty-${i}`}
            className="h-12 w-12 rounded-lg border-2 border-dashed border-sand"
          />
        ))}
      </div>

      {/* Available colors grid */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        {displayOrder.map((colorId) => (
          <ColorCard
            key={colorId}
            hex={LUSCHER_COLORS[colorId].hex}
            label={LUSCHER_COLORS[colorId].name[locale === 'ar' ? 'ar' : 'en']}
            size="lg"
            selected={selectedSet.has(colorId)}
            onClick={() => handleColorClick(colorId)}
          />
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={handleUndo}
          disabled={selected.length === 0}
          className="rounded-full border border-sand px-5 py-2 text-sm font-medium text-warm-gray transition-colors hover:bg-sand disabled:opacity-40"
        >
          {labels.undo}
        </button>
        <button
          type="button"
          onClick={handleReset}
          disabled={selected.length === 0}
          className="rounded-full border border-sand px-5 py-2 text-sm font-medium text-warm-gray transition-colors hover:bg-sand disabled:opacity-40"
        >
          {labels.reset}
        </button>
      </div>
    </div>
  );
}
