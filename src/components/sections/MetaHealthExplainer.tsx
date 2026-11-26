import { ScrollReveal } from '@/components/animation/ScrollReveal';

interface MetaHealthExplainerProps {
  tag: string;
  title: string;
  paragraphs: string[];
  inhale: string;
  exhale: string;
}

export function MetaHealthExplainer({ tag, title, paragraphs, inhale, exhale }: MetaHealthExplainerProps) {
  const [lead, second, ...rest] = paragraphs;

  return (
    <section id="meta-health" className="scroll-mt-24">
      <div className="mx-auto grid max-w-[1240px] items-center gap-16 px-5 py-[var(--spacing-section)] sm:px-8 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
        <ScrollReveal>
          <div className="flex flex-col gap-6">
            <span className="eyebrow text-lu-green-text">01 — {tag}</span>
            <h2 className="text-[clamp(2.1rem,4vw,3.4rem)]">{title}</h2>
            {lead && <p className="text-xl font-medium leading-relaxed md:text-[1.35rem]">{lead}</p>}
            {second && <p className="text-muted">{second}</p>}
            {rest.length > 0 && (
              <div className="grid gap-7 border-t border-line pt-6 sm:grid-cols-2">
                {rest.map((p, i) => (
                  <p key={i} className="text-base text-muted">
                    {p}
                  </p>
                ))}
              </div>
            )}
          </div>
        </ScrollReveal>

        {/* Breathing: feel (inhale) and let go (exhale) */}
        <ScrollReveal delay={0.15}>
          <div className="flex flex-col items-center gap-6">
            <div aria-hidden="true" className="relative grid aspect-square w-full max-w-[420px] place-items-center">
              <div className="anim-ring absolute inset-0 rounded-full border-2 border-lu-green" />
              <div className="anim-ring absolute inset-[12%] rounded-full border border-lu-green" style={{ animationDelay: '0.4s' }} />
              <div className="anim-breathe absolute inset-[20%] rounded-full bg-lu-green" />
              <div className="anim-breathe absolute inset-[36%] rounded-full bg-paper/90" style={{ animationDelay: '0.15s' }} />
            </div>
            <div className="relative h-10 w-full text-center font-display text-xl font-semibold text-lu-green-text">
              <span className="anim-inhale absolute inset-0">{inhale}</span>
              <span className="anim-exhale absolute inset-0 opacity-0">{exhale}</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
