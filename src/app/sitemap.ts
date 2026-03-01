import type { MetadataRoute } from 'next';

const BASE_URL = 'https://asmaasalem.com';

const pages = ['', '/about', '/instructors', '/testimonials', '/contact'];
const locales = ['ar', 'en'];

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    pages.map((page) => ({
      url: `${BASE_URL}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: page === '' ? 1.0 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${BASE_URL}/${l}${page}`])
        ),
      },
    }))
  );
}
