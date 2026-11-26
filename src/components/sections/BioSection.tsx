import Image from 'next/image';
import { ScrollReveal } from '@/components/animation/ScrollReveal';

interface BioSectionProps {
  quote: string;
  paragraphs: string[];
}

export function BioSection({ quote, paragraphs }: BioSectionProps) {
  return (
    <section className="bg-paper-deep">
      <div className="mx-auto grid max-w-[1240px] items-center gap-12 px-5 py-[var(--spacing-section)] sm:px-8 md:grid-cols-[1fr_1.3fr] md:gap-20">
        <ScrollReveal>
          <div className="grid place-items-center">
            <Image
              src="/images/about/profile.png"
              alt=""
              width={380}
              height={380}
              className="anim-float aspect-square w-full max-w-[360px] rounded-full object-cover mix-blend-multiply"
              sizes="(max-width: 768px) 70vw, 360px"
            />
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <div className="flex flex-col gap-6">
            <h2 className="text-[clamp(1.7rem,3vw,2.5rem)] font-semibold leading-snug">“{quote}”</h2>
            {paragraphs.map((p, i) => (
              <p key={i} className="text-muted">
                {p}
              </p>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
