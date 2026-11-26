/**
 * The four basic Lüscher colours used across the public site. `fill` is the
 * surface colour, `ink` the text colour that passes contrast on it, and
 * `onDark` a tint readable as text on the ink background.
 */
export const LUSCHER_COLORS = {
  blue: { fill: '#2b4fa8', ink: '#ffffff', onDark: '#9db6ff' },
  green: { fill: '#23a07d', ink: '#14161b', onDark: '#5fd3ae' },
  red: { fill: '#f0503a', ink: '#14161b', onDark: '#ff8a78' },
  yellow: { fill: '#f5c230', ink: '#14161b', onDark: '#f5c230' },
} as const;

export type LuscherColor = keyof typeof LUSCHER_COLORS;

/**
 * The logo's leaf colours: the brand palette for everything that is not the
 * Lüscher test itself. `mark` is the highlighter tint used behind words.
 */
export const LEAF_COLORS = {
  blue: { fill: '#8fc3ea', mark: 'rgba(143, 195, 234, 0.6)' },
  green: { fill: '#8cc870', mark: 'rgba(140, 200, 112, 0.55)' },
  red: { fill: '#f2665a', mark: 'rgba(242, 102, 90, 0.4)' },
  yellow: { fill: '#ffd45e', mark: 'rgba(255, 212, 94, 0.6)' },
} as const satisfies Record<LuscherColor, { fill: string; mark: string }>;
