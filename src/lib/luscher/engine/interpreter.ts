import type {
  ColorSequence,
  SelectionAnalysis,
  LuscherTestReport,
} from '../types';
import { lookupAllInterpretations } from './scoring';
import { calculateAnxietyMarkers, calculateCompensationMarkers, totalExclamations } from './markers';
import { calculatePrognosis } from './prognosis';
import { computeDeepAnalysis } from './deep-analysis';

/**
 * Analyze a single color selection (one of two rounds).
 * Extracts functional groups, looks up interpretations,
 * and calculates anxiety/compensation markers.
 */
export function analyzeSelection(sequence: ColorSequence): SelectionAnalysis {
  const interpretations = lookupAllInterpretations(sequence);
  const anxietyMarkers = calculateAnxietyMarkers(sequence);
  const compensationMarkers = calculateCompensationMarkers(sequence);

  return {
    sequence,
    ...interpretations,
    anxietyMarkers,
    compensationMarkers,
    totalExclamations: totalExclamations(anxietyMarkers, compensationMarkers),
  };
}

/**
 * Generate a complete Luscher Test Report from two color selections.
 *
 * The report is based on the SECOND selection (which is considered
 * more reliable), but the first selection is used for prognosis
 * comparison.
 */
export function generateReport(params: {
  id: string;
  firstSelection: ColorSequence;
  secondSelection: ColorSequence;
  clientName?: string;
  clientAge?: number;
  clientGender?: string;
}): LuscherTestReport {
  const first = analyzeSelection(params.firstSelection);
  const second = analyzeSelection(params.secondSelection);

  const prognosis = calculatePrognosis(
    first.totalExclamations,
    second.totalExclamations,
  );

  const deepAnalysis = computeDeepAnalysis(first, second);

  return {
    id: params.id,
    timestamp: new Date().toISOString(),
    clientName: params.clientName,
    clientAge: params.clientAge,
    clientGender: params.clientGender,
    firstSelection: first,
    secondSelection: second,
    prognosis,
    prognosisDetail: {
      firstTotal: first.totalExclamations,
      secondTotal: second.totalExclamations,
    },
    deepAnalysis,
  };
}
