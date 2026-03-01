import type { PrognosisResult } from '../types';

/**
 * Determine prognosis by comparing exclamation totals
 * between 1st and 2nd color selections.
 *
 * If 2nd selection has fewer ! marks = favorable (improving)
 * If 2nd selection has more ! marks = unfavorable (worsening)
 * If equal = stable
 */
export function calculatePrognosis(
  firstTotal: number,
  secondTotal: number,
): PrognosisResult {
  if (secondTotal < firstTotal) return 'favorable';
  if (secondTotal > firstTotal) return 'unfavorable';
  return 'stable';
}
