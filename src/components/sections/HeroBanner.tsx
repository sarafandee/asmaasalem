import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import type { Locale } from '@/lib/i18n/config';

interface HeroBannerProps {
  title: string;
  subtitle: string;
  ctaText: string;
  locale: Locale;
}

export function HeroBanner({ title, subtitle, ctaText, locale }: HeroBannerProps) {
  return (
    <section className="relative overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/hero/hero-bg.jpg"
        alt="Asmaa Salem life coaching session background"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />

      <Container className="relative z-10">
        <div className="grid items-center gap-8 py-12 sm:py-16 md:grid-cols-2 md:gap-12 md:py-20 lg:py-28">
          {/* Text side */}
          <div>
            <h1 className="text-2xl font-bold text-white md:text-3xl lg:text-4xl leading-tight mb-4">
              {title}
            </h1>
            <p className="text-base text-white/80 md:text-lg mb-6 leading-relaxed">
              {subtitle}
            </p>
            <Button href={`/${locale}/contact`} variant="primary" size="large">
              {ctaText}
            </Button>
          </div>

          {/* Image side */}
          <div className="relative mx-auto w-full max-w-md md:max-w-none">
            <Image
              src="/images/hero/final_banner.png"
              alt={title}
              width={1024}
              height={1024}
              className="rounded-2xl"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
