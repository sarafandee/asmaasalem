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
  whatsappCta: string;
  email: string;
  navItems: { label: string; href: string }[];
}

export function Footer({
  locale,
  copyright,
  tagline,
  quickLinksLabel,
  contactLabel,
  whatsappCta,
  email,
  navItems,
}: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal py-14 text-white/70">
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
            {/* Social icons */}
            <div className="mt-5 flex gap-3">
              <a
                href="https://www.instagram.com/asmaasalem_lifecoach"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors duration-200 hover:bg-[var(--color-accent)] hover:text-white"
                aria-label="Instagram"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg>
              </a>
              <a
                href="https://wa.me/message/PLACEHOLDER"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors duration-200 hover:bg-[#25D366] hover:text-white"
                aria-label="WhatsApp"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492l4.625-1.469A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-2.142 0-4.134-.67-5.77-1.81l-.413-.248-2.746.872.868-2.697-.271-.43A9.71 9.71 0 0 1 2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75z"/></svg>
              </a>
            </div>
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
            <div className="space-y-3">
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors duration-200"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                {email}
              </a>
              <a
                href="https://wa.me/message/PLACEHOLDER"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-5 py-2.5 text-sm font-semibold text-white transition-opacity duration-200 hover:opacity-90"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492l4.625-1.469A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
                {whatsappCta}
              </a>
            </div>
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
