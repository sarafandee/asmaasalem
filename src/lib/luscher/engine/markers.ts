import type {
  ColorSequence,
  BasicColorId,
  AuxiliaryColorId,
  AnxietyMarker,
  CompensationMarker,
  ExclamationCount,
} from '../types';
import { BASIC_COLOR_IDS, AUXILIARY_COLOR_IDS } from '../colors';

/**
 * Calculate anxiety markers.
 * Basic colors (1,2,3,4) in positions 6,7,8 (0-indexed: 5,6,7)
 * get 1, 2, or 3 exclamation marks respectively.
 */
export function calculateAnxietyMarkers(sequence: ColorSequence): AnxietyMarker[] {
  const markers: AnxietyMarker[] = [];

  const positions: Array<{ index: number; exclamations: ExclamationCount }> = [
    { index: 5, exclamations: 1 },
    { index: 6, exclamations: 2 },
    { index: 7, exclamations: 3 },
  ];

  for (const { index, exclamations } of positions) {
    const colorId = sequence[index];
    if ((BASIC_COLOR_IDS as readonly number[]).includes(colorId)) {
      markers.push({
        colorId: colorId as BasicColorId,
        position: index,
        exclamations,
      });
    }
  }

  return markers;
}

/**
 * Calculate compensation markers.
 * Auxiliary colors (0,6,7) in positions 1,2,3 (0-indexed: 0,1,2)
 * get 3, 2, or 1 exclamation marks respectively.
 */
export function calculateCompensationMarkers(sequence: ColorSequence): CompensationMarker[] {
  const markers: CompensationMarker[] = [];

  const positions: Array<{ index: number; exclamations: ExclamationCount }> = [
    { index: 0, exclamations: 3 },
    { index: 1, exclamations: 2 },
    { index: 2, exclamations: 1 },
  ];

  for (const { index, exclamations } of positions) {
    const colorId = sequence[index];
    if ((AUXILIARY_COLOR_IDS as readonly number[]).includes(colorId)) {
      markers.push({
        colorId: colorId as AuxiliaryColorId,
        position: index,
        exclamations,
      });
    }
  }

  return markers;
}

/** Sum all exclamation marks */
export function totalExclamations(
  anxiety: AnxietyMarker[],
  compensation: CompensationMarker[],
): number {
  const a = anxiety.reduce((sum, m) => sum + m.exclamations, 0);
  const c = compensation.reduce((sum, m) => sum + m.exclamations, 0);
  return a + c;
}
