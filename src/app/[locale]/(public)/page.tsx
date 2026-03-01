import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n/config';
import { locales } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { HeroBanner } from '@/components/sections/HeroBanner';
import { MetaHealthExplainer } from '@/components/sections/MetaHealthExplainer';
import { LuscherInfo } from '@/components/sections/LuscherInfo';
import { ServiceCards } from '@/components/sections/ServiceCards';
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
    title: dict.meta.siteTitle,
    description: dict.meta.homeDescription,
    alternates: {
      canonical: `https://asmaasalem.com/${locale}`,
      languages: { ar: '/ar', en: '/en' },
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <>
      <HeroBanner
        title={dict.home.hero.title}
        subtitle={dict.home.hero.subtitle}
        ctaText={dict.home.hero.ctaText}
        locale={locale as Locale}
      />
      <MetaHealthExplainer
        title={dict.home.metahealth.title}
        paragraphs={dict.home.metahealth.paragraphs}
      />
      <LuscherInfo
        title={dict.home.luscher.title}
        paragraphs={dict.home.luscher.paragraphs}
      />
      <ServiceCards heading={dict.home.services.title} services={dict.home.services.items} />
      <CTASection
        title={dict.home.cta.title}
        buttonText={dict.home.cta.buttonText}
        locale={locale as Locale}
      />
    </>
  );
}
