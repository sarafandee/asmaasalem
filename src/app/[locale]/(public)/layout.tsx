import type { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

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
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ProfessionalService',
            name: 'Asmaa Salem - Life Coach',
            description: dict.meta.siteDescription,
            url: `https://asmaasalem.com/${typedLocale}`,
            image: 'https://asmaasalem.com/images/about/profile.png',
            serviceType: 'Life Coaching',
            provider: {
              '@type': 'Person',
              name: 'Asmaa Salem',
              url: 'https://asmaasalem.com',
              jobTitle: typedLocale === 'ar' ? 'لايف كوتش متخصصة' : 'Specialized Life Coach',
              knowsAbout: ['Luscher Color Test', 'Meta-Health', 'Life Coaching', 'Emotional Analysis'],
              knowsLanguage: ['ar', 'en'],
            },
            areaServed: { '@type': 'GeoShape', name: 'Worldwide' },
            inLanguage: [typedLocale],
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'Customer Service',
              email: dict.footer.email,
              availableLanguage: ['Arabic', 'English'],
            },
          }),
        }}
      />
      <Header
        locale={typedLocale}
        navItems={navItems}
        languageToggleName={dict.nav.languageToggle}
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
    </>
  );
}
