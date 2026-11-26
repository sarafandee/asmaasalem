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
