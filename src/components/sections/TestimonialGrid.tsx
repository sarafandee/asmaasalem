import { Container } from '@/components/ui/Container';
import { ScrollReveal } from '@/components/animation/ScrollReveal';

interface TestimonialGridProps {
  testimonials: { name: string; quote: string }[];
}

export function TestimonialGrid({ testimonials }: TestimonialGridProps) {
  return (
    <section className="py-[var(--spacing-section)] bg-cream">
      <Container>
        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <ScrollReveal key={i}>
              <div className="flex h-full flex-col rounded-xl bg-white p-5 sm:p-8 shadow-[var(--shadow-sm)] transition-shadow duration-300 hover:shadow-[var(--shadow-md)]">
                {/* Decorative open quote */}
                <span className="block text-4xl leading-none text-[var(--color-accent)]/30 font-serif mb-3">&ldquo;</span>
                <p className="text-base leading-relaxed text-charcoal/80 mb-5">{t.quote}</p>
                <p className="text-sm font-bold text-charcoal">
                  <span className="text-[var(--color-accent)]">&mdash;</span> {t.name}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
