export const locales = ['ar', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'ar';

export const localeConfig: Record<
  Locale,
  { dir: 'rtl' | 'ltr'; lang: string; name: string; toggleName: string; toggleLocale: Locale }
> = {
  ar: { dir: 'rtl', lang: 'ar', name: 'العربية', toggleName: 'English', toggleLocale: 'en' },
  en: { dir: 'ltr', lang: 'en', name: 'English', toggleName: 'العربية', toggleLocale: 'ar' },
};
