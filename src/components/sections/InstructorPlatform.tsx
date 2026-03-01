import { Container } from '@/components/ui/Container';
import { StaggerChildren, StaggerItem } from '@/components/animation/StaggerChildren';

interface InstructorPlatformProps {
  phases: { number: number; title: string; description: string }[];
}

export function InstructorPlatform({ phases }: InstructorPlatformProps) {
  return (
    <section className="bg-cream py-[var(--spacing-section)]">
      <Container>
        <StaggerChildren className="grid gap-6 md:grid-cols-2">
          {phases.map((phase) => (
            <StaggerItem key={phase.number}>
              <div className="flex h-full gap-4 rounded-2xl bg-white p-6 shadow-[var(--shadow-sm)] transition-shadow duration-300 hover:shadow-[var(--shadow-md)]">
                {/* Phase number */}
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent)]/80 text-lg font-bold text-white shadow-[var(--shadow-sm)]">
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
