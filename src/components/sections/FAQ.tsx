import { ScrollReveal } from '@/components/animation/ScrollReveal';
import { LEAF_COLORS } from '@/lib/palette';

interface FAQProps {
  tag: string;
  title: string;
  items: { q: string; a: string }[];
}

const FILLS = Object.values(LEAF_COLORS).map((c) => c.fill);

/**
 * Questions and answers as native disclosure widgets: no JavaScript, and the
 * answers stay in the HTML for search engines and AI assistants.
 */
export function FAQ({ tag, title, items }: FAQProps) {
  return (
    <section id="faq" className="scroll-mt-24 bg-paper-deep">
      <div className="mx-auto grid max-w-[1240px] gap-12 px-5 py-[var(--spacing-section)] sm:px-8 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
        <ScrollReveal>
          <div className="flex flex-col gap-5 lg:sticky lg:top-28">
            <span className="eyebrow text-navy">{tag}</span>
            <h2 className="text-[clamp(1.9rem,3.4vw,2.9rem)] leading-tight">{title}</h2>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <div className="flex flex-col gap-3">
            {items.map((item, i) => (
              <details
                key={i}
                className="group rounded-[24px] border border-line bg-card px-6 py-5 transition-shadow duration-300 open:shadow-[0_14px_34px_rgba(29,53,112,0.08)] sm:px-7"
              >
                <summary className="flex cursor-pointer list-none items-center gap-4 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                  <span
                    aria-hidden="true"
                    className="leaf h-3 w-3 flex-shrink-0"
                    style={{ backgroundColor: FILLS[i % FILLS.length] }}
                  />
                  <span className="flex-1">{item.q}</span>
                  <span
                    aria-hidden="true"
                    className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-full border border-line text-navy transition-transform duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 ps-7 leading-relaxed text-muted">{item.a}</p>
              </details>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
