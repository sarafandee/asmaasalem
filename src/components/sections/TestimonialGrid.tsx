import { Container } from '@/components/ui/Container';
import { ScrollReveal } from '@/components/animation/ScrollReveal';
import { LEAF_COLORS } from '@/lib/palette';

const LEAF_FILLS = Object.values(LEAF_COLORS).map((c) => c.fill);

interface TestimonialGridProps {
  testimonials: { name: string; quote: string }[];
}

export function TestimonialGrid({ testimonials }: TestimonialGridProps) {
  return (
    <section className="py-[var(--spacing-section)]">
      <Container className="max-w-[1240px]">
        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <ScrollReveal key={i}>
              <figure className="lift flex h-full flex-col gap-5 rounded-[28px] border border-line bg-card p-7 sm:p-9">
                <span
                  aria-hidden="true"
                  className="leaf leaf-turn block h-8 w-8"
                  style={{ backgroundColor: LEAF_FILLS[i % LEAF_FILLS.length] }}
                />
                <blockquote className="flex-1 text-base leading-relaxed sm:text-[1.05rem]">{t.quote}</blockquote>
                <figcaption className="font-semibold text-muted">— {t.name}</figcaption>
              </figure>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
