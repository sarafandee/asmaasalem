import type { Metadata } from 'next';
import Link from 'next/link';
import { headers } from 'next/headers';

export const metadata: Metadata = {
  title: 'Page Not Found | أسماء سالم',
  robots: { index: false, follow: true },
};

export default async function NotFound() {
  const headersList = await headers();
  const acceptLang = headersList.get('accept-language') || '';
  const isEnglish = acceptLang.toLowerCase().startsWith('en');

  const lang = isEnglish ? 'en' : 'ar';
  const dir = isEnglish ? 'ltr' : 'rtl';
  const message = isEnglish ? 'Page not found' : 'الصفحة غير موجودة';
  const buttonText = isEnglish ? 'Back to Home' : 'العودة للرئيسية';
  const href = isEnglish ? '/en' : '/ar';

  return (
    <html lang={lang} dir={dir}>
      <body style={{ fontFamily: 'Cairo, Arial, system-ui, sans-serif' }} className="flex min-h-screen items-center justify-center bg-[#fbf7f0] text-[#1e2747]">
        <div className="text-center px-6">
          <h1 className="text-7xl font-bold mb-2 text-[#1d3570]">404</h1>
          <p className="text-xl text-[#535a72] mb-8">{message}</p>
          <Link
            href={href}
            className="inline-block rounded-full bg-[#1d3570] px-8 py-3 text-[#fbf7f0] font-semibold transition-all hover:scale-105 hover:shadow-lg"
          >
            {buttonText}
          </Link>
        </div>
      </body>
    </html>
  );
}
