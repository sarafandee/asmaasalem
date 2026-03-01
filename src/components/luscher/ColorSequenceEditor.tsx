'use client';

import { useState, useCallback } from 'react';
import { LUSCHER_COLORS } from '@/lib/luscher/colors';
import type { ColorId } from '@/lib/luscher/types';
import { ColorCard } from './ColorCard';

interface ColorSequenceEditorProps {
  locale: string;
  initialSequence: ColorId[];
  label: string;
  labels: {
    selectColorPrompt: string;
    undo: string;
    reset: string;
  };
  onChange: (sequence: ColorId[]) => void;
}

const ALL_COLORS: ColorId[] = [0, 1, 2, 3, 4, 5, 6, 7];

export function ColorSequenceEditor({
  locale,
  initialSequence,
  label,
  labels,
  onChange,
}: ColorSequenceEditorProps) {
  const [editing, setEditing] = useState(false);
  const [selected, setSelected] = useState<ColorId[]>(initialSequence);
  const [tempSelected, setTempSelected] = useState<ColorId[]>([]);

  const handleStartEdit = useCallback(() => {
    setEditing(true);
    setTempSelected([]);
  }, []);

  const handleCancel = useCallback(() => {
    setEditing(false);
    setTempSelected([]);
  }, []);

  const handleColorClick = useCallback((colorId: ColorId) => {
    setTempSelected((prev) => {
      const next = [...prev, colorId];
      if (next.length === 8) {
        setSelected(next);
        setEditing(false);
        onChange(next);
      }
      return next;
    });
  }, [onChange]);

  const handleUndo = useCallback(() => {
    setTempSelected((prev) => prev.slice(0, -1));
  }, []);

  const handleReset = useCallback(() => {
    setTempSelected([]);
  }, []);

  const lang = locale === 'ar' ? 'ar' : 'en';
  const tempSet = new Set(tempSelected);

  if (!editing) {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-charcoal">{label}</h3>
          <button
            type="button"
            onClick={handleStartEdit}
            className="rounded-full border border-sand px-4 py-1.5 text-xs font-medium text-warm-gray transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
          >
            {labels.reset}
          </button>
        </div>
        <div className="flex items-center gap-1.5">
          {selected.map((colorId, index) => (
            <div key={index} className="flex flex-col items-center gap-1">
              <div
                className="h-10 w-10 rounded-lg shadow-sm"
                style={{ backgroundColor: LUSCHER_COLORS[colorId].hex }}
                title={LUSCHER_COLORS[colorId].name[lang]}
              />
              <span className="text-[10px] text-warm-gray">{colorId}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 rounded-xl border border-sand bg-light-gray/30 p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-charcoal">{label}</h3>
        <button
          type="button"
          onClick={handleCancel}
          className="text-xs font-medium text-warm-gray hover:text-charcoal"
        >
          &times;
        </button>
      </div>

      <p className="text-center text-xs text-warm-gray">
        {labels.selectColorPrompt} ({tempSelected.length}/8)
      </p>

      {/* Selected so far */}
      <div className="flex items-center justify-center gap-2 min-h-[3rem]">
        {tempSelected.map((colorId, index) => (
          <ColorCard
            key={`t-${index}`}
            hex={LUSCHER_COLORS[colorId].hex}
            label={LUSCHER_COLORS[colorId].name[lang]}
            size="sm"
            order={index + 1}
          />
        ))}
        {Array.from({ length: 8 - tempSelected.length }).map((_, i) => (
          <div key={`e-${i}`} className="h-10 w-10 rounded-lg border-2 border-dashed border-sand" />
        ))}
      </div>

      {/* Available colors */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {ALL_COLORS.map((colorId) => (
          <ColorCard
            key={colorId}
            hex={LUSCHER_COLORS[colorId].hex}
            label={LUSCHER_COLORS[colorId].name[lang]}
            size="md"
            selected={tempSet.has(colorId)}
            onClick={() => handleColorClick(colorId)}
          />
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={handleUndo}
          disabled={tempSelected.length === 0}
          className="rounded-full border border-sand px-4 py-1.5 text-xs font-medium text-warm-gray transition-colors hover:bg-sand disabled:opacity-40"
        >
          {labels.undo}
        </button>
        <button
          type="button"
          onClick={handleReset}
          disabled={tempSelected.length === 0}
          className="rounded-full border border-sand px-4 py-1.5 text-xs font-medium text-warm-gray transition-colors hover:bg-sand disabled:opacity-40"
        >
          {labels.reset}
        </button>
      </div>
    </div>
  );
}
