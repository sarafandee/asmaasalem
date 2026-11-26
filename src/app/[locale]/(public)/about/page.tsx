import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n/config';
import { locales } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { pageMetadata } from '@/lib/seo';
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
  const title = `${dict.nav.about} | ${dict.meta.siteTitle}`;
  return pageMetadata(locale as Locale, '/about', title, dict.meta.aboutDescription);
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

      <CertificateGallery credentials={dict.about.credentials} viewLabel={dict.about.viewCertificate} />

      {/* Career story */}
      <section className="on-navy bg-navy text-paper">
        <Container className="max-w-[1240px] py-[var(--spacing-section)]">
          <ScrollReveal>
            <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
              <h2 className="text-[clamp(1.8rem,3.2vw,2.75rem)]">{dict.about.careerStory.title}</h2>
              <div className="flex flex-col gap-5 text-on-navy">
                {dict.about.careerStory.paragraphs.map((p: string, i: number) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <CTASection
        title={dict.about.cta.title}
        subtitle={dict.about.cta.subtitle}
        buttonText={dict.about.cta.buttonText}
        locale={locale as Locale}
      />
    </>
  );
}
