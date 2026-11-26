import { ScrollReveal } from '@/components/animation/ScrollReveal';
import { ColorFlower } from './ColorFlower';

interface PageHeroProps {
  title: string;
  subtitle?: string;
}

export function PageHero({ title, subtitle }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-paper text-ink">
      {/* Soft light pools in the logo colours, as in the home hero */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="anim-drift absolute -start-24 -top-24 h-[340px] w-[340px] rounded-full bg-[radial-gradient(circle,rgba(143,195,234,0.45),rgba(143,195,234,0)_68%)]" />
        <div className="anim-drift absolute -bottom-32 start-1/3 h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,rgba(255,212,94,0.35),rgba(255,212,94,0)_68%)] [animation-delay:-5s]" />
        <div className="anim-drift absolute -end-10 top-0 h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,rgba(140,200,112,0.3),rgba(140,200,112,0)_68%)] [animation-delay:-9s]" />
      </div>
      <div className="pointer-events-none absolute -end-28 top-1/2 hidden -translate-y-1/2 opacity-85 md:block">
        <div className="anim-spin">
          <ColorFlower petal={150} />
        </div>
      </div>
      <div className="relative mx-auto max-w-[1240px] px-5 pb-20 pt-12 sm:px-8 md:pb-28 md:pt-16">
        <ScrollReveal>
          <div className="flex max-w-[44rem] flex-col gap-5 md:max-w-[calc(100%-22rem)]">
            <span aria-hidden="true" className="flex gap-1.5">
              <span className="leaf h-3 w-3 bg-leaf-red" />
              <span className="leaf h-3 w-3 bg-leaf-green" />
              <span className="leaf h-3 w-3 bg-leaf-yellow" />
              <span className="leaf h-3 w-3 bg-leaf-blue" />
            </span>
            <h1 className="text-[clamp(2.2rem,4.6vw,4rem)]">{title}</h1>
            {subtitle && <p className="text-lg text-muted md:text-xl">{subtitle}</p>}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
