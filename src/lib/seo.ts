import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n/config';

export const SITE_URL = 'https://asmaasalem.com';

const SHARE_IMAGE = {
  url: '/images/og-image.png',
  width: 1200,
  height: 630,
};

const SHARE_ALT: Record<Locale, string> = {
  ar: 'أسماء سالم — لايف كوتش متخصصة في اختبار لوشر للألوان والميتاهيلث',
  en: 'Asmaa Salem — Specialised Life Coach, Lüscher Color Test and Meta-Health',
};

/**
 * Metadata shared by every public page: canonical URL, language alternates
 * (with x-default pointing at the language-detecting address), and the share
 * card for social networks and chat apps.
 *
 * `path` is the page path without the locale, e.g. '' for home or '/about'.
 */
export function pageMetadata(locale: Locale, path: string, title: string, description: string): Metadata {
  const url = `${SITE_URL}/${locale}${path}`;
  const image = { ...SHARE_IMAGE, alt: SHARE_ALT[locale] };

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ar: `${SITE_URL}/ar${path}`,
        en: `${SITE_URL}/en${path}`,
        // The bare address redirects each visitor to their language.
        'x-default': `${SITE_URL}${path || '/'}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: locale === 'ar' ? 'أسماء سالم' : 'Asmaa Salem',
      locale: locale === 'ar' ? 'ar_SA' : 'en_US',
      alternateLocale: locale === 'ar' ? ['en_US'] : ['ar_SA'],
      type: 'website',
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}
