import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n/config';
import { locales } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { Container } from '@/components/ui/Container';
import { ScrollReveal } from '@/components/animation/ScrollReveal';
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
  return {
    title: `${dict.nav.instructors} | ${dict.meta.siteTitle}`,
    description: dict.meta.siteDescription,
    alternates: {
      canonical: `https://asmaasalem.com/${locale}/instructors`,
      languages: { ar: '/ar/instructors', en: '/en/instructors' },
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
      {/* Page hero */}
      <section className="bg-charcoal py-16 md:py-20">
        <Container>
          <ScrollReveal>
            <h1 className="text-3xl font-bold text-white md:text-4xl text-center">
              {dict.nav.instructors}
            </h1>
          </ScrollReveal>
        </Container>
      </section>

      <InstructorPlatform
        title={dict.instructors.hero.title}
        description={dict.instructors.hero.description}
        phases={dict.instructors.phases}
      />

      <CTASection
        title={dict.instructors.cta.title}
        buttonText={dict.instructors.cta.buttonText}
        locale={locale as Locale}
      />
    </>
  );
}
