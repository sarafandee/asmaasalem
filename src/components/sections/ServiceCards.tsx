import Link from 'next/link';
import { ScrollReveal } from '@/components/animation/ScrollReveal';
import { StaggerChildren, StaggerItem } from '@/components/animation/StaggerChildren';
import type { Locale } from '@/lib/i18n/config';
import { LUSCHER_COLORS } from '@/lib/palette';

interface ServiceCardsProps {
  locale: Locale;
  tag: string;
  heading: string;
  services: { title: string; description: string }[];
  bookLabel: string;
  platformLabel: string;
}

const FILLS = [LUSCHER_COLORS.blue.fill, LUSCHER_COLORS.red.fill, LUSCHER_COLORS.green.fill];

export function ServiceCards({ locale, tag, heading, services, bookLabel, platformLabel }: ServiceCardsProps) {
  return (
    <section className="mx-auto flex max-w-[1240px] flex-col gap-14 px-5 py-[var(--spacing-section)] sm:px-8">
      <ScrollReveal>
        <div className="flex max-w-[760px] flex-col gap-5">
          <span className="eyebrow text-[var(--color-accent-text)]">03 — {tag}</span>
          <h2 className="text-[clamp(1.9rem,3.4vw,2.9rem)] leading-tight">{heading}</h2>
        </div>
      </ScrollReveal>
      <StaggerChildren className="grid gap-6 md:grid-cols-3">
        {services.map((service, i) => {
          // The third service is the practitioners' platform; the others are bookable sessions.
          const isPlatform = i === 2;
          return (
            <StaggerItem key={i} className="h-full">
              <article className="lift flex h-full flex-col gap-5 rounded-[32px] border border-line bg-card p-8 sm:p-9">
                <div className="flex items-center justify-between">
                  <span
                    aria-hidden="true"
                    className="leaf leaf-turn block h-[60px] w-[60px]"
                    style={{ backgroundColor: FILLS[i % FILLS.length] }}
                  />
                  <span className="font-display text-[2.5rem] font-extrabold text-[#6b6560]">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="text-[1.35rem]">{service.title}</h3>
                <p className="flex-1 text-base text-muted">{service.description}</p>
                <Link
                  href={`/${locale}/${isPlatform ? 'instructors' : 'contact'}`}
                  className="inline-flex min-h-11 items-center gap-2 font-semibold text-ink underline decoration-[var(--color-accent)] decoration-2 underline-offset-[6px] hover:decoration-[3px]"
                >
                  {isPlatform ? platformLabel : bookLabel}
                  <span aria-hidden="true" className="flip-rtl">→</span>
                </Link>
              </article>
            </StaggerItem>
          );
        })}
      </StaggerChildren>
    </section>
  );
}
