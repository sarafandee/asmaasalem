/**
 * Multiple Actual Problems computation (p.40-42).
 *
 * The book says the "actual problem" is the combination of a compensation
 * (compulsive behavior) with an anxiety (unsatisfied need). When there are
 * multiple compensations and anxieties, ALL pairs must be computed and ranked.
 *
 * Priority ranking (p.42):
 *   1st position comp + 8th position anx = most significant
 *   1st position comp + 7th position anx = next
 *   2nd position comp + 8th position anx = next
 *   ... etc.
 */

import type { SelectionAnalysis, ActualProblem, ColorId } from '../types';
import { tableV, makeKey } from '../tables';

/**
 * Priority map: key = "compPosition_anxPosition" (0-indexed), value = rank.
 * Lower rank = more significant. Based on the table on p.42.
 */
const PRIORITY_MAP: Record<string, number> = {
  '0_7': 1,  // 1st comp + 8th anx (most significant)
  '0_6': 2,  // 1st comp + 7th anx
  '1_7': 3,  // 2nd comp + 8th anx
  '0_5': 4,  // 1st comp + 6th anx
  '1_6': 5,  // 2nd comp + 7th anx
  '2_7': 6,  // 3rd comp + 8th anx
  '1_5': 7,  // 2nd comp + 6th anx
  '2_6': 8,  // 3rd comp + 7th anx
  '2_5': 9,  // 3rd comp + 6th anx (least significant)
};

/**
 * Compute all actual problems from a selection's compensation and anxiety markers.
 * Returns an array sorted by significance (rank 1 first).
 */
export function computeActualProblems(analysis: SelectionAnalysis): ActualProblem[] {
  const { compensationMarkers, anxietyMarkers } = analysis;

  if (compensationMarkers.length === 0 || anxietyMarkers.length === 0) {
    return [];
  }

  const problems: ActualProblem[] = [];

  for (const comp of compensationMarkers) {
    for (const anx of anxietyMarkers) {
      const key = makeKey(comp.colorId as ColorId, anx.colorId as ColorId);
      const interpretation = tableV.get(key);
      if (!interpretation) continue;

      const priorityKey = `${comp.position}_${anx.position}`;
      const rank = PRIORITY_MAP[priorityKey] ?? 10;

      problems.push({
        compensationColor: comp.colorId as ColorId,
        compensationPosition: comp.position,
        anxietyColor: anx.colorId as ColorId,
        anxietyPosition: anx.position,
        rank,
        interpretation,
      });
    }
  }

  return problems.sort((a, b) => a.rank - b.rank);
}
