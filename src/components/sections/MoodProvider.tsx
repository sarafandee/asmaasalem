'use client';

import { createContext, useContext, useState } from 'react';

import { LUSCHER_COLORS, type LuscherColor } from '@/lib/palette';

interface MoodContextValue {
  picked: LuscherColor | null;
  pick: (color: LuscherColor | null) => void;
}

const MoodContext = createContext<MoodContextValue>({ picked: null, pick: () => {} });

export function useMood() {
  return useContext(MoodContext);
}

/**
 * Wraps the homepage. When a visitor picks a colour in the hero, the page's
 * live accent (--live-*) takes on that colour; otherwise the locale accent shows.
 */
export function MoodProvider({ children }: { children: React.ReactNode }) {
  const [picked, setPicked] = useState<LuscherColor | null>(null);
  const colors = picked ? LUSCHER_COLORS[picked] : null;

  const style = colors
    ? ({
        '--live-fill': colors.fill,
        '--live-ink': colors.ink,
        '--live-on-dark': colors.onDark,
      } as React.CSSProperties)
    : undefined;

  return (
    <MoodContext.Provider value={{ picked, pick: setPicked }}>
      <div style={style}>{children}</div>
    </MoodContext.Provider>
  );
}
