import { Container } from '@/components/ui/Container';
import { ScrollReveal } from '@/components/animation/ScrollReveal';
import { StaggerChildren, StaggerItem } from '@/components/animation/StaggerChildren';

interface ServiceCardsProps {
  heading: string;
  services: { title: string; description: string }[];
}

const serviceIcons = [
  // Brain icon — MetaHealth / emotional analysis
  <svg key="brain" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a5 5 0 0 1 5 5c0 1.5-.5 2.5-1.5 3.5S14 12 14 14h-4c0-2-.5-2.5-1.5-3.5S7 8.5 7 7a5 5 0 0 1 5-5z"/><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2v-0"/><path d="M4.93 4.93l-.01-.01"/><path d="M19.07 4.93l.01-.01"/><path d="M2 12h.01"/><path d="M22 12h-.01"/></svg>,
  // Palette icon — Luscher Color Test
  <svg key="palette" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="7" r="1.5" fill="currentColor"/><circle cx="8" cy="11" r="1.5" fill="currentColor"/><circle cx="16" cy="11" r="1.5" fill="currentColor"/><circle cx="10" cy="16" r="1.5" fill="currentColor"/></svg>,
  // Platform/chart icon — Support Platform
  <svg key="platform" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/><path d="M13 15h4"/><path d="M13 12h4"/><path d="M13 18h2"/></svg>,
];

export function ServiceCards({ heading, services }: ServiceCardsProps) {
  return (
    <section className="py-[var(--spacing-section)]">
      <Container>
        <ScrollReveal>
          <h2 className="text-[var(--font-size-lg)] font-bold text-charcoal mb-10 text-center">
            {heading}
          </h2>
        </ScrollReveal>
        <StaggerChildren className="grid gap-8 md:grid-cols-3">
          {services.map((service, i) => (
            <StaggerItem key={i}>
              <div className="group rounded-2xl border-t-2 border-[var(--color-accent)] bg-cream p-8 shadow-[var(--shadow-sm)] transition-all duration-300 hover:shadow-[var(--shadow-md)] hover:-translate-y-1 hover:bg-white">
                {/* Icon */}
                <div className="mb-5 text-[var(--color-accent)]">
                  {serviceIcons[i] || serviceIcons[0]}
                </div>
                <h3 className="mb-3 text-xl font-bold text-charcoal">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-charcoal/70">
                  {service.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Container>
    </section>
  );
}
