import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { ScrollReveal } from '@/components/animation/ScrollReveal';

interface SubItem {
  title: string;
  description: string;
}

interface Phase {
  number: number;
  title: string;
  subtitle?: string;
  description: string;
  subItems?: SubItem[];
  image?: string;
}

interface InstructorPlatformProps {
  intro?: string;
  phases: Phase[];
}

/** Maps phase number to a screenshot image path */
const PHASE_IMAGES: Record<number, string> = {
  1: '/images/instructors/color-selection.png',
  2: '/images/instructors/luscher-page.png',
  3: '/images/instructors/color-analysis-1.png',
  4: '/images/instructors/color-analysis-2.png',
};

export function InstructorPlatform({ intro, phases }: InstructorPlatformProps) {
  return (
    <section className="bg-cream py-[var(--spacing-section)]">
      <Container>
        {/* Intro paragraph */}
        {intro && (
          <ScrollReveal>
            <p className="mx-auto mb-12 max-w-3xl text-center text-base leading-relaxed text-charcoal/80">
              {intro}
            </p>
          </ScrollReveal>
        )}

        {/* Phases */}
        <div className="space-y-12">
          {phases.map((phase, index) => {
            const isEven = index % 2 === 0;
            const imageSrc = phase.image || PHASE_IMAGES[phase.number];

            return (
              <ScrollReveal key={phase.number}>
                <div className={`flex flex-col gap-6 rounded-2xl bg-white p-4 shadow-[var(--shadow-sm)] sm:gap-8 sm:p-6 md:p-8 lg:flex-row lg:items-center lg:gap-12 ${
                  !isEven ? 'lg:flex-row-reverse' : ''
                }`}>
                  {/* Text content */}
                  <div className="flex-1">
                    {/* Phase badge + title */}
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent)]/80 text-sm font-bold text-white shadow-[var(--shadow-sm)]">
                        {phase.number}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-charcoal">{phase.title}</h3>
                        {phase.subtitle && (
                          <p className="text-sm font-medium text-[var(--color-accent)]">{phase.subtitle}</p>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="mb-4 text-sm leading-relaxed text-charcoal/70">{phase.description}</p>

                    {/* Sub-items */}
                    {phase.subItems && phase.subItems.length > 0 && (
                      <div className="space-y-3 border-s-2 border-[var(--color-accent)]/20 ps-4">
                        {phase.subItems.map((item, i) => (
                          <div key={i}>
                            <h4 className="text-sm font-bold text-charcoal">{item.title}</h4>
                            <p className="mt-0.5 text-xs sm:text-sm leading-relaxed text-charcoal/60">{item.description}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Screenshot */}
                  {imageSrc && (
                    <div className="flex-shrink-0 lg:w-[45%]">
                      <div className="overflow-hidden rounded-xl border border-sand shadow-[var(--shadow-sm)]">
                        <Image
                          src={imageSrc}
                          alt={phase.subtitle || phase.title}
                          width={600}
                          height={500}
                          className="w-full object-contain"
                          sizes="(max-width: 1024px) 100vw, 45vw"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
