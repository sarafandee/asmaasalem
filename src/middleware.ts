import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale } from '@/lib/i18n/config';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip internal paths
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/images') ||
    pathname.includes('.') // static files
  ) {
    return NextResponse.next();
  }

  // Check if the pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!pathnameHasLocale) {
    // Detect preferred locale from Accept-Language header
    const acceptLanguage = request.headers.get('accept-language') || '';
    const preferredLocale = acceptLanguage.includes('ar') ? 'ar' : defaultLocale;

    // Redirect to locale-prefixed path
    const url = request.nextUrl.clone();
    url.pathname = `/${preferredLocale}${pathname}`;
    return NextResponse.redirect(url);
  }

  // Auth protection for dashboard routes
  const isDashboardRoute = locales.some(
    (locale) => pathname.startsWith(`/${locale}/dashboard`)
  );

  if (isDashboardRoute) {
    const sessionToken =
      request.cookies.get('authjs.session-token')?.value ||
      request.cookies.get('__Secure-authjs.session-token')?.value;

    if (!sessionToken) {
      // Extract locale from path
      const locale = pathname.split('/')[1] || defaultLocale;
      const url = request.nextUrl.clone();
      url.pathname = `/${locale}/login`;
      url.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(url);
    }
  }

  // Redirect authenticated users away from login page
  const isLoginRoute = locales.some(
    (locale) => pathname === `/${locale}/login`
  );

  if (isLoginRoute) {
    const sessionToken =
      request.cookies.get('authjs.session-token')?.value ||
      request.cookies.get('__Secure-authjs.session-token')?.value;

    if (sessionToken) {
      const locale = pathname.split('/')[1] || defaultLocale;
      const url = request.nextUrl.clone();
      url.pathname = `/${locale}/dashboard`;
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|api|images|favicon.ico|robots.txt|sitemap.xml).*)'],
};
