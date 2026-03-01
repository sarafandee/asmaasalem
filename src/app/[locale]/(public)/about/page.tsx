import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n/config';
import { locales } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { Container } from '@/components/ui/Container';
import { ScrollReveal } from '@/components/animation/ScrollReveal';
import { PageHero } from '@/components/sections/PageHero';
import { BioSection } from '@/components/sections/BioSection';
import { CertificateGallery } from '@/components/sections/CertificateGallery';
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
    title: `${dict.nav.about} | ${dict.meta.siteTitle}`,
    description: dict.meta.aboutDescription,
    alternates: {
      canonical: `https://asmaasalem.com/${locale}/about`,
      languages: { ar: '/ar/about', en: '/en/about' },
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <>
      <PageHero title={dict.about.hero.title} subtitle={dict.about.hero.subtitle} />

      <BioSection
        quote={dict.about.hero.quote}
        paragraphs={dict.about.bio.paragraphs}
      />

      <CertificateGallery credentials={dict.about.credentials} />

      {/* Career story */}
      <section className="py-[var(--spacing-section)]">
        <Container narrow>
          <ScrollReveal>
            <h2 className="text-[var(--font-size-lg)] font-bold text-charcoal mb-6 text-center">
              {dict.about.careerStory.title}
            </h2>
            <div className="space-y-4">
              {dict.about.careerStory.paragraphs.map((p: string, i: number) => (
                <p key={i} className="text-base leading-relaxed text-charcoal/80">
                  {p}
                </p>
              ))}
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <CTASection
        title={dict.about.cta.title}
        buttonText={dict.about.cta.buttonText}
        locale={locale as Locale}
      />
    </>
  );
}
