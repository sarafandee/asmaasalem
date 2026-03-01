import Link from 'next/link';
import { headers } from 'next/headers';

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
      <body style={{ fontFamily: 'Cairo, Arial, system-ui, sans-serif' }} className="flex min-h-screen items-center justify-center bg-charcoal text-white">
        <div className="text-center px-6">
          <h1 className="text-7xl font-bold mb-2 text-[#ff523d]">404</h1>
          <p className="text-xl text-white/70 mb-8">{message}</p>
          <Link
            href={href}
            className="inline-block rounded-full bg-[#ff523d] px-8 py-3 text-white font-semibold transition-all hover:scale-105 hover:shadow-lg"
          >
            {buttonText}
          </Link>
        </div>
      </body>
    </html>
  );
}
