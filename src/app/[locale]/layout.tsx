import { Cairo } from 'next/font/google';
import { notFound } from 'next/navigation';
import { locales, localeConfig } from '@/lib/i18n/config';
import type { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
  display: 'swap',
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const typedLocale = locale as Locale;
  const config = localeConfig[typedLocale];
  const dict = await getDictionary(typedLocale);

  const accentColor = typedLocale === 'ar' ? '#ff523d' : '#0195ff';

  const navItems = [
    { label: dict.nav.home, href: `/${locale}` },
    { label: dict.nav.about, href: `/${locale}/about` },
    { label: dict.nav.instructors, href: `/${locale}/instructors` },
    { label: dict.nav.testimonials, href: `/${locale}/testimonials` },
    { label: dict.nav.contact, href: `/${locale}/contact` },
  ];

  return (
    <html
      lang={config.lang}
      dir={config.dir}
      className={cairo.variable}
      style={{ '--color-accent': accentColor } as React.CSSProperties}
    >
      <body className="min-h-screen flex flex-col">
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
          navItems={navItems}
        />
      </body>
    </html>
  );
}
