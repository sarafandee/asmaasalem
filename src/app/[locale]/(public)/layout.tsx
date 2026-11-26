import type { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SITE_URL } from '@/lib/seo';

type Dict = Awaited<ReturnType<typeof getDictionary>>;

const NAMES = ['Asmaa Mohammed Salem', 'Asmaa Salem', 'أسماء محمد سالم', 'أسماء سالم'];

/**
 * Who Asmaa is and what she offers, for search engines and AI assistants.
 * Credentials come from the same list the About page shows.
 */
function structuredData(locale: Locale, dict: Dict) {
  const home = `${SITE_URL}/${locale}`;
  const personId = `${SITE_URL}/#asmaa`;
  const name = dict.about.hero.title;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: dict.nav.brand,
        inLanguage: ['ar', 'en'],
        publisher: { '@id': personId },
      },
      {
        '@type': 'Person',
        '@id': personId,
        name,
        alternateName: NAMES.filter((n) => n !== name),
        url: `${home}/about`,
        jobTitle: dict.home.aboutTeaser.role,
        description: dict.about.hero.subtitle,
        email: `mailto:${dict.footer.email}`,
        knowsAbout: ['Lüscher Color Test', 'Meta-Health', 'Color psychology', 'Life coaching', 'Emotional health'],
        knowsLanguage: ['ar', 'en'],
        hasCredential: dict.about.credentials.map((c) => ({
          '@type': 'EducationalOccupationalCredential',
          name: c.title,
          ...(c.institution && { recognizedBy: { '@type': 'Organization', name: c.institution } }),
        })),
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${SITE_URL}/#service`,
        name: dict.meta.siteTitle,
        description: dict.meta.siteDescription,
        url: home,
        logo: `${SITE_URL}/icon-512.png`,
        image: `${SITE_URL}/images/og-image.png`,
        founder: { '@id': personId },
        serviceType: dict.home.services.items.map((s) => s.title),
        areaServed: 'Worldwide',
        availableLanguage: ['Arabic', 'English'],
        email: dict.footer.email,
        inLanguage: locale,
      },
    ],
  };
}

export default async function PublicLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const dict = await getDictionary(typedLocale);

  const navItems = [
    { label: dict.nav.home, href: `/${locale}` },
    { label: dict.nav.about, href: `/${locale}/about` },
    { label: dict.nav.instructors, href: `/${locale}/instructors` },
    { label: dict.nav.testimonials, href: `/${locale}/testimonials` },
    { label: dict.nav.contact, href: `/${locale}/contact` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData(typedLocale, dict)) }}
      />
      <div className="site flex min-h-screen flex-col">
      <Header
        locale={typedLocale}
        navItems={navItems}
        languageToggleName={dict.nav.languageToggle}
        ctaText={dict.home.hero.ctaText}
        brandName={dict.nav.brand}
      />
      <main className="flex-1">{children}</main>
      <Footer
        locale={typedLocale}
        copyright={dict.footer.copyright}
        tagline={dict.footer.tagline}
        quickLinksLabel={dict.footer.quickLinks}
        contactLabel={dict.footer.contactInfo}
        email={dict.footer.email}
        navItems={navItems}
      />
      </div>
    </>
  );
}
