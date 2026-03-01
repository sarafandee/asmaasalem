import Link from 'next/link';

export default function NotFound() {
  return (
    <html lang="ar" dir="rtl">
      <body className="flex min-h-screen items-center justify-center bg-charcoal text-white">
        <div className="text-center px-6">
          <h1 className="text-6xl font-bold mb-4">404</h1>
          <p className="text-xl text-white/70 mb-8">الصفحة غير موجودة</p>
          <Link
            href="/ar"
            className="inline-block rounded-full bg-[#ff523d] px-8 py-3 text-white font-semibold transition-transform hover:scale-105"
          >
            العودة للرئيسية
          </Link>
        </div>
      </body>
    </html>
  );
}
