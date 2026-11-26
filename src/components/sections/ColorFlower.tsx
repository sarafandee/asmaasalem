import clsx from 'clsx';
import { LUSCHER_COLORS, type LuscherColor } from '@/lib/palette';

/** Petal order around the flower, matching the four leaves of the logo. */
const PETALS: { color: LuscherColor; rotate: number }[] = [
  { color: 'red', rotate: -135 },
  { color: 'green', rotate: -45 },
  { color: 'yellow', rotate: 45 },
  { color: 'blue', rotate: 135 },
];

interface ColorFlowerProps {
  /** Petal edge length in px; the flower box is 2.84× that (petal diagonal × 2). */
  petal: number;
  /** Petal that stays fully opaque while the others fade. */
  highlight?: LuscherColor | null;
  /** Draw petals as outlines in the current text colour instead of filled. */
  outline?: boolean;
  /** Petals sway individually. */
  sway?: boolean;
  className?: string;
}

/**
 * Four leaf-shaped petals in the Lüscher colours, meeting at one point.
 * Purely decorative: always aria-hidden.
 */
export function ColorFlower({ petal, highlight, outline, sway = true, className }: ColorFlowerProps) {
  return (
    // dir="ltr": each petal hangs from a zero-width anchor, which would overflow leftwards in RTL.
    <div aria-hidden="true" dir="ltr" className={clsx('relative', className)} style={{ width: petal * 2.84, height: petal * 2.84 }}>
      {PETALS.map((p, i) => (
        <div
          key={p.color}
          className="absolute left-1/2 top-1/2 h-0 w-0"
          style={{ transform: `rotate(${p.rotate}deg)` }}
        >
          <div
            className={clsx('leaf transition-opacity duration-700', sway && 'anim-sway')}
            style={{
              width: petal,
              height: petal,
              animationDelay: `${i * -1.7}s`,
              ...(outline
                ? { border: '2px solid currentColor', opacity: 0.22, boxSizing: 'border-box' }
                : {
                    backgroundColor: LUSCHER_COLORS[p.color].fill,
                    opacity: highlight && highlight !== p.color ? 0.22 : 1,
                  }),
            }}
          />
        </div>
      ))}
      {!outline && (
        <div className="absolute left-1/2 top-1/2 h-[22px] w-[22px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-paper" />
      )}
    </div>
  );
}
