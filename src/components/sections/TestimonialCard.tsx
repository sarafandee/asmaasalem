interface TestimonialCardProps {
  name: string;
  quote: string;
}

export function TestimonialCard({ name, quote }: TestimonialCardProps) {
  return (
    <div className="flex flex-col rounded-2xl bg-white p-6 shadow-[var(--shadow-natural)] transition-shadow duration-300 hover:shadow-[var(--shadow-deep)]">
      {/* Quote mark */}
      <span className="mb-3 text-4xl leading-none text-[var(--color-accent)] font-serif">&ldquo;</span>
      <p className="flex-1 text-sm leading-relaxed text-charcoal/80 mb-4">{quote}</p>
      <div className="border-t border-gray/20 pt-4">
        <p className="text-sm font-bold text-charcoal">{name}</p>
      </div>
    </div>
  );
}
