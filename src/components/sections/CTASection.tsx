import Link from 'next/link';
import { ScrollReveal } from '@/components/animation/ScrollReveal';
import type { Locale } from '@/lib/i18n/config';
import { ColorFlower } from './ColorFlower';

interface CTASectionProps {
  title: string;
  description?: string;
  subtitle?: string;
  buttonText: string;
  locale: Locale;
  /** Where the button goes; defaults to the contact page. */
  href?: string;
}

export function CTASection({ title, description, subtitle, buttonText, locale, href }: CTASectionProps) {
  return (
    <section className="relative overflow-hidden bg-leaf-yellow text-ink">
      <div className="anim-spin-slow pointer-events-none absolute -end-36 -top-36 text-ink">
        <ColorFlower petal={190} outline sway={false} />
      </div>
      <div className="relative mx-auto flex max-w-[1240px] flex-col gap-6 px-5 py-[var(--spacing-section)] sm:px-8">
        <ScrollReveal>
          <h2 className="max-w-[12em] text-[clamp(2.4rem,5.6vw,5rem)] leading-[1.1]">{title}</h2>
        </ScrollReveal>
        {description && (
          <ScrollReveal delay={0.1}>
            <p className="max-w-[40em] text-lg text-ink/85">{description}</p>
          </ScrollReveal>
        )}
        {subtitle && (
          <ScrollReveal delay={0.15}>
            <p className="text-xl font-semibold">{subtitle}</p>
          </ScrollReveal>
        )}
        <ScrollReveal delay={0.2}>
          <Link href={href ?? `/${locale}/contact`} className="pill mt-2 h-[60px] bg-navy px-9 text-lg text-paper">
            {buttonText}
            <span aria-hidden="true" className="flip-rtl">→</span>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
