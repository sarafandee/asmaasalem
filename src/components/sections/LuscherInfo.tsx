import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { ScrollReveal } from '@/components/animation/ScrollReveal';

interface LuscherInfoProps {
  title: string;
  paragraphs: string[];
}

export function LuscherInfo({ title, paragraphs }: LuscherInfoProps) {
  return (
    <section className="bg-sand py-[var(--spacing-section)]">
      <Container>
        <div className="grid gap-8 sm:gap-10 md:grid-cols-2 md:gap-16 items-center">
          <ScrollReveal direction="left">
            <div>
              <div className="mb-4 h-1 w-12 rounded-full bg-[var(--color-accent)]" />
              <h2 className="text-2xl sm:text-[var(--font-size-lg)] font-bold text-charcoal mb-4 sm:mb-6">
                {title}
              </h2>
              <div className="space-y-4">
                {paragraphs.map((p, i) => (
                  <p key={i} className="text-base leading-relaxed text-charcoal/80">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right" delay={0.15}>
            <div className="group max-w-md mx-auto md:mx-0 overflow-hidden rounded-2xl shadow-[var(--shadow-md)]">
              <Image
                src="/images/services/luscher.png"
                alt={title}
                width={408}
                height={600}
                className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.02]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
