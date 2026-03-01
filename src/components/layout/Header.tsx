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
}

export function Header({ locale, navItems, languageToggleName }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const config = localeConfig[locale];
  const toggleLocale = config.toggleLocale;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Build the toggle href by replacing locale prefix
  const toggleHref = pathname.replace(`/${locale}`, `/${toggleLocale}`) || `/${toggleLocale}`;

  return (
    <>
      <header
        className={clsx(
          'fixed top-0 start-0 end-0 z-40 transition-all duration-500',
          scrolled
            ? 'bg-charcoal/95 backdrop-blur-sm shadow-lg'
            : 'bg-charcoal'
        )}
      >
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-3 md:px-8">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex-shrink-0">
            <Image
              src="/images/logo/asmaa_logo_moderate_boost.png"
              alt={locale === 'ar' ? 'أسماء سالم - لايف كوتش' : 'Asmaa Salem - Life Coach'}
              width={200}
              height={80}
              className="h-14 w-auto md:h-16"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    'rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200',
                    isActive
                      ? 'text-[var(--color-accent)]'
                      : 'text-white/80 hover:text-white'
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href={toggleHref}
              className="ms-2 rounded-full border border-white/30 px-4 py-1.5 text-sm text-white/80 transition-colors duration-200 hover:border-white hover:text-white"
            >
              {languageToggleName}
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="flex flex-col items-center justify-center gap-1.5 p-2 lg:hidden cursor-pointer"
            aria-label="Open menu"
          >
            <span className="h-0.5 w-6 bg-white transition-transform" />
            <span className="h-0.5 w-6 bg-white transition-opacity" />
            <span className="h-0.5 w-6 bg-white transition-transform" />
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
      />

      {/* Spacer for fixed header */}
      <div className="h-[72px] md:h-[80px]" />
    </>
  );
}
