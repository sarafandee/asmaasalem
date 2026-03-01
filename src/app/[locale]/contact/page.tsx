import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n/config';
import { locales } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { Container } from '@/components/ui/Container';
import { ScrollReveal } from '@/components/animation/ScrollReveal';
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
  return {
    title: `${dict.nav.contact} | ${dict.meta.siteTitle}`,
    description: dict.meta.siteDescription,
    alternates: {
      canonical: `https://asmaasalem.com/${locale}/contact`,
      languages: { ar: '/ar/contact', en: '/en/contact' },
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
      {/* Page hero */}
      <section className="bg-charcoal py-16 md:py-20">
        <Container>
          <ScrollReveal>
            <h1 className="text-3xl font-bold text-white md:text-4xl text-center mb-4">
              {dict.contact.hero.title}
            </h1>
            <p className="text-base text-white/70 text-center max-w-xl mx-auto">
              {dict.contact.hero.description}
            </p>
          </ScrollReveal>
        </Container>
      </section>

      <ContactForm form={dict.contact.form} />
    </>
  );
}
