import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { ScrollReveal } from '@/components/animation/ScrollReveal';

interface LuscherInfoProps {
  title: string;
  paragraphs: string[];
}

export function LuscherInfo({ title, paragraphs }: LuscherInfoProps) {
  return (
    <section className="bg-light-gray py-[var(--spacing-section)]">
      <Container>
        <div className="grid gap-10 md:grid-cols-2 md:gap-16 items-center">
          <ScrollReveal direction="left">
            <div>
              <h2 className="text-[var(--font-size-lg)] font-bold text-charcoal mb-6">
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
            <div className="relative aspect-[4/3] max-w-md mx-auto md:mx-0 overflow-hidden rounded-2xl">
              <Image
                src="/images/services/luscher.png"
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
