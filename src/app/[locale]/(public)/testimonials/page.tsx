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
  return {
    title: `${dict.nav.testimonials} | ${dict.meta.siteTitle}`,
    description: dict.meta.testimonialsDescription,
    alternates: {
      canonical: `https://asmaasalem.com/${locale}/testimonials`,
      languages: { ar: '/ar/testimonials', en: '/en/testimonials' },
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
