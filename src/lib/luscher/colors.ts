import type { LuscherColor, ColorId, BasicColorId, AuxiliaryColorId } from './types';

export const LUSCHER_COLORS: Record<ColorId, LuscherColor> = {
  0: { id: 0, name: { en: 'Grey', ar: 'الرمادي' }, hex: '#98938E', category: 'auxiliary' },
  1: { id: 1, name: { en: 'Dark Blue', ar: 'الأزرق الداكن' }, hex: '#004983', category: 'basic' },
  2: { id: 2, name: { en: 'Blue-Green', ar: 'الأزرق المخضر' }, hex: '#009E7A', category: 'basic' },
  3: { id: 3, name: { en: 'Orange-Red', ar: 'البرتقالي الأحمر' }, hex: '#E94A33', category: 'basic' },
  4: { id: 4, name: { en: 'Bright Yellow', ar: 'الأصفر الفاقع' }, hex: '#F7D616', category: 'basic' },
  5: { id: 5, name: { en: 'Violet', ar: 'البنفسجي' }, hex: '#7C3E8C', category: 'achromatic' },
  6: { id: 6, name: { en: 'Brown', ar: 'البني' }, hex: '#A0522D', category: 'auxiliary' },
  7: { id: 7, name: { en: 'Black', ar: 'الأسود' }, hex: '#1A1A1A', category: 'auxiliary' },
} as const;

export const BASIC_COLOR_IDS: readonly BasicColorId[] = [1, 2, 3, 4];
export const AUXILIARY_COLOR_IDS: readonly AuxiliaryColorId[] = [0, 6, 7];
