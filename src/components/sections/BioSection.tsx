import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { ScrollReveal } from '@/components/animation/ScrollReveal';

interface BioSectionProps {
  quote: string;
  paragraphs: string[];
}

export function BioSection({ quote, paragraphs }: BioSectionProps) {
  return (
    <section className="py-[var(--spacing-section)]">
      <Container>
        <div className="grid gap-10 md:grid-cols-2 md:gap-16 items-start">
          <ScrollReveal direction="left">
            <div className="relative aspect-[3/4] max-w-sm mx-auto md:mx-0 overflow-hidden rounded-2xl">
              <Image
                src="/images/about/profile.png"
                alt="Asmaa Salem"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right" delay={0.15}>
            <div>
              {/* Quote */}
              <blockquote className="mb-8 border-s-4 border-[var(--color-accent)] ps-6 text-lg italic text-charcoal/80">
                {quote}
              </blockquote>
              {/* Bio paragraphs */}
              <div className="space-y-4">
                {paragraphs.map((p, i) => (
                  <p key={i} className="text-base leading-relaxed text-charcoal/80">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
