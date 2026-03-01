import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { ScrollReveal } from '@/components/animation/ScrollReveal';
import type { Locale } from '@/lib/i18n/config';

interface CTASectionProps {
  title: string;
  buttonText: string;
  locale: Locale;
}

export function CTASection({ title, buttonText, locale }: CTASectionProps) {
  return (
    <section className="bg-cream py-[var(--spacing-section)]">
      <Container>
        <ScrollReveal>
          <div className="relative mx-auto max-w-3xl overflow-hidden rounded-2xl bg-charcoal p-10 md:p-14 text-center shadow-[var(--shadow-lg)]">
            {/* Decorative accent glow */}
            <div className="absolute -top-20 start-1/2 -translate-x-1/2 w-[400px] h-[200px] rounded-full bg-[var(--color-accent)]/10 blur-3xl" />
            <h2 className="relative text-xl md:text-2xl font-bold text-white mb-8">
              {title}
            </h2>
            <div className="relative">
              <Button href={`/${locale}/contact`} variant="primary" size="large">
                {buttonText}
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
