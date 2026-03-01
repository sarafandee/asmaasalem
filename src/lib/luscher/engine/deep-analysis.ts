/**
 * Deep Analysis: work-group, autonomic stability, conflict, ambivalence,
 * selection comparison, normality context, and color notes.
 *
 * References: Ch 4-8 of The Luscher Color Test, Appendix A.
 */

import type {
  ColorSequence,
  ColorId,
  SelectionAnalysis,
  WorkGroupAssessment,
  AutonomicStability,
  ConflictAnalysis,
  AmbivalentColor,
  SelectionComparison,
  NormalityContext,
  ColorNote,
  DeepAnalysis,
  FunctionType,
} from '../types';
import { tableV, makeKey } from '../tables';
import { computeActualProblems } from './actual-problems';
import { normalityPercentile, normalitySeverity } from '../data/normality';
import { COLOR_PROFILES } from '../data/color-profiles';

// ──────────── Work-Group (p.48-50) ────────────

/** Check if colors 2, 3, 4 are together and in which group */
function findFunctionalGroupForPosition(pos: number): FunctionType | null {
  if (pos <= 1) return '+';
  if (pos <= 3) return 'x';
  if (pos <= 5) return '=';
  if (pos <= 7) return '-';
  return null;
}

function areInSameGroup(positions: number[]): FunctionType | null {
  const groups = positions.map(findFunctionalGroupForPosition);
  if (groups[0] && groups.every(g => g === groups[0])) {
    return groups[0];
  }
  // Also check if they span exactly two adjacent positions within + or ×
  // (e.g., all three in positions 0-3 which covers + and ×)
  const min = Math.min(...positions);
  const max = Math.max(...positions);
  if (max - min <= 3 && min <= 1) return '+'; // within the active area
  return null;
}

export function computeWorkGroup(
  secondSelection: SelectionAnalysis,
  firstSelection: SelectionAnalysis,
): WorkGroupAssessment {
  const seq2 = secondSelection.sequence;
  const seq1 = firstSelection.sequence;

  const pos2 = {
    color2: seq2.indexOf(2 as ColorId),
    color3: seq2.indexOf(3 as ColorId),
    color4: seq2.indexOf(4 as ColorId),
  };

  const positions = [pos2.color2, pos2.color3, pos2.color4];
  const min = Math.min(...positions);
  const max = Math.max(...positions);

  // Check if all three are within a 2-position span (same functional pair)
  const samePair = max - min <= 1;
  // Check if all three are within 3 positions (same area like + and × combined)
  const sameArea = max - min <= 3 && min <= 3;

  let intact = samePair;
  let functionalGroup: FunctionType | undefined;

  if (samePair) {
    functionalGroup = findFunctionalGroupForPosition(min) ?? undefined;
  } else if (sameArea && min <= 1) {
    // Colors span + and × area — work-group is in active territory
    intact = true;
    functionalGroup = '+';
  }

  // Leading color: whichever of 2,3,4 has the earliest position
  const leadingColor = positions.indexOf(min) === 0 ? 2
    : positions.indexOf(min) === 1 ? 3 : 4;

  // Exhaustibility: check if work-group was intact in 1st selection but broke in 2nd
  const pos1 = {
    color2: seq1.indexOf(2 as ColorId),
    color3: seq1.indexOf(3 as ColorId),
    color4: seq1.indexOf(4 as ColorId),
  };
  const pos1arr = [pos1.color2, pos1.color3, pos1.color4];
  const min1 = Math.min(...pos1arr);
  const max1 = Math.max(...pos1arr);
  const intactInFirst = (max1 - min1 <= 1) || (max1 - min1 <= 3 && min1 <= 1);
  const exhaustibility = intactInFirst && !intact;

  // Assessment text
  let assessmentEn: string;
  let assessmentAr: string;

  if (intact) {
    const approachMap: Record<number, { en: string; ar: string }> = {
      2: { en: 'self-assertion and prestige', ar: 'تأكيد الذات والهيبة' },
      3: { en: 'achievement and activity', ar: 'الإنجاز والنشاط' },
      4: { en: 'interest and exploration', ar: 'الاهتمام والاستكشاف' },
    };
    const approach = approachMap[leadingColor] ?? { en: '', ar: '' };
    const groupLabel = functionalGroup === '+' ? { en: 'desired objectives', ar: 'الأهداف المرغوبة' }
      : functionalGroup === 'x' ? { en: 'existing situation', ar: 'الوضع القائم' }
      : functionalGroup === '=' ? { en: 'restrained characteristics (in abeyance)', ar: 'الخصائص المكبوتة (معلقة)' }
      : { en: 'stress sources', ar: 'مصادر التوتر' };

    assessmentEn = `Work-group is intact in the ${groupLabel.en} area. Approach to tasks is driven by ${approach.en}.`;
    assessmentAr = `مجموعة العمل متماسكة في منطقة ${groupLabel.ar}. نهج المهام مدفوع بـ${approach.ar}.`;
  } else {
    assessmentEn = 'Work-group is fragmented — the three work colors (green, red, yellow) are separated across different functional groups, suggesting reduced work capacity or disengagement from work.';
    assessmentAr = 'مجموعة العمل مفككة — ألوان العمل الثلاثة (الأخضر، الأحمر، الأصفر) مفصولة عبر مجموعات وظيفية مختلفة، مما يشير إلى انخفاض القدرة على العمل أو الانفصال عن العمل.';
  }

  if (exhaustibility) {
    assessmentEn += ' Exhaustibility detected: the work-group was intact in the first selection but has broken apart in the second, indicating that even minor stress or concentration depletes resilience.';
    assessmentAr += ' تم اكتشاف الإرهاق: كانت مجموعة العمل متماسكة في الاختيار الأول لكنها تفككت في الثاني، مما يشير إلى أن حتى الضغط البسيط أو التركيز يستنزف المرونة.';
  }

  return {
    intact,
    functionalGroup,
    positions: pos2,
    exhaustibility,
    leadingColor: intact ? (leadingColor as ColorId) : undefined,
    assessment: { en: assessmentEn, ar: assessmentAr },
  };
}

// ──────────── Autonomic Stability (p.46-47) ────────────

export function computeAutonomicStability(sequence: ColorSequence): AutonomicStability {
  const pos3 = sequence.indexOf(3 as ColorId);
  const pos4 = sequence.indexOf(4 as ColorId);
  const pos1 = sequence.indexOf(1 as ColorId);
  const pos7 = sequence.indexOf(7 as ColorId);

  // "Bright" pair: 3 and 4 (red and yellow)
  const brightTogether = Math.abs(pos3 - pos4) <= 1;
  // "Dark" pair: 1 and 7 (blue and black)
  const darkTogether = Math.abs(pos1 - pos7) <= 1;

  if (!brightTogether || !darkTogether) {
    return {
      unstable: false,
      assessment: {
        en: 'Autonomic nervous system appears stable — the bright and dark color groups are not in opposing extreme positions.',
        ar: 'يبدو الجهاز العصبي اللاإرادي مستقرًا — مجموعات الألوان الفاتحة والداكنة ليست في مواضع متطرفة متعاكسة.',
      },
    };
  }

  const brightMin = Math.min(pos3, pos4);
  const darkMin = Math.min(pos1, pos7);

  const brightAtStart = brightMin <= 1;
  const brightAtEnd = brightMin >= 5;
  const darkAtStart = darkMin <= 1;
  const darkAtEnd = darkMin >= 5;

  if (brightAtStart && darkAtEnd) {
    return {
      unstable: true,
      pattern: 'bright_start_dark_end',
      assessment: {
        en: 'Self-regulating instability detected. The bright colors (red, yellow) at the beginning and dark colors (blue, black) at the end suggest autonomic instability that is present but has not necessarily reached a serious stage.',
        ar: 'تم اكتشاف عدم استقرار التنظيم الذاتي. الألوان الفاتحة (الأحمر، الأصفر) في البداية والألوان الداكنة (الأزرق، الأسود) في النهاية تشير إلى عدم استقرار لاإرادي موجود لكنه لم يصل بالضرورة إلى مرحلة خطيرة.',
      },
    };
  }

  if (darkAtStart && brightAtEnd) {
    return {
      unstable: true,
      pattern: 'dark_start_bright_end',
      assessment: {
        en: 'Self-regulating instability detected. The dark colors (blue, black) at the beginning and bright colors (red, yellow) at the end suggest autonomic instability that has been present for a considerable time and may have led to pathological deterioration.',
        ar: 'تم اكتشاف عدم استقرار التنظيم الذاتي. الألوان الداكنة (الأزرق، الأسود) في البداية والألوان الفاتحة (الأحمر، الأصفر) في النهاية تشير إلى عدم استقرار لاإرادي كان موجودًا لفترة طويلة وقد يكون أدى إلى تدهور مرضي.',
      },
    };
  }

  return {
    unstable: false,
    assessment: {
      en: 'Autonomic nervous system appears stable.',
      ar: 'يبدو الجهاز العصبي اللاإرادي مستقرًا.',
    },
  };
}

// ──────────── Conflict Detection (p.45) ────────────

/** Classify colors into energy types for conflict detection */
function colorEnergy(id: ColorId): 'passive' | 'active' | 'assertive' | 'neutral' | 'protest' {
  if (id === 1 || id === 0 || id === 6) return 'passive';
  if (id === 3 || id === 4) return 'active';
  if (id === 2) return 'assertive';
  if (id === 7) return 'protest';
  return 'neutral'; // 5 (violet)
}

export function computeConflict(analysis: SelectionAnalysis): ConflictAnalysis {
  const plusPair = analysis.plus.pair;
  const multiplyPair = analysis.multiply.pair;

  const plusEnergies = [colorEnergy(plusPair.primary), colorEnergy(plusPair.secondary)];
  const multiplyEnergies = [colorEnergy(multiplyPair.primary), colorEnergy(multiplyPair.secondary)];

  // Conflict: desired is passive but existing is active, or vice versa
  const plusPassive = plusEnergies.includes('passive') && !plusEnergies.includes('active');
  const plusActive = plusEnergies.includes('active') && !plusEnergies.includes('passive');
  const multPassive = multiplyEnergies.includes('passive') && !multiplyEnergies.includes('active');
  const multActive = multiplyEnergies.includes('active') && !multiplyEnergies.includes('passive');

  const conflictPresent = (plusPassive && multActive) || (plusActive && multPassive);

  if (conflictPresent) {
    const desiredType = plusPassive ? { en: 'peace and tranquility', ar: 'السلام والهدوء' }
      : { en: 'activity and achievement', ar: 'النشاط والإنجاز' };
    const existingType = multActive ? { en: 'active demands and pressures', ar: 'المطالب والضغوط النشطة' }
      : { en: 'passive and restrictive conditions', ar: 'الظروف السلبية والمقيدة' };

    return {
      conflictPresent: true,
      assessment: {
        en: `Conflict between desired objective and existing situation: the desire for ${desiredType.en} conflicts with the reality of ${existingType.en}. This tension may manifest as frustration, inappropriate behavior, or forced adaptation.`,
        ar: `صراع بين الهدف المرغوب والوضع القائم: الرغبة في ${desiredType.ar} تتعارض مع واقع ${existingType.ar}. قد يتجلى هذا التوتر كإحباط أو سلوك غير مناسب أو تكيف قسري.`,
      },
    };
  }

  return {
    conflictPresent: false,
    assessment: {
      en: 'No significant conflict between desired objectives and existing situation.',
      ar: 'لا يوجد صراع كبير بين الأهداف المرغوبة والوضع القائم.',
    },
  };
}

// ──────────── Ambivalence Detection (p.42-43) ────────────

export function computeAmbivalence(
  firstSelection: SelectionAnalysis,
  secondSelection: SelectionAnalysis,
): AmbivalentColor[] {
  const seq1 = firstSelection.sequence;
  const seq2 = secondSelection.sequence;
  const results: AmbivalentColor[] = [];

  for (let colorId = 0; colorId <= 7; colorId++) {
    const pos1 = seq1.indexOf(colorId as ColorId);
    const pos2 = seq2.indexOf(colorId as ColorId);

    // Ambivalent: in positions 0-1 in one selection AND 6-7 in the other
    const preferredIn1 = pos1 <= 1;
    const rejectedIn1 = pos1 >= 6;
    const preferredIn2 = pos2 <= 1;
    const rejectedIn2 = pos2 >= 6;

    if (preferredIn1 && rejectedIn2) {
      // Look up Table V same-color pair
      const key = makeKey(colorId as ColorId, colorId as ColorId);
      const interp = tableV.get(key);

      results.push({
        colorId: colorId as ColorId,
        firstPosition: pos1,
        secondPosition: pos2,
        direction: 'preferred_to_rejected',
        interpretation: interp,
      });
    } else if (rejectedIn1 && preferredIn2) {
      const key = makeKey(colorId as ColorId, colorId as ColorId);
      const interp = tableV.get(key);

      results.push({
        colorId: colorId as ColorId,
        firstPosition: pos1,
        secondPosition: pos2,
        direction: 'rejected_to_preferred',
        interpretation: interp,
      });
    }
  }

  return results;
}

// ──────────── Selection Comparison (p.31, 43) ────────────

export function computeSelectionComparison(
  firstSequence: ColorSequence,
  secondSequence: ColorSequence,
): SelectionComparison {
  // Count positions where the same color appears
  let sameCount = 0;
  for (let i = 0; i < 8; i++) {
    if (firstSequence[i] === secondSequence[i]) sameCount++;
  }
  const similarityScore = sameCount / 8;

  const rigidity = similarityScore >= 0.875 ? 'rigid' as const
    : similarityScore <= 0.375 ? 'volatile' as const
    : 'normal' as const;

  const movedForward: SelectionComparison['movedForward'] = [];
  const movedBackward: SelectionComparison['movedBackward'] = [];

  for (let colorId = 0; colorId <= 7; colorId++) {
    const pos1 = firstSequence.indexOf(colorId as ColorId);
    const pos2 = secondSequence.indexOf(colorId as ColorId);
    const diff = pos1 - pos2; // positive = moved forward (lower index = more preferred)

    if (diff >= 3) {
      movedForward.push({ colorId: colorId as ColorId, from: pos1, to: pos2 });
    } else if (diff <= -3) {
      movedBackward.push({ colorId: colorId as ColorId, from: pos1, to: pos2 });
    }
  }

  let assessmentEn: string;
  let assessmentAr: string;

  if (rigidity === 'rigid') {
    assessmentEn = 'The first and second selections are virtually identical, suggesting a certain rigidity of outlook and a degree of emotional inflexibility.';
    assessmentAr = 'الاختياران الأول والثاني متطابقان تقريبًا، مما يشير إلى جمود معين في الرؤية ودرجة من عدم المرونة العاطفية.';
  } else if (rigidity === 'volatile') {
    assessmentEn = 'Significant differences between the first and second selections indicate emotional volatility and unstable attitudes. The person\'s feelings and responses may change rapidly under even mild pressure.';
    assessmentAr = 'الاختلافات الكبيرة بين الاختيارين الأول والثاني تشير إلى تقلب عاطفي ومواقف غير مستقرة. قد تتغير مشاعر الشخص واستجاباته بسرعة حتى تحت ضغط خفيف.';
  } else {
    assessmentEn = 'Normal variation between the first and second selections, indicating a healthy degree of emotional flexibility.';
    assessmentAr = 'تباين طبيعي بين الاختيارين الأول والثاني، مما يشير إلى درجة صحية من المرونة العاطفية.';
  }

  return {
    similarityScore,
    rigidity,
    movedForward,
    movedBackward,
    assessment: { en: assessmentEn, ar: assessmentAr },
  };
}

// ──────────── Normality Context (Appendix A, p.172) ────────────

export function computeNormalityContext(totalExclamations: number): NormalityContext {
  const percentileAbove = normalityPercentile(totalExclamations);
  const severity = normalitySeverity(totalExclamations);

  let assessmentEn: string;
  let assessmentAr: string;

  if (severity === 'normal') {
    assessmentEn = `A score of ${totalExclamations} exclamation mark${totalExclamations !== 1 ? 's' : ''} falls within the normal range. ${percentileAbove}% of the normal adult population have this many or more indicators.`;
    assessmentAr = `درجة ${totalExclamations} علامة${totalExclamations !== 1 ? ' تعجب' : ' تعجب'} تقع ضمن النطاق الطبيعي. ${percentileAbove}% من السكان البالغين الطبيعيين لديهم هذا العدد أو أكثر من المؤشرات.`;
  } else if (severity === 'elevated') {
    assessmentEn = `A score of ${totalExclamations} exclamation marks is slightly elevated. Only ${percentileAbove}% of normal adults have this many or more indicators, suggesting some degree of emotional tension.`;
    assessmentAr = `درجة ${totalExclamations} علامات تعجب مرتفعة قليلاً. فقط ${percentileAbove}% من البالغين الطبيعيين لديهم هذا العدد أو أكثر من المؤشرات، مما يشير إلى بعض التوتر العاطفي.`;
  } else if (severity === 'high') {
    assessmentEn = `A score of ${totalExclamations} exclamation marks is high. Only ${percentileAbove}% of normal adults have this many or more indicators, indicating significant emotional tension and stress.`;
    assessmentAr = `درجة ${totalExclamations} علامات تعجب عالية. فقط ${percentileAbove}% من البالغين الطبيعيين لديهم هذا العدد أو أكثر من المؤشرات، مما يشير إلى توتر عاطفي وضغط كبيرين.`;
  } else {
    assessmentEn = `A score of ${totalExclamations} exclamation marks is very high. Only ${percentileAbove}% of normal adults have this many or more indicators. This suggests intense anxieties and strongly compensatory behavior.`;
    assessmentAr = `درجة ${totalExclamations} علامات تعجب عالية جدًا. فقط ${percentileAbove}% من البالغين الطبيعيين لديهم هذا العدد أو أكثر من المؤشرات. هذا يشير إلى قلق شديد وسلوك تعويضي قوي.`;
  }

  return {
    totalExclamations,
    percentileAbove,
    severity,
    assessment: { en: assessmentEn, ar: assessmentAr },
  };
}

// ──────────── Color Notes (Ch 6) ────────────

export function computeColorNotes(sequence: ColorSequence): ColorNote[] {
  const notes: ColorNote[] = [];

  for (let i = 0; i < 8; i++) {
    const colorId = sequence[i] as ColorId;
    const profile = COLOR_PROFILES[colorId];
    if (!profile) continue;

    const position1Indexed = i + 1;
    const deviation = Math.abs(position1Indexed - profile.averagePosition);

    // Notable if deviation >= 3, or if basic color in last 3, or auxiliary in first 3
    const isPreferred = i <= 1;
    const isRejected = i >= 6;
    const isBasicColor = [1, 2, 3, 4].includes(colorId);
    const isAuxiliaryColor = [0, 6, 7].includes(colorId);

    let notable = false;
    let note = profile.essence;

    if (isPreferred && deviation >= 3) {
      notable = true;
      note = profile.preferred;
    } else if (isRejected && deviation >= 3) {
      notable = true;
      note = profile.rejected;
    } else if (isRejected && isBasicColor) {
      // Basic color rejected — always notable (anxiety-related)
      notable = true;
      note = profile.rejected;
    } else if (isPreferred && isAuxiliaryColor) {
      // Auxiliary color preferred — always notable (compensation-related)
      notable = true;
      note = profile.preferred;
    }

    if (notable) {
      notes.push({ colorId, position: i, note, notable });
    }
  }

  return notes;
}

// ──────────── Main Orchestrator ────────────

export function computeDeepAnalysis(
  firstSelection: SelectionAnalysis,
  secondSelection: SelectionAnalysis,
): DeepAnalysis {
  return {
    actualProblems: computeActualProblems(secondSelection),
    workGroup: computeWorkGroup(secondSelection, firstSelection),
    autonomicStability: computeAutonomicStability(secondSelection.sequence),
    conflict: computeConflict(secondSelection),
    ambivalentColors: computeAmbivalence(firstSelection, secondSelection),
    selectionComparison: computeSelectionComparison(
      firstSelection.sequence,
      secondSelection.sequence,
    ),
    normalityContext: computeNormalityContext(secondSelection.totalExclamations),
    colorNotes: computeColorNotes(secondSelection.sequence),
  };
}
