'use client';

import { Container } from '@/components/ui/Container';
import { ScrollReveal } from '@/components/animation/ScrollReveal';

const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSfr6LN4Ou5wF9tdhWWp0JE2HF0SsG5HJwkEYVxYtP8aZizpXw/viewform?embedded=true';

export function ContactForm() {
  return (
    <section className="bg-cream py-[var(--spacing-section)]">
      <Container>
        <ScrollReveal>
          <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl bg-white shadow-[var(--shadow-md)]">
            <iframe
              src={GOOGLE_FORM_URL}
              width="100%"
              height="1600"
              className="border-0 h-[1200px] sm:h-[1400px] md:h-[1600px]"
              title="Contact Form"
              loading="lazy"
            >
              Loading…
            </iframe>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
