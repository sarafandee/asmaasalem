import { ScrollReveal } from '@/components/animation/ScrollReveal';

interface LuscherInfoProps {
  tag: string;
  title: string;
  paragraphs: string[];
  yearsLabel: string;
  revealsTitle: string;
  dimensions: string[];
}

/** The eight colours of the full Lüscher test, as floating bars. */
const EIGHT = [
  { fill: '#1d3b8f', h: 190 },
  { fill: '#2f7a5a', h: 150 },
  { fill: '#e0452f', h: 176 },
  { fill: '#f2c230', h: 132 },
  { fill: '#7a3e96', h: 164 },
  { fill: '#7b4a2a', h: 120 },
  { fill: '#0e0e10', h: 144 },
  { fill: '#8c8c8c', h: 108 },
];

export function LuscherInfo({ tag, title, paragraphs, yearsLabel, revealsTitle, dimensions }: LuscherInfoProps) {
  const [lead, ...rest] = paragraphs;

  return (
    <section className="overflow-hidden bg-navy text-paper">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-16 px-5 py-[var(--spacing-section)] sm:px-8">
        <ScrollReveal>
          <div className="grid items-end gap-12 lg:grid-cols-[1.3fr_1fr]">
            <div className="flex flex-col gap-6">
              <span className="eyebrow text-[#9db6ff]">02 — {tag}</span>
              <h2 className="text-[clamp(2.1rem,4vw,3.4rem)]">{title}</h2>
              {lead && <p className="text-lg text-paper/90 md:text-xl">{lead}</p>}
            </div>
            <div className="flex items-baseline gap-5">
              <span dir="ltr" className="font-display text-[clamp(5.5rem,11vw,10rem)] font-extrabold leading-none text-lu-yellow">
                70+
              </span>
              <span className="max-w-[14em] text-base text-paper/80">{yearsLabel}</span>
            </div>
          </div>
        </ScrollReveal>

        <div aria-hidden="true" className="grid h-[200px] grid-cols-8 items-end gap-2.5 sm:gap-4">
          {EIGHT.map((c, i) => (
            <div
              key={c.fill}
              className="anim-float rounded-full border border-paper/20"
              style={{ height: c.h, backgroundColor: c.fill, animationDelay: `${i * -0.7}s` }}
            />
          ))}
        </div>

        <ScrollReveal>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col gap-5 text-paper/85">
              {rest.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="flex flex-col gap-5">
              <h3 className="text-xl">{revealsTitle}</h3>
              <ul className="flex flex-wrap gap-2.5">
                {dimensions.map((d) => (
                  <li
                    key={d}
                    className="rounded-full border border-paper/30 px-4 py-2 text-[0.95rem] transition-colors duration-300 hover:border-paper hover:bg-paper hover:text-navy"
                  >
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
