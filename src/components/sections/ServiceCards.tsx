import { Container } from '@/components/ui/Container';
import { ScrollReveal } from '@/components/animation/ScrollReveal';
import { StaggerChildren, StaggerItem } from '@/components/animation/StaggerChildren';

interface ServiceCardsProps {
  heading: string;
  services: { title: string; description: string }[];
}

export function ServiceCards({ heading, services }: ServiceCardsProps) {
  return (
    <section className="py-[var(--spacing-section)]">
      <Container>
        <ScrollReveal>
          <h2 className="text-[var(--font-size-lg)] font-bold text-charcoal mb-10 text-center">
            {heading}
          </h2>
        </ScrollReveal>
        <StaggerChildren className="grid gap-8 md:grid-cols-3">
          {services.map((service, i) => (
            <StaggerItem key={i}>
              <div className="group rounded-2xl bg-white p-8 shadow-[var(--shadow-natural)] transition-all duration-300 hover:shadow-[var(--shadow-deep)] hover:-translate-y-1">
                {/* Accent bar */}
                <div className="mb-6 h-1 w-12 rounded-full bg-[var(--color-accent)]" />
                <h3 className="mb-3 text-xl font-bold text-charcoal">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-charcoal/70">
                  {service.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Container>
    </section>
  );
}
