import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n/config';
import { locales } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { PageHero } from '@/components/sections/PageHero';
import { InstructorPlatform } from '@/components/sections/InstructorPlatform';
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
  const title = `${dict.nav.instructors} | ${dict.meta.siteTitle}`;
  return {
    title,
    description: dict.meta.instructorsDescription,
    alternates: {
      canonical: `https://asmaasalem.com/${locale}/instructors`,
      languages: {
        ar: 'https://asmaasalem.com/ar/instructors',
        en: 'https://asmaasalem.com/en/instructors',
      },
    },
    openGraph: {
      title,
      description: dict.meta.instructorsDescription,
      url: `https://asmaasalem.com/${locale}/instructors`,
      locale: locale === 'ar' ? 'ar_SA' : 'en_US',
      type: 'website',
    },
    twitter: {
      title,
      description: dict.meta.instructorsDescription,
    },
  };
}

export default async function InstructorsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <>
      <PageHero title={dict.instructors.hero.title} subtitle={dict.instructors.hero.description} />

      <InstructorPlatform intro={dict.instructors.intro} phases={dict.instructors.phases} />

      <CTASection
        title={dict.instructors.cta.title}
        buttonText={dict.instructors.cta.buttonText}
        locale={locale as Locale}
      />
    </>
  );
}
