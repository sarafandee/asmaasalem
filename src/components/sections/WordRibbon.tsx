interface WordRibbonProps {
  words: string[];
}

/** A band of words drifting across the page in the live accent colour. */
export function WordRibbon({ words }: WordRibbonProps) {
  // Four copies so the loop never shows a gap on wide screens.
  const loop = [...words, ...words, ...words, ...words];

  return (
    <div
      aria-hidden="true"
      className="overflow-hidden bg-[var(--live-fill)] py-4 text-[var(--live-ink)] transition-colors duration-700"
    >
      <div
        className="anim-marquee flex w-max gap-12 whitespace-nowrap font-display text-xl font-semibold md:text-[1.4rem]"
        style={{ '--marquee-duration': '30s' } as React.CSSProperties}
      >
        {loop.map((w, i) => (
          <span key={i} className="flex items-center gap-12">
            {w}
            <span className="leaf inline-block h-2.5 w-2.5 bg-current" />
          </span>
        ))}
      </div>
    </div>
  );
}
