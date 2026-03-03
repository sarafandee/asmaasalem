import type { Metadata } from 'next';
import { Cairo } from 'next/font/google';
import { notFound } from 'next/navigation';
import { locales, localeConfig } from '@/lib/i18n/config';
import type { Locale } from '@/lib/i18n/config';

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
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
  const accentColor = typedLocale === 'ar' ? '#ff523d' : '#0195ff';

  return (
    <html
      lang={config.lang}
      dir={config.dir}
      className={cairo.variable}
      style={{ '--color-accent': accentColor } as React.CSSProperties}
    >
      <body className="min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
