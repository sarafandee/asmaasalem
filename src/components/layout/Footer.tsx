import Link from 'next/link';
import Image from 'next/image';
import type { Locale } from '@/lib/i18n/config';
import { LEAF_COLORS } from '@/lib/palette';

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
    <footer className="on-navy bg-navy-deep text-on-navy">
      <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Logo + tagline */}
          <div className="flex flex-col gap-5">
            <Link href={`/${locale}`} className="flex w-fit items-center gap-3">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-paper">
                <Image
                  src="/images/logo/asmaa_logo_moderate_boost.png"
                  alt=""
                  width={36}
                  height={42}
                  className="h-[42px] w-9 object-contain"
                />
              </span>
              <span className="font-display text-lg font-semibold text-paper">{tagline}</span>
            </Link>
            <div className="flex gap-2" aria-hidden="true">
              {Object.values(LEAF_COLORS).map((c) => (
                <span key={c.fill} className="leaf h-3.5 w-3.5" style={{ backgroundColor: c.fill }} />
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="eyebrow mb-5 text-paper">{quickLinksLabel}</h3>
            <nav className="flex flex-col gap-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="w-fit text-[0.95rem] text-on-navy transition-colors duration-200 hover:text-paper"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="eyebrow mb-5 text-paper">{contactLabel}</h3>
            <a
              href={`mailto:${email}`}
              className="flex w-fit items-center gap-2 text-[0.95rem] text-on-navy transition-colors duration-200 hover:text-paper"
            >
              <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              {email}
            </a>
          </div>
        </div>

        <div className="mt-14 border-t border-paper/15 pt-8">
          <p className="text-center text-sm text-on-navy-soft">{copyright.replace('{year}', String(year))}</p>
        </div>
      </div>
    </footer>
  );
}
