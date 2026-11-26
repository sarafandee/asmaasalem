import { ScrollReveal } from '@/components/animation/ScrollReveal';
import { ColorFlower } from './ColorFlower';

interface PageHeroProps {
  title: string;
  subtitle?: string;
}

export function PageHero({ title, subtitle }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-ink text-paper">
      <div className="pointer-events-none absolute -end-28 top-1/2 hidden -translate-y-1/2 opacity-90 md:block">
        <div className="anim-spin">
          <ColorFlower petal={150} />
        </div>
      </div>
      <div className="relative mx-auto max-w-[1240px] px-5 pb-20 pt-12 sm:px-8 md:pb-28 md:pt-16">
        <ScrollReveal>
          <div className="flex max-w-[44rem] flex-col gap-5 md:max-w-[calc(100%-22rem)]">
            <span aria-hidden="true" className="flex gap-1.5">
              <span className="leaf h-3 w-3 bg-lu-red" />
              <span className="leaf h-3 w-3 bg-lu-green" />
              <span className="leaf h-3 w-3 bg-lu-yellow" />
              <span className="leaf h-3 w-3 bg-lu-blue" />
            </span>
            <h1 className="text-[clamp(2.2rem,4.6vw,4rem)]">{title}</h1>
            {subtitle && <p className="text-lg text-paper/80 md:text-xl">{subtitle}</p>}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
