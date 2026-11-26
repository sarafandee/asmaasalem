import type { Metadata } from 'next';
import { Cairo, Alexandria, IBM_Plex_Sans_Arabic } from 'next/font/google';
import { notFound } from 'next/navigation';
import { locales, localeConfig } from '@/lib/i18n/config';
import type { Locale } from '@/lib/i18n/config';

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
  display: 'swap',
});

const alexandria = Alexandria({
  subsets: ['arabic', 'latin'],
  variable: '--font-alexandria',
  display: 'swap',
});

const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '600'],
  variable: '--font-plex-arabic',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://asmaasalem.com'),
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    siteName: 'Asmaa Salem | Life Coach',
    images: [{ url: '/images/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/images/og-image.png'],
  },
};

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
  const isAr = typedLocale === 'ar';
  const themeVars = {
    '--color-accent': isAr ? '#ff523d' : '#0195ff',
    // Accent shades that pass WCAG AA as text on paper and on ink backgrounds
    '--color-accent-text': isAr ? '#b23a26' : '#0062b0',
    '--color-accent-on-dark': isAr ? '#ff8a78' : '#5cb8ff',
  } as React.CSSProperties;

  return (
    <html
      lang={config.lang}
      dir={config.dir}
      className={`${cairo.variable} ${alexandria.variable} ${plexArabic.variable}`}
      style={themeVars}
    >
      <body className="min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
