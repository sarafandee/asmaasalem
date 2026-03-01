export type {
  ColorId,
  BasicColorId,
  AuxiliaryColorId,
  LuscherColor,
  ColorSequence,
  FunctionType,
  ColorPair,
  BilingualText,
  AsteriskCount,
  InterpretationKey,
  StandardInterpretation,
  MinusInterpretation,
  ExclamationCount,
  AnxietyMarker,
  CompensationMarker,
  SelectionAnalysis,
  PrognosisResult,
  LuscherTestReport,
  ActualProblem,
  WorkGroupAssessment,
  AutonomicStability,
  ConflictAnalysis,
  AmbivalentColor,
  SelectionComparison,
  NormalityContext,
  ColorNote,
  DeepAnalysis,
} from './types';

export { LUSCHER_COLORS, BASIC_COLOR_IDS, AUXILIARY_COLOR_IDS } from './colors';
export { tableI, tableII, tableIII, tableIV, tableV, makeKey } from './tables';
export { ASTERISK_MATRIX, asteriskMap } from './tables/asterisks';
export { COLOR_PROFILES } from './data/color-profiles';
export { NORMALITY_DISTRIBUTION, normalityPercentile, normalitySeverity } from './data/normality';

export {
  validateColorSequence,
  analyzeSelection,
  generateReport,
  extractFunctionalGroups,
  lookupAllInterpretations,
  calculateAnxietyMarkers,
  calculateCompensationMarkers,
  totalExclamations,
  calculatePrognosis,
  computeActualProblems,
  computeDeepAnalysis,
} from './engine';
