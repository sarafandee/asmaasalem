'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Locale } from '@/lib/i18n/config';
import { HeroFlower } from './HeroFlower';

interface HeroBannerProps {
  locale: Locale;
  kicker: string;
  titleLead: string;
  titleHighlight: string;
  titleRest: string;
  subtitle: string;
  ctaText: string;
  secondaryCta: string;
}

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
}: HeroBannerProps) {
  return (
    <section className="relative overflow-hidden bg-paper text-ink">
      {/* Daylight: pools of the logo's colours drifting behind the flower, like light through coloured glass */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="anim-drift absolute -top-32 end-[6%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(143,195,234,0.55),transparent_68%)]" />
        <div className="anim-drift absolute end-[24%] top-44 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(242,102,90,0.3),transparent_68%)] [animation-delay:-4s]" />
        <div className="anim-drift absolute -end-16 top-64 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(140,200,112,0.4),transparent_68%)] [animation-delay:-8s]" />
        <div className="anim-drift absolute -top-20 end-[30%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(255,212,94,0.42),transparent_68%)] [animation-delay:-11s]" />
      </div>
      {/* Pointer glow; HeroFlower moves and colours it. */}
      <div
        data-hero-glow
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-[600px] w-[600px] rounded-full opacity-0 transition-opacity duration-500"
      />
      <div className="relative mx-auto grid max-w-[1240px] grid-cols-[minmax(0,1fr)] items-center gap-14 px-5 pb-20 pt-10 sm:px-8 md:pb-28 md:pt-16 lg:grid-cols-[1.1fr_1fr]">
        {/* Text */}
        <div className="flex flex-col gap-7">
          <motion.span {...rise(0)} className="eyebrow flex items-center gap-3 text-muted">
            <span aria-hidden="true" className="flex gap-1">
              <span className="leaf h-2.5 w-2.5 bg-leaf-blue" />
              <span className="leaf h-2.5 w-2.5 bg-leaf-red" />
              <span className="leaf h-2.5 w-2.5 bg-leaf-green" />
              <span className="leaf h-2.5 w-2.5 bg-leaf-yellow" />
            </span>
            {kicker}
          </motion.span>
          <motion.h1 {...rise(0.1)} className="text-[clamp(2.5rem,5.4vw,4.75rem)] tracking-[-0.01em]">
            {titleLead}{' '}
            <span className="mark text-navy">{titleHighlight}</span>
          </motion.h1>
          <motion.p {...rise(0.2)} className="max-w-[34em] text-xl leading-relaxed text-ink/90 md:text-[1.3rem]">
            {titleRest}
          </motion.p>
          <motion.p {...rise(0.3)} className="max-w-[38em] text-base text-muted md:text-[1.05rem]">
            {subtitle}
          </motion.p>
          <motion.div {...rise(0.4)} className="flex flex-wrap gap-3.5">
            <Link
              href={`/${locale}/contact`}
              className="pill h-14 bg-navy px-8 text-[1.05rem] text-paper"
            >
              {ctaText}
              <span aria-hidden="true" className="flip-rtl">→</span>
            </Link>
            <Link
              href="#meta-health"
              className="pill h-14 border border-navy px-7 text-[1.05rem] font-normal text-navy hover:bg-navy/5"
            >
              {secondaryCta}
            </Link>
          </motion.div>
        </div>

        {/* Living flower: reacts to the pointer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, delay: 0.2, ease }}
          className="flex justify-center"
        >
          <div className="relative grid aspect-square w-full max-w-[460px] place-items-center">
            <div aria-hidden="true" className="anim-spin-rev absolute inset-0 rounded-full border border-dashed border-navy/20" />
            <div aria-hidden="true" className="anim-spin-rev absolute inset-[16%] rounded-full border border-navy/10 bg-white/35" />
            {/* Out of flow, so the 426px flower never stretches the square on small screens. */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-[0.7] sm:scale-100">
              <HeroFlower />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
