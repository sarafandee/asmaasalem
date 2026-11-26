import { ScrollReveal } from '@/components/animation/ScrollReveal';

interface MetaHealthExplainerProps {
  tag: string;
  title: string;
  paragraphs: string[];
}

export function MetaHealthExplainer({ tag, title, paragraphs }: MetaHealthExplainerProps) {
  const [lead, second, ...rest] = paragraphs;

  return (
    <section id="meta-health" className="scroll-mt-24 bg-paper-deep">
      <div className="mx-auto grid max-w-[1240px] items-center gap-16 px-5 py-[var(--spacing-section)] sm:px-8 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
        <ScrollReveal>
          <div className="flex flex-col gap-6">
            <span className="eyebrow text-leaf-green-text">01 — {tag}</span>
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

        {/* Slow pulsing rings: purely decorative */}
        <ScrollReveal delay={0.15}>
          <div className="flex flex-col items-center gap-6">
            <div aria-hidden="true" className="relative grid aspect-square w-full max-w-[420px] place-items-center">
              <div className="anim-ring absolute inset-0 rounded-full border-2 border-leaf-green" />
              <div className="anim-ring absolute inset-[12%] rounded-full border border-leaf-green" style={{ animationDelay: '0.4s' }} />
              <div className="anim-breathe absolute inset-[20%] rounded-full bg-leaf-green" />
              <div className="anim-breathe absolute inset-[36%] rounded-full bg-paper-deep" style={{ animationDelay: '0.15s' }} />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
