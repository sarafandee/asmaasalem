'use client';

import { useEffect, useRef } from 'react';
import { LUSCHER_COLORS, type LuscherColor } from '@/lib/palette';
import { PETALS } from './ColorFlower';

const PETAL = 150;
const BOX = PETAL * 2.84;

/** Degrees per second: idle spin, and the slower spin while someone is exploring. */
const IDLE_SPEED = 4;
const ENGAGED_SPEED = 0.8;

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
const RGB = PETALS.map((p) => hexToRgb(LUSCHER_COLORS[p.color].fill));

/**
 * The hero's four-petal flower, alive under the pointer.
 *
 * Petals nearest the pointer swell and glow while the others soften, a light
 * in their blended colour follows the pointer, and the hero's accent (title
 * highlight, kicker rule, main button) takes the colour of the leading petal.
 * Touch screens have no hover, so a slow virtual pointer circles the flower
 * instead, and a tap sends out a ripple. Under reduced motion it stays still.
 *
 * Everything runs in one rAF loop writing styles directly: no React renders.
 */
export function HeroFlower() {
  const rootRef = useRef<HTMLDivElement>(null);
  const spinRef = useRef<HTMLDivElement>(null);
  const petalRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rippleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const section = root?.closest('section');
    if (!root || !section) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const touch = window.matchMedia('(hover: none)').matches;

    // Pointer, relative to the flower centre, in units of the flower radius.
    let pointer: { x: number; y: number } | null = null;
    // Pointer position inside the section, for the glow.
    let glowPos = { x: 0, y: 0 };
    let rotation = 0;
    let near = 0; // smoothed proximity
    let speed = IDLE_SPEED;
    let leader: LuscherColor | null = null;
    const weights = [0, 0, 0, 0];
    let last = performance.now();
    let raf = 0;

    const locate = (clientX: number, clientY: number) => {
      const r = root.getBoundingClientRect();
      const s = section.getBoundingClientRect();
      const radius = r.width / 2;
      pointer = {
        x: (clientX - (r.left + radius)) / radius,
        y: (clientY - (r.top + r.height / 2)) / radius,
      };
      glowPos = { x: clientX - s.left, y: clientY - s.top };
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') locate(e.clientX, e.clientY);
    };
    const onLeave = () => {
      if (!touch) pointer = null;
    };
    const onDown = (e: PointerEvent) => {
      const ripple = rippleRef.current;
      if (!ripple) return;
      const r = root.getBoundingClientRect();
      const ring = document.createElement('span');
      const lead = PETALS.findIndex((p) => p.color === leader);
      const [cr, cg, cb] = RGB[lead >= 0 ? lead : 0];
      ring.className = 'hero-ripple';
      const scale = r.width / BOX; // the flower is scaled down on small screens
      ring.style.left = `${(e.clientX - r.left) / scale}px`;
      ring.style.top = `${(e.clientY - r.top) / scale}px`;
      ring.style.borderColor = `rgb(${cr} ${cg} ${cb})`;
      ring.addEventListener('animationend', () => ring.remove());
      ripple.appendChild(ring);
    };

    section.addEventListener('pointermove', onMove);
    section.addEventListener('pointerleave', onLeave);
    root.addEventListener('pointerdown', onDown);

    const setLeader = (next: LuscherColor | null) => {
      if (next === leader) return;
      leader = next;
      if (next) {
        const c = LUSCHER_COLORS[next];
        section.style.setProperty('--live-fill', c.fill);
        section.style.setProperty('--live-ink', c.ink);
        section.style.setProperty('--live-on-dark', c.onDark);
      } else {
        section.style.removeProperty('--live-fill');
        section.style.removeProperty('--live-ink');
        section.style.removeProperty('--live-on-dark');
      }
    };

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      if (touch) {
        // A virtual pointer drifting around the flower, so petals take turns.
        const a = now / 1000 / 3.2;
        pointer = { x: Math.cos(a) * 0.8, y: Math.sin(a) * 0.8 };
        const r = root.getBoundingClientRect();
        const s = section.getBoundingClientRect();
        glowPos = {
          x: r.left - s.left + r.width / 2 + (pointer.x * r.width) / 2,
          y: r.top - s.top + r.height / 2 + (pointer.y * r.height) / 2,
        };
      }

      // Proximity: full inside the flower, fading out to three radii away.
      let proximity = 0;
      let pointerAngle = 0;
      if (pointer) {
        const dist = Math.hypot(pointer.x, pointer.y);
        proximity = Math.max(0, Math.min(1, (3 - dist) / 1.9));
        pointerAngle = (Math.atan2(pointer.y, pointer.x) * 180) / Math.PI;
      }

      near += (proximity - near) * Math.min(1, dt * 4);
      const engaged = proximity > 0.05 && !touch;
      speed += ((engaged ? ENGAGED_SPEED : IDLE_SPEED) - speed) * Math.min(1, dt * 2.5);
      rotation = (rotation + speed * dt) % 360;
      if (spinRef.current) spinRef.current.style.transform = `rotate(${rotation}deg)`;

      let best = -1;
      let bestW = 0;
      let total = 0;
      const mix = [0, 0, 0];
      PETALS.forEach((p, i) => {
        // A petal at container rotation r points along r + 45° on screen.
        const diff = ((p.rotate + 45 + rotation - pointerAngle) * Math.PI) / 180;
        const target = proximity * Math.max(0, Math.cos(diff)) ** 2;
        weights[i] += (target - weights[i]) * Math.min(1, dt * 7);
        const w = weights[i];
        if (w > bestW) {
          bestW = w;
          best = i;
        }
        total += w;
        mix[0] += RGB[i][0] * w;
        mix[1] += RGB[i][1] * w;
        mix[2] += RGB[i][2] * w;

        const el = petalRefs.current[i];
        if (el) {
          el.style.transform = `scale(${1 + 0.16 * w})`;
          // Others soften while someone explores; with nobody near, all are full.
          el.style.opacity = String(1 - 0.55 * near + 0.55 * near * Math.min(1, w * 1.6));
          el.style.filter = w > 0.02 ? `brightness(${1 + 0.1 * w}) saturate(${1 + 0.12 * w})` : '';
        }
      });

      const glow = section.querySelector<HTMLElement>('[data-hero-glow]');
      if (glow) {
        const strength = Math.min(1, total);
        if (strength > 0.01) {
          const [r, g, b] = mix.map((v) => Math.round(v / total));
          glow.style.opacity = String(strength);
          glow.style.transform = `translate(${glowPos.x}px, ${glowPos.y}px) translate(-50%, -50%)`;
          glow.style.background = `radial-gradient(circle, rgb(${r} ${g} ${b} / 0.32), transparent 62%)`;
        } else {
          glow.style.opacity = '0';
        }
      }

      setLeader(bestW > 0.35 ? PETALS[best].color : null);
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      section.removeEventListener('pointermove', onMove);
      section.removeEventListener('pointerleave', onLeave);
      root.removeEventListener('pointerdown', onDown);
      setLeader(null);
    };
  }, []);

  return (
    <div ref={rootRef} aria-hidden="true" dir="ltr" className="relative" style={{ width: BOX, height: BOX }}>
      <div ref={spinRef} className="absolute inset-0">
        {PETALS.map((p, i) => (
          <div
            key={p.color}
            className="absolute left-1/2 top-1/2 h-0 w-0"
            style={{ transform: `rotate(${p.rotate}deg)` }}
          >
            <div
              ref={(el) => {
                petalRefs.current[i] = el;
              }}
              className="origin-top-left"
            >
              <div
                className="leaf anim-sway"
                style={{
                  width: PETAL,
                  height: PETAL,
                  animationDelay: `${i * -1.7}s`,
                  backgroundColor: LUSCHER_COLORS[p.color].fill,
                }}
              />
            </div>
          </div>
        ))}
        <div className="absolute left-1/2 top-1/2 h-[22px] w-[22px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-paper" />
      </div>
      <div ref={rippleRef} className="pointer-events-none absolute inset-0" />
    </div>
  );
}
