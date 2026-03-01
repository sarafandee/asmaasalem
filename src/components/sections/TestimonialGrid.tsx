import { Container } from '@/components/ui/Container';
import { StaggerChildren, StaggerItem } from '@/components/animation/StaggerChildren';
import { TestimonialCard } from './TestimonialCard';

interface TestimonialGridProps {
  testimonials: { name: string; quote: string }[];
}

export function TestimonialGrid({ testimonials }: TestimonialGridProps) {
  return (
    <section className="py-[var(--spacing-section)]">
      <Container>
        <StaggerChildren className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <StaggerItem key={i}>
              <TestimonialCard name={t.name} quote={t.quote} />
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Container>
    </section>
  );
}
