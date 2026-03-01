import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { ScrollReveal } from '@/components/animation/ScrollReveal';
import type { Locale } from '@/lib/i18n/config';

interface CTASectionProps {
  title: string;
  buttonText: string;
  locale: Locale;
  variant?: 'dark' | 'light';
}

export function CTASection({ title, buttonText, locale, variant = 'dark' }: CTASectionProps) {
  const isDark = variant === 'dark';

  return (
    <section
      className={isDark ? 'bg-charcoal py-[var(--spacing-section-sm)]' : 'bg-light-gray py-[var(--spacing-section-sm)]'}
    >
      <Container>
        <ScrollReveal>
          <div className="text-center">
            <h2
              className={`text-[var(--font-size-lg)] font-bold mb-8 ${isDark ? 'text-white' : 'text-charcoal'}`}
            >
              {title}
            </h2>
            <Button href={`/${locale}/contact`} variant="primary" size="large">
              {buttonText}
            </Button>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
