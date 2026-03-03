import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n/config';
import { locales } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { PageHero } from '@/components/sections/PageHero';
import { ContactForm } from '@/components/sections/ContactForm';

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
  const title = `${dict.nav.contact} | ${dict.meta.siteTitle}`;
  return {
    title,
    description: dict.meta.contactDescription,
    alternates: {
      canonical: `https://asmaasalem.com/${locale}/contact`,
      languages: {
        ar: 'https://asmaasalem.com/ar/contact',
        en: 'https://asmaasalem.com/en/contact',
      },
    },
    openGraph: {
      title,
      description: dict.meta.contactDescription,
      url: `https://asmaasalem.com/${locale}/contact`,
      locale: locale === 'ar' ? 'ar_SA' : 'en_US',
      type: 'website',
    },
    twitter: {
      title,
      description: dict.meta.contactDescription,
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <>
      <PageHero title={dict.contact.hero.title} subtitle={dict.contact.hero.description} />

      <ContactForm />
    </>
  );
}
