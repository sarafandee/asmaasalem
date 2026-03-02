import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import type { Locale } from '@/lib/i18n/config';

interface FooterProps {
  locale: Locale;
  copyright: string;
  tagline: string;
  quickLinksLabel: string;
  contactLabel: string;
  email: string;
  navItems: { label: string; href: string }[];
}

export function Footer({
  locale,
  copyright,
  tagline,
  quickLinksLabel,
  contactLabel,
  email,
  navItems,
}: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal py-10 sm:py-14 text-white/70">
      <Container>
        {/* 3-column grid on desktop */}
        <div className="grid gap-10 md:grid-cols-3">
          {/* Column 1: Logo + tagline */}
          <div>
            <Link href={`/${locale}`} className="inline-block">
              <Image
                src="/images/logo/asmaa_logo_moderate_boost.png"
                alt={tagline}
                width={160}
                height={64}
                className="h-12 w-auto opacity-80 hover:opacity-100 transition-opacity"
              />
            </Link>
            <p className="mt-4 text-sm text-white/50 max-w-xs">
              {tagline}
            </p>
          </div>

          {/* Column 2: Quick links */}
          <div>
            <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">
              {quickLinksLabel}
            </h3>
            <nav className="flex flex-col gap-2.5">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-white/50 hover:text-white transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Contact info */}
          <div>
            <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">
              {contactLabel}
            </h3>
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors duration-200"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              {email}
            </a>
          </div>
        </div>

        {/* Divider + copyright */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="text-center text-sm text-white/40">
            {copyright.replace('{year}', String(year))}
          </p>
        </div>
      </Container>
    </footer>
  );
}
