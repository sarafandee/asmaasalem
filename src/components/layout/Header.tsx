'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import type { Locale } from '@/lib/i18n/config';
import { localeConfig } from '@/lib/i18n/config';
import { MobileMenu } from './MobileMenu';

interface NavItem {
  label: string;
  href: string;
}

interface HeaderProps {
  locale: Locale;
  navItems: NavItem[];
  languageToggleName: string;
  ctaText: string;
  brandName: string;
}

export function Header({ locale, navItems, languageToggleName, ctaText, brandName }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const config = localeConfig[locale];
  const toggleLocale = config.toggleLocale;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Build the toggle href by replacing locale prefix
  const toggleHref = pathname.replace(`/${locale}`, `/${toggleLocale}`) || `/${toggleLocale}`;

  return (
    <>
      <header
        className={clsx(
          'fixed top-0 start-0 end-0 z-40 border-b text-ink transition-all duration-500',
          scrolled
            ? 'border-line bg-paper/90 shadow-[0_10px_30px_rgba(29,53,112,0.08)] backdrop-blur-md'
            : 'border-transparent bg-paper'
        )}
      >
        <div
          className={clsx(
            'mx-auto flex max-w-[1240px] items-center justify-between gap-6 px-5 transition-all duration-500 sm:px-8',
            scrolled ? 'py-2.5' : 'py-4'
          )}
        >
          {/* Logo */}
          <Link href={`/${locale}`} className="flex flex-shrink-0 items-center gap-3">
            {/* On the light ground the logo needs no badge behind it */}
            <Image
              src="/images/logo/asmaa_logo_moderate_boost.png"
              alt=""
              width={44}
              height={51}
              className="h-[51px] w-11 object-contain"
              priority
            />
            <span className="whitespace-nowrap font-display text-lg font-semibold">{brandName}</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-0.5 min-[1360px]:flex">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={clsx(
                    'relative whitespace-nowrap rounded-full px-3 py-2 text-[0.95rem] transition-colors duration-200',
                    isActive ? 'font-semibold text-ink' : 'text-muted hover:text-ink'
                  )}
                >
                  {item.label}
                  {isActive && (
                    <span className="leaf absolute -bottom-0.5 left-1/2 h-1.5 w-1.5 -translate-x-1/2 bg-[var(--color-accent)]" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 min-[1360px]:flex">
            <Link
              href={toggleHref}
              className="inline-flex h-11 items-center whitespace-nowrap rounded-full border border-line px-4 text-[0.95rem] transition-colors duration-200 hover:border-ink"
            >
              {languageToggleName}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="pill h-11 whitespace-nowrap bg-navy px-5 text-[0.95rem] text-paper"
            >
              {ctaText}
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="flex h-11 w-11 cursor-pointer flex-col items-center justify-center gap-1.5 min-[1360px]:hidden"
            aria-label={locale === 'ar' ? 'فتح القائمة' : 'Open menu'}
          >
            <span className="h-0.5 w-6 bg-ink" />
            <span className="h-0.5 w-6 bg-ink" />
            <span className="h-0.5 w-4 self-end bg-ink me-2.5" />
          </button>
        </div>
      </header>

      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navItems={navItems}
        languageToggleName={languageToggleName}
        toggleHref={toggleHref}
        pathname={pathname}
        ctaText={ctaText}
        ctaHref={`/${locale}/contact`}
        closeLabel={locale === 'ar' ? 'إغلاق القائمة' : 'Close menu'}
      />

      {/* Spacer for fixed header */}
      <div className="h-[80px] bg-paper" />
    </>
  );
}
