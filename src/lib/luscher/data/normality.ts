/**
 * Appendix A: Distribution of exclamation marks (!) among 1,000 normal adults.
 * Source: The Luscher Color Test, p.172
 *
 * Key = total ! count, value = percentage of normal adults with that count.
 */
export const NORMALITY_DISTRIBUTION: Record<number, number> = {
  0: 28.3,
  1: 20.6,
  2: 17.3,
  3: 13.2,
  4: 9.1,
  5: 5.6,
  6: 3.1,
  7: 1.7,
  8: 0.8,
  9: 0.2,
  10: 0.1,
  11: 0,
  12: 0,
};

/**
 * Returns the percentage of normal adults who have this many
 * or MORE exclamation marks. Lower percentage = more unusual.
 *
 * Example: normalityPercentile(5) → 11.5 (only 11.5% of normals have 5+ !s)
 */
export function normalityPercentile(totalExclamations: number): number {
  if (totalExclamations <= 0) return 100;
  let cumBelow = 0;
  for (let i = 0; i < Math.min(totalExclamations, 13); i++) {
    cumBelow += NORMALITY_DISTRIBUTION[i] ?? 0;
  }
  return Math.round((100 - cumBelow) * 10) / 10;
}

export type NormalitySeverity = 'normal' | 'elevated' | 'high' | 'very_high';

/**
 * Returns a severity label based on where the ! count falls
 * in the normal distribution.
 */
export function normalitySeverity(totalExclamations: number): NormalitySeverity {
  if (totalExclamations <= 2) return 'normal';
  if (totalExclamations <= 4) return 'elevated';
  if (totalExclamations <= 7) return 'high';
  return 'very_high';
}
