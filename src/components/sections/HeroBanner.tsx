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
    <section className="relative overflow-hidden bg-charcoal">
      {/* Banner image */}
      <div className="relative w-full">
        <Image
          src="/images/hero/final_banner.png"
          alt={title}
          width={3000}
          height={1500}
          className="w-full h-auto"
          priority
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
      </div>

      {/* Text overlay */}
      <div className="absolute inset-0 flex items-end pb-12 md:pb-16">
        <Container>
          <div className="max-w-2xl">
            <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl leading-tight mb-4">
              {title}
            </h1>
            <p className="text-base text-white/80 md:text-lg mb-6 leading-relaxed">
              {subtitle}
            </p>
            <Button href={`/${locale}/contact`} variant="primary" size="large">
              {ctaText}
            </Button>
          </div>
        </Container>
      </div>
    </section>
  );
}
