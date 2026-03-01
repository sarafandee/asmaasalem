import type { Locale } from '@/lib/i18n/config';

/** The 8 Luscher color indices */
export type ColorId = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

/** Basic colors: have special significance for anxiety markers */
export type BasicColorId = 1 | 2 | 3 | 4;

/** Auxiliary colors: have special significance for compensation markers */
export type AuxiliaryColorId = 0 | 6 | 7;

export interface LuscherColor {
  id: ColorId;
  name: Record<Locale, string>;
  hex: string;
  category: 'basic' | 'auxiliary' | 'achromatic';
}

/** An ordered 8-color selection (each color appears exactly once) */
export type ColorSequence = readonly [
  ColorId, ColorId, ColorId, ColorId,
  ColorId, ColorId, ColorId, ColorId,
];

/** Functional group type */
export type FunctionType = '+' | 'x' | '=' | '-' | '+-';

/** A pair of colors in a functional group */
export interface ColorPair {
  primary: ColorId;
  secondary: ColorId;
}

/** Bilingual text */
export type BilingualText = Record<Locale, string>;

/** Asterisk severity: 0 = none, 1-3 = escalating conflict */
export type AsteriskCount = 0 | 1 | 2 | 3;

/** Composite key for Map lookup: "primary_secondary" */
export type InterpretationKey = `${ColorId}_${ColorId}`;

/** Tables I, II, III, V entries */
export interface StandardInterpretation {
  primary: ColorId;
  secondary: ColorId;
  colorPairName: BilingualText;
  frequency: string;
  asterisks: AsteriskCount;
  text: BilingualText;
}

/** Table IV entries (- functions) with extended fields */
export interface MinusInterpretation {
  primary: ColorId;
  secondary: ColorId;
  colorPairName: BilingualText;
  frequency: string;
  asterisks: AsteriskCount;
  physiological: BilingualText;
  psychological: BilingualText;
  inBrief: BilingualText;
}

export type ExclamationCount = 1 | 2 | 3;

export interface AnxietyMarker {
  colorId: BasicColorId;
  position: number; // 0-indexed: 5, 6, or 7
  exclamations: ExclamationCount;
}

export interface CompensationMarker {
  colorId: AuxiliaryColorId;
  position: number; // 0-indexed: 0, 1, or 2
  exclamations: ExclamationCount;
}

export interface SelectionAnalysis {
  sequence: ColorSequence;
  plus: { pair: ColorPair; interpretation: StandardInterpretation };
  multiply: { pair: ColorPair; interpretation: StandardInterpretation };
  equal: { pair: ColorPair; interpretation: StandardInterpretation };
  minus: { pair: ColorPair; interpretation: MinusInterpretation };
  plusMinus: { pair: ColorPair; interpretation: StandardInterpretation };
  anxietyMarkers: AnxietyMarker[];
  compensationMarkers: CompensationMarker[];
  totalExclamations: number;
}

export type PrognosisResult = 'favorable' | 'unfavorable' | 'stable';

export interface LuscherTestReport {
  id: string;
  timestamp: string;
  clientName?: string;
  clientAge?: number;
  clientGender?: string;
  firstSelection: SelectionAnalysis;
  secondSelection: SelectionAnalysis;
  prognosis: PrognosisResult;
  prognosisDetail: {
    firstTotal: number;
    secondTotal: number;
  };
  deepAnalysis?: DeepAnalysis;
}

// ──────────── Deep Analysis Types (Ch 4-8, Appendix A) ────────────

/** A single "actual problem" from Compensation + Anxiety pairing (p.40-42) */
export interface ActualProblem {
  compensationColor: ColorId;
  compensationPosition: number;
  anxietyColor: ColorId;
  anxietyPosition: number;
  /** Priority rank (1 = most significant, per p.42 table) */
  rank: number;
  /** Table V interpretation for this C+A pair */
  interpretation: StandardInterpretation;
}

/** Work-group assessment: colors 2, 3, 4 together (p.48-50) */
export interface WorkGroupAssessment {
  /** Whether all three work-group colors are within the same functional pair */
  intact: boolean;
  /** Which functional group the work-group falls in (if intact) */
  functionalGroup?: FunctionType;
  /** Positions of colors 2, 3, 4 in the sequence (0-indexed) */
  positions: { color2: number; color3: number; color4: number };
  /** Work-group broke apart between first and second selection */
  exhaustibility: boolean;
  /** Leading color determines approach: 2=prestige, 3=achievement, 4=interest */
  leadingColor?: ColorId;
  assessment: BilingualText;
}

/** Autonomic nervous system stability (p.46-47) */
export interface AutonomicStability {
  unstable: boolean;
  pattern?: 'bright_start_dark_end' | 'dark_start_bright_end';
  assessment: BilingualText;
}

/** Conflict between + and × functional groups (p.45) */
export interface ConflictAnalysis {
  conflictPresent: boolean;
  assessment: BilingualText;
}

/** Color jumping between extremes across two selections (p.42-43) */
export interface AmbivalentColor {
  colorId: ColorId;
  firstPosition: number;
  secondPosition: number;
  direction: 'preferred_to_rejected' | 'rejected_to_preferred';
  interpretation?: StandardInterpretation;
}

/** How the two selections compare (p.31, 43) */
export interface SelectionComparison {
  /** 0-1 similarity score (1 = identical) */
  similarityScore: number;
  rigidity: 'rigid' | 'normal' | 'volatile';
  movedForward: Array<{ colorId: ColorId; from: number; to: number }>;
  movedBackward: Array<{ colorId: ColorId; from: number; to: number }>;
  assessment: BilingualText;
}

/** Normality context from Appendix A (p.172) */
export interface NormalityContext {
  totalExclamations: number;
  /** Percentage of normal adults with this many or more !s */
  percentileAbove: number;
  severity: 'normal' | 'elevated' | 'high' | 'very_high';
  assessment: BilingualText;
}

/** Individual color in a notable position (Ch 6 profiles) */
export interface ColorNote {
  colorId: ColorId;
  position: number;
  note: BilingualText;
  notable: boolean;
}

/** Complete deep analysis container */
export interface DeepAnalysis {
  actualProblems: ActualProblem[];
  workGroup: WorkGroupAssessment;
  autonomicStability: AutonomicStability;
  conflict: ConflictAnalysis;
  ambivalentColors: AmbivalentColor[];
  selectionComparison: SelectionComparison;
  normalityContext: NormalityContext;
  colorNotes: ColorNote[];
}
