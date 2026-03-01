import type { ColorSequence } from '../types';

const VALID_COLOR_IDS = new Set([0, 1, 2, 3, 4, 5, 6, 7]);

export function validateColorSequence(input: unknown): {
  valid: boolean;
  errors: string[];
  sequence?: ColorSequence;
} {
  const errors: string[] = [];

  if (!Array.isArray(input)) {
    return { valid: false, errors: ['Input must be an array.'] };
  }

  if (input.length !== 8) {
    errors.push(`Expected 8 colors, received ${input.length}.`);
  }

  const seen = new Set<number>();
  for (let i = 0; i < input.length; i++) {
    const val = input[i];
    if (typeof val !== 'number' || !VALID_COLOR_IDS.has(val)) {
      errors.push(`Position ${i + 1}: invalid color ID "${val}". Must be 0-7.`);
    } else if (seen.has(val)) {
      errors.push(`Position ${i + 1}: duplicate color ID ${val}.`);
    } else {
      seen.add(val);
    }
  }

  if (errors.length === 0) {
    return { valid: true, errors: [], sequence: input as unknown as ColorSequence };
  }

  return { valid: false, errors };
}
