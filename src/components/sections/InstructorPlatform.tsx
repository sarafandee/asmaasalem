import { Container } from '@/components/ui/Container';
import { ScrollReveal } from '@/components/animation/ScrollReveal';
import { StaggerChildren, StaggerItem } from '@/components/animation/StaggerChildren';

interface InstructorPlatformProps {
  title: string;
  description: string;
  phases: { number: number; title: string; description: string }[];
}

export function InstructorPlatform({ title, description, phases }: InstructorPlatformProps) {
  return (
    <section className="py-[var(--spacing-section)]">
      <Container>
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-[var(--font-size-lg)] font-bold text-charcoal mb-4">
              {title}
            </h2>
            <p className="text-base text-charcoal/70 max-w-2xl mx-auto leading-relaxed">
              {description}
            </p>
          </div>
        </ScrollReveal>

        <StaggerChildren className="grid gap-6 md:grid-cols-2">
          {phases.map((phase) => (
            <StaggerItem key={phase.number}>
              <div className="flex gap-4 rounded-2xl bg-white p-6 shadow-[var(--shadow-natural)] transition-shadow duration-300 hover:shadow-[var(--shadow-deep)]">
                {/* Phase number */}
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)] text-lg font-bold text-white">
                  {phase.number}
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-bold text-charcoal">{phase.title}</h3>
                  <p className="text-sm leading-relaxed text-charcoal/70">{phase.description}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Container>
    </section>
  );
}
