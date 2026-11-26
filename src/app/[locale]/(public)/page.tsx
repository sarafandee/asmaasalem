import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n/config';
import { locales } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { pageMetadata } from '@/lib/seo';
import { HeroBanner } from '@/components/sections/HeroBanner';
import { MetaHealthExplainer } from '@/components/sections/MetaHealthExplainer';
import { LuscherInfo } from '@/components/sections/LuscherInfo';
import { ServiceCards } from '@/components/sections/ServiceCards';
import { CTASection } from '@/components/sections/CTASection';
import { AboutTeaser } from '@/components/sections/AboutTeaser';
import { TestimonialMarquee } from '@/components/sections/TestimonialMarquee';
import { FAQ } from '@/components/sections/FAQ';

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
  return pageMetadata(locale as Locale, '', dict.meta.siteTitle, dict.meta.homeDescription);
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  const home = dict.home;
  const typedLocale = locale as Locale;

  return (
    <>
      <HeroBanner
        locale={typedLocale}
        kicker={home.hero.kicker}
        titleLead={home.hero.titleLead}
        titleHighlight={home.hero.titleHighlight}
        titleRest={home.hero.titleRest}
        subtitle={home.hero.subtitle}
        ctaText={home.hero.ctaText}
        secondaryCta={home.hero.secondaryCta}
      />
      <MetaHealthExplainer
        tag={home.metahealth.tag}
        title={home.metahealth.title}
        paragraphs={home.metahealth.paragraphs}
      />
      <LuscherInfo
        tag={home.luscher.tag}
        title={home.luscher.title}
        paragraphs={home.luscher.paragraphs}
        yearsLabel={home.luscher.yearsLabel}
        revealsTitle={home.luscher.revealsTitle}
        dimensions={home.luscher.dimensions}
        emblemAlt={home.luscher.emblemAlt}
        emblemCaption={home.luscher.emblemCaption}
      />
      <ServiceCards
        locale={typedLocale}
        tag={home.services.tag}
        heading={home.services.title}
        services={home.services.items}
        bookLabel={home.services.bookLabel}
        platformLabel={home.services.platformLabel}
      />
      <AboutTeaser
        locale={typedLocale}
        tag={home.aboutTeaser.tag}
        heading={home.aboutTeaser.heading}
        paragraphs={home.aboutTeaser.paragraphs}
        name={dict.about.hero.title}
        role={home.aboutTeaser.role}
        linkLabel={home.aboutTeaser.link}
        imageAlt={home.aboutTeaser.imageAlt}
      />
      <TestimonialMarquee
        locale={typedLocale}
        title={home.testimonials.title}
        viewAll={home.testimonials.viewAll}
        testimonials={dict.testimonials.items}
      />
      <FAQ tag={home.faq.tag} title={home.faq.title} items={home.faq.items} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            inLanguage: typedLocale,
            mainEntity: home.faq.items.map((item) => ({
              '@type': 'Question',
              name: item.q,
              acceptedAnswer: { '@type': 'Answer', text: item.a },
            })),
          }),
        }}
      />
      <CTASection
        title={home.cta.title}
        description={home.cta.description}
        subtitle={home.cta.joinTitle}
        buttonText={home.cta.buttonText}
        locale={typedLocale}
      />
    </>
  );
}
