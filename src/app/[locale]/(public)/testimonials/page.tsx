import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n/config';
import { locales } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { PageHero } from '@/components/sections/PageHero';
import { TestimonialGrid } from '@/components/sections/TestimonialGrid';
import { CTASection } from '@/components/sections/CTASection';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const title = `${dict.nav.testimonials} | ${dict.meta.siteTitle}`;
  return {
    title,
    description: dict.meta.testimonialsDescription,
    alternates: {
      canonical: `https://asmaasalem.com/${locale}/testimonials`,
      languages: {
        ar: 'https://asmaasalem.com/ar/testimonials',
        en: 'https://asmaasalem.com/en/testimonials',
      },
    },
    openGraph: {
      title,
      description: dict.meta.testimonialsDescription,
      url: `https://asmaasalem.com/${locale}/testimonials`,
      locale: locale === 'ar' ? 'ar_SA' : 'en_US',
      type: 'website',
    },
    twitter: {
      title,
      description: dict.meta.testimonialsDescription,
    },
  };
}

export default async function TestimonialsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <>
      <PageHero title={dict.testimonials.hero.title} />

      <TestimonialGrid testimonials={dict.testimonials.items} />

      <CTASection
        title={dict.testimonials.cta.title}
        buttonText={dict.testimonials.cta.buttonText}
        locale={locale as Locale}
      />
    </>
  );
}
