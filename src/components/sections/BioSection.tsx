import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { ScrollReveal } from '@/components/animation/ScrollReveal';

interface BioSectionProps {
  quote: string;
  paragraphs: string[];
}

export function BioSection({ quote, paragraphs }: BioSectionProps) {
  return (
    <section className="bg-cream py-[var(--spacing-section)]">
      <Container narrow>
        <ScrollReveal>
          {/* Profile image — centered with accent ring */}
          <div className="relative mx-auto mb-8 w-48 h-48 md:w-56 md:h-56 overflow-hidden rounded-full ring-4 ring-[var(--color-accent)]/20 ring-offset-4 ring-offset-cream">
            <Image
              src="/images/about/profile.png"
              alt="Asmaa Salem"
              fill
              className="object-cover"
              sizes="224px"
            />
          </div>

          {/* Quote with accent border */}
          <div className="border-s-4 border-[var(--color-accent)] ps-6 mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-charcoal">
              {quote}
            </h2>
          </div>

          {/* Bio paragraphs */}
          <div className="space-y-4">
            {paragraphs.map((p, i) => (
              <p key={i} className="text-base leading-relaxed text-charcoal/80">
                {p}
              </p>
            ))}
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
