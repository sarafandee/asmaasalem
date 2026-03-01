import type { Locale } from './config';

const dictionaries = {
  ar: () => import('./dictionaries/ar.json').then((m) => m.default),
  en: () => import('./dictionaries/en.json').then((m) => m.default),
};

export type Dictionary = Awaited<ReturnType<(typeof dictionaries)['ar']>>;

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]();
}
