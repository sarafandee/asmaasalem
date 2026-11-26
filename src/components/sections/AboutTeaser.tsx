import Image from 'next/image';
import Link from 'next/link';
import { ScrollReveal } from '@/components/animation/ScrollReveal';
import type { Locale } from '@/lib/i18n/config';

interface AboutTeaserProps {
  locale: Locale;
  tag: string;
  quote: string;
  name: string;
  subtitle: string;
  linkLabel: string;
  imageAlt: string;
}

export function AboutTeaser({ locale, tag, quote, name, subtitle, linkLabel, imageAlt }: AboutTeaserProps) {
  return (
    <section className="bg-paper-deep">
      <div className="mx-auto grid max-w-[1240px] items-center gap-14 px-5 py-[var(--spacing-section)] sm:px-8 md:grid-cols-[1fr_1.2fr] md:gap-20">
        <ScrollReveal>
          <div className="grid place-items-center">
            {/* Portrait frame. To use a photo of Asmaa, change src (and alt) here. */}
            <div className="relative aspect-[4/5] w-full max-w-[380px] overflow-hidden rounded-t-[200px] rounded-b-[32px] border border-line bg-card shadow-[0_30px_60px_rgba(29,53,112,0.12)]">
              <Image
                src="/images/about/profile.png"
                alt={imageAlt}
                fill
                className="object-contain p-6 pt-10 mix-blend-multiply"
                sizes="(max-width: 768px) 80vw, 380px"
              />
            </div>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <div className="flex flex-col gap-5">
            <span className="eyebrow text-navy">{tag}</span>
            <blockquote className="font-display text-[clamp(1.75rem,3.2vw,2.6rem)] font-semibold leading-snug">
              “{quote}”
            </blockquote>
            <div className="flex flex-col gap-1">
              <strong className="text-xl">{name}</strong>
              <span className="text-base text-muted">{subtitle}</span>
            </div>
            <Link
              href={`/${locale}/about`}
              className="inline-flex min-h-11 w-fit items-center gap-2 font-semibold underline decoration-[var(--color-accent)] decoration-2 underline-offset-[6px] hover:decoration-[3px]"
            >
              {linkLabel}
              <span aria-hidden="true" className="flip-rtl">→</span>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
