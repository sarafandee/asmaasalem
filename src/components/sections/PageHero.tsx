import { Container } from '@/components/ui/Container';
import { ScrollReveal } from '@/components/animation/ScrollReveal';

interface PageHeroProps {
  title: string;
  subtitle?: string;
}

export function PageHero({ title, subtitle }: PageHeroProps) {
  return (
    <section className="relative bg-gradient-to-br from-charcoal via-charcoal to-charcoal/90 py-12 sm:py-16 md:py-20 overflow-hidden">
      {/* Decorative accent glow */}
      <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-[var(--color-accent)]/5 blur-3xl" />
      <Container>
        <ScrollReveal>
          <h1 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl text-center mb-3 relative">
            {title}
          </h1>
          {subtitle && (
            <p className="text-base text-white/70 text-center max-w-xl mx-auto relative">
              {subtitle}
            </p>
          )}
        </ScrollReveal>
      </Container>
    </section>
  );
}
