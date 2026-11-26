import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { ScrollReveal } from '@/components/animation/ScrollReveal';
import { LUSCHER_COLORS } from '@/lib/palette';

const PHASE_FILLS = [LUSCHER_COLORS.blue, LUSCHER_COLORS.green, LUSCHER_COLORS.red, LUSCHER_COLORS.yellow];

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
    <section className="py-[var(--spacing-section)]">
      <Container className="max-w-[1240px]">
        {/* Intro paragraph */}
        {intro && (
          <ScrollReveal>
            <p className="mx-auto mb-16 max-w-3xl text-center text-lg leading-relaxed text-muted md:text-xl">
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
                <div className={`flex flex-col gap-6 rounded-[32px] border border-line bg-card p-5 sm:gap-8 sm:p-8 md:p-10 lg:flex-row lg:items-center lg:gap-14 ${
                  !isEven ? 'lg:flex-row-reverse' : ''
                }`}>
                  {/* Text content */}
                  <div className="flex-1">
                    {/* Phase badge + title */}
                    <div className="mb-4 flex items-center gap-3">
                      <div
                        className="leaf grid h-14 w-14 flex-shrink-0 place-items-center font-display text-xl font-extrabold"
                        style={{ backgroundColor: PHASE_FILLS[index % PHASE_FILLS.length].fill, color: PHASE_FILLS[index % PHASE_FILLS.length].ink }}
                      >
                        {phase.number}
                      </div>
                      <div>
                        <h2 className="text-xl">{phase.title}</h2>
                        {phase.subtitle && (
                          <p className="font-medium text-[var(--color-accent-text)]">{phase.subtitle}</p>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="mb-5 text-base leading-relaxed text-muted">{phase.description}</p>

                    {/* Sub-items */}
                    {phase.subItems && phase.subItems.length > 0 && (
                      <div className="space-y-3">
                        {phase.subItems.map((item, i) => (
                          <div key={i} className="rounded-[20px] bg-paper p-4 sm:p-5">
                            <h3 className="text-base">{item.title}</h3>
                            <p className="mt-1 text-[0.95rem] leading-relaxed text-muted">{item.description}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Screenshot */}
                  {imageSrc && (
                    <div className="flex-shrink-0 lg:w-[45%]">
                      <div className="overflow-hidden rounded-[20px] border border-line transition-transform duration-700 hover:scale-[1.02]">
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
