import type {
  ColorId,
  InterpretationKey,
  StandardInterpretation,
  MinusInterpretation,
} from '../types';
import { TABLE_I_ENTRIES } from './table-i-plus';
import { TABLE_II_ENTRIES } from './table-ii-multiply';
import { TABLE_III_ENTRIES } from './table-iii-equal';
import { TABLE_IV_ENTRIES } from './table-iv-minus';
import { TABLE_V_ENTRIES } from './table-v-plus-minus';

/** Build a composite lookup key from two color IDs */
export function makeKey(primary: ColorId, secondary: ColorId): InterpretationKey {
  return `${primary}_${secondary}`;
}

/** Build a ReadonlyMap from an array of entries */
function buildMap<T extends { primary: ColorId; secondary: ColorId }>(
  entries: readonly T[],
): ReadonlyMap<InterpretationKey, T> {
  const map = new Map<InterpretationKey, T>();
  for (const entry of entries) {
    map.set(makeKey(entry.primary, entry.secondary), entry);
  }
  return map;
}

// Built once at module load time
export const tableI: ReadonlyMap<InterpretationKey, StandardInterpretation> = buildMap(TABLE_I_ENTRIES);
export const tableII: ReadonlyMap<InterpretationKey, StandardInterpretation> = buildMap(TABLE_II_ENTRIES);
export const tableIII: ReadonlyMap<InterpretationKey, StandardInterpretation> = buildMap(TABLE_III_ENTRIES);
export const tableIV: ReadonlyMap<InterpretationKey, MinusInterpretation> = buildMap(TABLE_IV_ENTRIES);
export const tableV: ReadonlyMap<InterpretationKey, StandardInterpretation> = buildMap(TABLE_V_ENTRIES);
