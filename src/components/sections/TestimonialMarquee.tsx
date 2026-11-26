import Link from 'next/link';
import { ScrollReveal } from '@/components/animation/ScrollReveal';
import type { Locale } from '@/lib/i18n/config';
import { LEAF_COLORS } from '@/lib/palette';

interface TestimonialMarqueeProps {
  locale: Locale;
  title: string;
  viewAll: string;
  testimonials: { name: string; quote: string }[];
}

const FILLS = [LEAF_COLORS.red.fill, LEAF_COLORS.blue.fill, LEAF_COLORS.yellow.fill, LEAF_COLORS.green.fill];

/** Client stories drifting past; hovering pauses the drift. */
export function TestimonialMarquee({ locale, title, viewAll, testimonials }: TestimonialMarqueeProps) {
  return (
    <section className="flex flex-col gap-12 py-[var(--spacing-section)]">
      <ScrollReveal>
        <div className="mx-auto flex w-full max-w-[1240px] flex-wrap items-end justify-between gap-6 px-5 sm:px-8">
          <h2 className="text-[clamp(1.9rem,3.4vw,2.9rem)]">{title}</h2>
          <Link
            href={`/${locale}/testimonials`}
            className="inline-flex min-h-11 items-center gap-2 font-semibold underline decoration-[var(--color-accent)] decoration-2 underline-offset-[6px] hover:decoration-[3px]"
          >
            {viewAll}
            <span aria-hidden="true" className="flip-rtl">→</span>
          </Link>
        </div>
      </ScrollReveal>

      <div className="marquee-pause fade-edges overflow-hidden">
        <ul className="anim-marquee flex w-max gap-6 py-3" style={{ '--marquee-duration': '70s' } as React.CSSProperties}>
          {/* Rendered twice for a seamless loop; the copy is hidden from screen readers. */}
          {[0, 1].map((copy) =>
            testimonials.map((t, i) => (
              <li
                key={`${copy}-${i}`}
                aria-hidden={copy === 1 ? true : undefined}
                className="flex w-[340px] shrink-0 flex-col gap-4 rounded-[28px] border border-line bg-card p-8 sm:w-[380px]"
              >
                <span aria-hidden="true" className="leaf block h-7 w-7" style={{ backgroundColor: FILLS[i % FILLS.length] }} />
                <blockquote className="line-clamp-6 text-base leading-relaxed">{t.quote}</blockquote>
                <p className="mt-auto text-[0.95rem] font-semibold text-muted">— {t.name}</p>
              </li>
            ))
          )}
        </ul>
      </div>
    </section>
  );
}
