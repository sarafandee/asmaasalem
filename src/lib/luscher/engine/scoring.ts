import type {
  ColorSequence,
  ColorId,
  ColorPair,
  FunctionType,
  StandardInterpretation,
  MinusInterpretation,
} from '../types';
import { makeKey, tableI, tableII, tableIII, tableIV, tableV } from '../tables';

/** Extract a functional color pair from a sequence at given positions */
function extractPair(sequence: ColorSequence, pos1: number, pos2: number): ColorPair {
  return {
    primary: sequence[pos1],
    secondary: sequence[pos2],
  };
}

/** Functional group positions (0-indexed):
 *  + = positions 0,1
 *  × = positions 2,3
 *  = = positions 4,5
 *  - = positions 6,7
 *  +- = positions 0,7 (first + last)
 */
export function extractFunctionalGroups(sequence: ColorSequence): Record<FunctionType, ColorPair> {
  return {
    '+': extractPair(sequence, 0, 1),
    'x': extractPair(sequence, 2, 3),
    '=': extractPair(sequence, 4, 5),
    '-': extractPair(sequence, 6, 7),
    '+-': { primary: sequence[0], secondary: sequence[7] },
  };
}

/** Look up interpretation for + function (Table I: Desired Objectives) */
export function lookupPlus(pair: ColorPair): StandardInterpretation | undefined {
  return tableI.get(makeKey(pair.primary, pair.secondary));
}

/** Look up interpretation for × function (Table II: Existing Situation) */
export function lookupMultiply(pair: ColorPair): StandardInterpretation | undefined {
  return tableII.get(makeKey(pair.primary, pair.secondary));
}

/** Look up interpretation for = function (Table III: Restrained Characteristics) */
export function lookupEqual(pair: ColorPair): StandardInterpretation | undefined {
  return tableIII.get(makeKey(pair.primary, pair.secondary));
}

/** Look up interpretation for - function (Table IV: Stress Sources) */
export function lookupMinus(pair: ColorPair): MinusInterpretation | undefined {
  return tableIV.get(makeKey(pair.primary, pair.secondary));
}

/** Look up interpretation for +- function (Table V: Actual Problem) */
export function lookupPlusMinus(pair: ColorPair): StandardInterpretation | undefined {
  return tableV.get(makeKey(pair.primary, pair.secondary));
}

/** Create a fallback interpretation when lookup fails */
function fallbackStandard(pair: ColorPair): StandardInterpretation {
  return {
    primary: pair.primary,
    secondary: pair.secondary,
    colorPairName: { en: `${pair.primary} / ${pair.secondary}`, ar: `${pair.primary} / ${pair.secondary}` },
    frequency: '',
    asterisks: 0,
    text: { en: 'Interpretation not available.', ar: 'التفسير غير متوفر.' },
  };
}

function fallbackMinus(pair: ColorPair): MinusInterpretation {
  return {
    primary: pair.primary,
    secondary: pair.secondary,
    colorPairName: { en: `${pair.primary} / ${pair.secondary}`, ar: `${pair.primary} / ${pair.secondary}` },
    frequency: '',
    asterisks: 0,
    physiological: { en: 'Interpretation not available.', ar: 'التفسير غير متوفر.' },
    psychological: { en: 'Interpretation not available.', ar: 'التفسير غير متوفر.' },
    inBrief: { en: 'Interpretation not available.', ar: 'التفسير غير متوفر.' },
  };
}

/** Look up all interpretations for a given sequence, with fallbacks */
export function lookupAllInterpretations(sequence: ColorSequence) {
  const groups = extractFunctionalGroups(sequence);

  return {
    plus: {
      pair: groups['+'],
      interpretation: lookupPlus(groups['+']) ?? fallbackStandard(groups['+']),
    },
    multiply: {
      pair: groups['x'],
      interpretation: lookupMultiply(groups['x']) ?? fallbackStandard(groups['x']),
    },
    equal: {
      pair: groups['='],
      interpretation: lookupEqual(groups['=']) ?? fallbackStandard(groups['=']),
    },
    minus: {
      pair: groups['-'],
      interpretation: lookupMinus(groups['-']) ?? fallbackMinus(groups['-']),
    },
    plusMinus: {
      pair: groups['+-'],
      interpretation: lookupPlusMinus(groups['+-']) ?? fallbackStandard(groups['+-']),
    },
  };
}
