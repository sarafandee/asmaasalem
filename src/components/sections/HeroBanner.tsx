'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import type { Locale } from '@/lib/i18n/config';
import { ColorFlower } from './ColorFlower';
import { LUSCHER_COLORS, type LuscherColor } from '@/lib/palette';
import { useMood } from './MoodProvider';

interface HeroBannerProps {
  locale: Locale;
  kicker: string;
  titleLead: string;
  titleHighlight: string;
  titleRest: string;
  subtitle: string;
  ctaText: string;
  secondaryCta: string;
  pick: {
    prompt: string;
    chose: string;
    after: string;
    colors: Record<LuscherColor, string>;
  };
}

const PICK_ORDER: LuscherColor[] = ['blue', 'green', 'red', 'yellow'];
const ease = [0.16, 1, 0.3, 1] as const;

function rise(delay: number) {
  return {
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.1, delay, ease },
  };
}

export function HeroBanner({
  locale,
  kicker,
  titleLead,
  titleHighlight,
  titleRest,
  subtitle,
  ctaText,
  secondaryCta,
  pick,
}: HeroBannerProps) {
  const { picked, pick: setPicked } = useMood();

  return (
    <section className="relative overflow-hidden bg-ink text-paper">
      <div className="mx-auto grid max-w-[1240px] grid-cols-[minmax(0,1fr)] items-center gap-14 px-5 pb-20 pt-10 sm:px-8 md:pb-28 md:pt-16 lg:grid-cols-[1.1fr_1fr]">
        {/* Text */}
        <div className="flex flex-col gap-7">
          <motion.span {...rise(0)} className="eyebrow flex items-center gap-3 text-paper/75">
            <span className="h-0.5 w-8 bg-[var(--live-on-dark)] transition-colors duration-700" />
            {kicker}
          </motion.span>
          <motion.h1 {...rise(0.1)} className="text-[clamp(2.5rem,5.4vw,4.75rem)] tracking-[-0.01em]">
            {titleLead}{' '}
            <span className="text-[var(--live-on-dark)] transition-colors duration-700">{titleHighlight}</span>
          </motion.h1>
          <motion.p {...rise(0.2)} className="max-w-[34em] text-xl leading-relaxed text-paper/85 md:text-[1.3rem]">
            {titleRest}
          </motion.p>
          <motion.p {...rise(0.3)} className="max-w-[38em] text-base text-paper/70 md:text-[1.05rem]">
            {subtitle}
          </motion.p>
          <motion.div {...rise(0.4)} className="flex flex-wrap gap-3.5">
            <Link
              href={`/${locale}/contact`}
              className="pill h-14 bg-[var(--live-fill)] px-8 text-[1.05rem] text-[var(--live-ink)]"
            >
              {ctaText}
              <span aria-hidden="true" className="flip-rtl">→</span>
            </Link>
            <Link
              href="#meta-health"
              className="pill h-14 border border-paper/35 px-7 text-[1.05rem] font-normal text-paper hover:border-paper/70"
            >
              {secondaryCta}
            </Link>
          </motion.div>
        </div>

        {/* Living flower + colour pick */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, delay: 0.2, ease }}
          className="flex flex-col items-center gap-7"
        >
          <div className="relative grid aspect-square w-full max-w-[460px] place-items-center">
            <div aria-hidden="true" className="anim-spin-rev absolute inset-0 rounded-full border border-dashed border-paper/20" />
            <div aria-hidden="true" className="anim-spin-rev absolute inset-[16%] rounded-full border border-paper/10" />
            <div className="scale-[0.7] sm:scale-100">
              <div className="anim-spin">
                <ColorFlower petal={150} highlight={picked} />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3.5 text-center">
            <p className="text-base text-paper/80">{pick.prompt}</p>
            <div className="flex gap-4" role="group" aria-label={pick.prompt}>
              {PICK_ORDER.map((c) => (
                <button
                  key={c}
                  type="button"
                  aria-label={pick.colors[c]}
                  aria-pressed={picked === c}
                  onClick={() => setPicked(picked === c ? null : c)}
                  className={clsx(
                    'h-[52px] w-[52px] cursor-pointer rounded-full border-[3px] transition-transform duration-300 hover:scale-110',
                    picked === c ? 'border-paper' : 'border-transparent'
                  )}
                  style={{ backgroundColor: LUSCHER_COLORS[c].fill }}
                />
              ))}
            </div>
            <p aria-live="polite" className="min-h-[3.5em] max-w-[30em] text-[0.95rem] text-paper/80">
              {picked && (
                <>
                  <strong className="text-[var(--live-on-dark)]">
                    {pick.chose.replace('{color}', pick.colors[picked])}
                  </strong>{' '}
                  {pick.after}
                </>
              )}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
