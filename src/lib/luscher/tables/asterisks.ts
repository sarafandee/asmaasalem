import type { ColorId, AsteriskCount } from '../types';

/**
 * Appendix B: Optimum and Sub-optimum Functional Groups
 * as shown by allocation of asterisks (*s).
 *
 * From the Luscher Color Test book (p.173):
 * - No * = no conflict or minimal conflict
 * - 1 * = some conflict, not necessarily serious
 * - 2 *s = appreciable conflict
 * - 3 *s = serious conflict
 *
 * The overall interpretation must always be borne in mind.
 *
 * Data reproduced from Tables I, II, III, IV and V.
 * Key format: "primary_secondary" → asterisk count per function type.
 */

export interface AsteriskEntry {
  primary: ColorId;
  secondary: ColorId;
  plus: AsteriskCount;      // + Function (Table I)
  multiply: AsteriskCount;  // × Function (Table II)
  equal: AsteriskCount;     // = Function (Table III)
  minus: AsteriskCount;     // - Function (Table IV)
  plusMinus: AsteriskCount;  // +- Function (Table V)
}

/**
 * Complete asterisk matrix from Appendix B (p.173).
 * Organized by primary color, then secondary color.
 */
export const ASTERISK_MATRIX: readonly AsteriskEntry[] = [
  /* ---- Primary 0 (Grey) ---- */
  { primary: 0, secondary: 0, plus: 3, multiply: 3, equal: 0, minus: 3, plusMinus: 0 },
  { primary: 0, secondary: 1, plus: 1, multiply: 1, equal: 0, minus: 2, plusMinus: 2 },
  { primary: 0, secondary: 2, plus: 1, multiply: 1, equal: 0, minus: 2, plusMinus: 2 },
  { primary: 0, secondary: 3, plus: 1, multiply: 1, equal: 0, minus: 2, plusMinus: 2 },
  { primary: 0, secondary: 4, plus: 2, multiply: 2, equal: 0, minus: 2, plusMinus: 2 },
  { primary: 0, secondary: 5, plus: 0, multiply: 0, equal: 0, minus: 0, plusMinus: 0 },
  { primary: 0, secondary: 6, plus: 2, multiply: 2, equal: 0, minus: 0, plusMinus: 0 },
  { primary: 0, secondary: 7, plus: 3, multiply: 3, equal: 0, minus: 0, plusMinus: 0 },

  /* ---- Primary 1 (Blue) ---- */
  { primary: 1, secondary: 0, plus: 1, multiply: 1, equal: 1, minus: 1, plusMinus: 0 },
  { primary: 1, secondary: 1, plus: 0, multiply: 0, equal: 0, minus: 2, plusMinus: 1 },
  { primary: 1, secondary: 2, plus: 0, multiply: 0, equal: 0, minus: 1, plusMinus: 1 },
  { primary: 1, secondary: 3, plus: 0, multiply: 0, equal: 0, minus: 1, plusMinus: 1 },
  { primary: 1, secondary: 4, plus: 0, multiply: 0, equal: 0, minus: 0, plusMinus: 0 },
  { primary: 1, secondary: 5, plus: 1, multiply: 1, equal: 1, minus: 0, plusMinus: 0 },
  { primary: 1, secondary: 6, plus: 1, multiply: 1, equal: 1, minus: 0, plusMinus: 0 },
  { primary: 1, secondary: 7, plus: 2, multiply: 2, equal: 1, minus: 0, plusMinus: 0 },

  /* ---- Primary 2 (Green) ---- */
  { primary: 2, secondary: 0, plus: 1, multiply: 1, equal: 2, minus: 2, plusMinus: 0 },
  { primary: 2, secondary: 1, plus: 0, multiply: 0, equal: 0, minus: 1, plusMinus: 2 },
  { primary: 2, secondary: 2, plus: 0, multiply: 0, equal: 0, minus: 3, plusMinus: 1 },
  { primary: 2, secondary: 3, plus: 0, multiply: 0, equal: 1, minus: 1, plusMinus: 1 },
  { primary: 2, secondary: 4, plus: 0, multiply: 0, equal: 0, minus: 0, plusMinus: 1 },
  { primary: 2, secondary: 5, plus: 1, multiply: 1, equal: 1, minus: 0, plusMinus: 0 },
  { primary: 2, secondary: 6, plus: 2, multiply: 2, equal: 2, minus: 0, plusMinus: 0 },
  { primary: 2, secondary: 7, plus: 2, multiply: 2, equal: 2, minus: 0, plusMinus: 0 },

  /* ---- Primary 3 (Red) ---- */
  { primary: 3, secondary: 0, plus: 1, multiply: 1, equal: 1, minus: 2, plusMinus: 0 },
  { primary: 3, secondary: 1, plus: 0, multiply: 0, equal: 0, minus: 1, plusMinus: 2 },
  { primary: 3, secondary: 2, plus: 0, multiply: 1, equal: 0, minus: 1, plusMinus: 1 },
  { primary: 3, secondary: 3, plus: 0, multiply: 0, equal: 0, minus: 2, plusMinus: 1 },
  { primary: 3, secondary: 4, plus: 0, multiply: 0, equal: 0, minus: 0, plusMinus: 1 },
  { primary: 3, secondary: 5, plus: 0, multiply: 0, equal: 0, minus: 0, plusMinus: 0 },
  { primary: 3, secondary: 6, plus: 1, multiply: 1, equal: 1, minus: 0, plusMinus: 0 },
  { primary: 3, secondary: 7, plus: 2, multiply: 2, equal: 1, minus: 0, plusMinus: 0 },

  /* ---- Primary 4 (Yellow) ---- */
  { primary: 4, secondary: 0, plus: 2, multiply: 2, equal: 1, minus: 1, plusMinus: 0 },
  { primary: 4, secondary: 1, plus: 0, multiply: 0, equal: 0, minus: 1, plusMinus: 2 },
  { primary: 4, secondary: 2, plus: 0, multiply: 0, equal: 0, minus: 1, plusMinus: 2 },
  { primary: 4, secondary: 3, plus: 0, multiply: 0, equal: 0, minus: 1, plusMinus: 1 },
  { primary: 4, secondary: 4, plus: 0, multiply: 0, equal: 0, minus: 2, plusMinus: 1 },
  { primary: 4, secondary: 5, plus: 0, multiply: 0, equal: 1, minus: 0, plusMinus: 0 },
  { primary: 4, secondary: 6, plus: 1, multiply: 1, equal: 1, minus: 0, plusMinus: 0 },
  { primary: 4, secondary: 7, plus: 1, multiply: 1, equal: 1, minus: 0, plusMinus: 0 },

  /* ---- Primary 5 (Violet) ---- */
  { primary: 5, secondary: 0, plus: 0, multiply: 0, equal: 0, minus: 0, plusMinus: 0 },
  { primary: 5, secondary: 1, plus: 1, multiply: 1, equal: 1, minus: 0, plusMinus: 0 },
  { primary: 5, secondary: 2, plus: 1, multiply: 1, equal: 1, minus: 1, plusMinus: 0 },
  { primary: 5, secondary: 3, plus: 0, multiply: 0, equal: 0, minus: 0, plusMinus: 0 },
  { primary: 5, secondary: 4, plus: 0, multiply: 0, equal: 1, minus: 0, plusMinus: 0 },
  { primary: 5, secondary: 5, plus: 0, multiply: 0, equal: 0, minus: 0, plusMinus: 0 },
  { primary: 5, secondary: 6, plus: 0, multiply: 0, equal: 0, minus: 0, plusMinus: 0 },
  { primary: 5, secondary: 7, plus: 0, multiply: 0, equal: 0, minus: 0, plusMinus: 0 },

  /* ---- Primary 6 (Brown) ---- */
  { primary: 6, secondary: 0, plus: 2, multiply: 2, equal: 0, minus: 0, plusMinus: 0 },
  { primary: 6, secondary: 1, plus: 1, multiply: 1, equal: 1, minus: 0, plusMinus: 0 },
  { primary: 6, secondary: 2, plus: 2, multiply: 2, equal: 2, minus: 0, plusMinus: 0 },
  { primary: 6, secondary: 3, plus: 1, multiply: 1, equal: 1, minus: 0, plusMinus: 0 },
  { primary: 6, secondary: 4, plus: 1, multiply: 1, equal: 1, minus: 0, plusMinus: 0 },
  { primary: 6, secondary: 5, plus: 0, multiply: 0, equal: 0, minus: 0, plusMinus: 0 },
  { primary: 6, secondary: 6, plus: 0, multiply: 0, equal: 0, minus: 0, plusMinus: 0 },
  { primary: 6, secondary: 7, plus: 0, multiply: 0, equal: 0, minus: 0, plusMinus: 0 },

  /* ---- Primary 7 (Black) ---- */
  { primary: 7, secondary: 0, plus: 3, multiply: 3, equal: 0, minus: 0, plusMinus: 0 },
  { primary: 7, secondary: 1, plus: 2, multiply: 2, equal: 1, minus: 0, plusMinus: 0 },
  { primary: 7, secondary: 2, plus: 2, multiply: 2, equal: 2, minus: 0, plusMinus: 0 },
  { primary: 7, secondary: 3, plus: 2, multiply: 2, equal: 1, minus: 0, plusMinus: 0 },
  { primary: 7, secondary: 4, plus: 1, multiply: 1, equal: 1, minus: 0, plusMinus: 0 },
  { primary: 7, secondary: 5, plus: 0, multiply: 0, equal: 0, minus: 0, plusMinus: 0 },
  { primary: 7, secondary: 6, plus: 0, multiply: 0, equal: 0, minus: 0, plusMinus: 0 },
  { primary: 7, secondary: 7, plus: 0, multiply: 0, equal: 0, minus: 0, plusMinus: 0 },
];

/** Build lookup map for quick asterisk retrieval */
function buildAsteriskMap(): ReadonlyMap<string, AsteriskEntry> {
  const map = new Map<string, AsteriskEntry>();
  for (const entry of ASTERISK_MATRIX) {
    map.set(`${entry.primary}_${entry.secondary}`, entry);
  }
  return map;
}

export const asteriskMap: ReadonlyMap<string, AsteriskEntry> = buildAsteriskMap();
