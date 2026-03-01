import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import type { Locale } from '@/lib/i18n/config';

interface FooterProps {
  locale: Locale;
  copyright: string;
  tagline: string;
  navItems: { label: string; href: string }[];
}

export function Footer({ locale, copyright, tagline, navItems }: FooterProps) {
  return (
    <footer className="bg-charcoal py-12 text-white/70">
      <Container>
        <div className="flex flex-col items-center gap-8">
          {/* Logo */}
          <Link href={`/${locale}`}>
            <Image
              src="/images/logo/asmaa_logo_moderate_boost.png"
              alt={tagline}
              width={160}
              height={64}
              className="h-12 w-auto opacity-80 hover:opacity-100 transition-opacity"
            />
          </Link>

          {/* Nav links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-white/60 hover:text-white transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Divider */}
          <div className="w-full max-w-xs border-t border-white/10" />

          {/* Copyright */}
          <p className="text-sm text-white/40">{copyright}</p>
        </div>
      </Container>
    </footer>
  );
}
