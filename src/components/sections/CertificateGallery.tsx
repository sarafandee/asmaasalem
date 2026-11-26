'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { Lightbox } from '@/components/ui/Lightbox';
import { StaggerChildren, StaggerItem } from '@/components/animation/StaggerChildren';
import { LUSCHER_COLORS } from '@/lib/palette';

const LEAF_FILLS = Object.values(LUSCHER_COLORS).map((c) => c.fill);

/** Scan dimensions, so each thumbnail keeps its real shape (some are portrait). */
const SCAN_SIZES: Record<string, { w: number; h: number }> = {
  '/images/certificates/cert-1.jpg': { w: 722, h: 1024 },
  '/images/certificates/cert-2.jpg': { w: 724, h: 1024 },
  '/images/certificates/cert-3.jpg': { w: 1024, h: 724 },
  '/images/certificates/cert-4.jpg': { w: 1024, h: 724 },
  '/images/certificates/cert-5.jpg': { w: 1024, h: 724 },
};

interface Credential {
  title: string;
  institution: string;
  description: string;
  /** Scans of this credential's certificate; empty when there is none to show. */
  images: string[];
  /** What the programme covered, shown as a list. */
  expertise?: string[];
  /** A short side remark, e.g. how the certificate is granted. */
  note?: string;
}

interface CertificateGalleryProps {
  credentials: Credential[];
  viewLabel: string;
}

/**
 * Credentials as cards. A card whose certificate was scanned shows the scan as
 * a thumbnail beside the text (above it on phones); clicking opens it full size.
 */
export function CertificateGallery({ credentials, viewLabel }: CertificateGalleryProps) {
  // One lightbox sequence across every scan, in card order.
  const scans = credentials.flatMap((cred) => cred.images.map((src) => ({ src, alt: cred.title })));

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openScan = useCallback(
    (src: string) => {
      setCurrentIndex(Math.max(0, scans.findIndex((s) => s.src === src)));
      setLightboxOpen(true);
    },
    [scans]
  );
  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? scans.length - 1 : prev - 1));
  }, [scans.length]);
  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === scans.length - 1 ? 0 : prev + 1));
  }, [scans.length]);

  return (
    <section>
      <div className="mx-auto max-w-[1240px] px-5 py-[var(--spacing-section)] sm:px-8">
        <StaggerChildren className="grid gap-5 md:grid-cols-2">
          {credentials.map((cred, i) => {
            const hasScan = cred.images.length > 0;
            return (
              <StaggerItem key={i} className="h-full">
                <article
                  className={clsx(
                    'lift flex h-full flex-col gap-6 rounded-[28px] border border-line bg-card p-7',
                    hasScan && 'sm:flex-row sm:items-start'
                  )}
                >
                  {hasScan && (
                    <div className="flex shrink-0 items-start gap-3 sm:w-[150px] sm:flex-col">
                      {cred.images.map((src) => {
                        const size = SCAN_SIZES[src] ?? { w: 1024, h: 724 };
                        return (
                          <button
                            key={src}
                            type="button"
                            onClick={() => openScan(src)}
                            aria-label={`${viewLabel}: ${cred.title}`}
                            className="group relative block w-[132px] max-w-full cursor-zoom-in overflow-hidden rounded-xl border border-line bg-paper shadow-[var(--shadow-natural)] transition-transform duration-500 hover:-translate-y-1 hover:rotate-[-1.5deg] sm:w-full"
                          >
                            <Image
                              src={src}
                              alt=""
                              width={size.w}
                              height={size.h}
                              sizes="150px"
                              className="h-auto w-full transition-transform duration-500 group-hover:scale-105"
                            />
                            <span className="absolute inset-0 flex items-center justify-center bg-ink/0 transition-colors duration-300 group-hover:bg-ink/25">
                              <svg
                                aria-hidden="true"
                                className="h-7 w-7 text-paper opacity-0 transition-opacity duration-300 group-hover:opacity-90"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                              >
                                <circle cx="11" cy="11" r="8" />
                                <path d="m21 21-4.35-4.35" />
                                <path d="M11 8v6" />
                                <path d="M8 11h6" />
                              </svg>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  <div className="flex gap-5">
                    {!hasScan && (
                      <span
                        aria-hidden="true"
                        className="leaf leaf-turn mt-1 h-7 w-7 flex-shrink-0"
                        style={{ backgroundColor: LEAF_FILLS[i % LEAF_FILLS.length] }}
                      />
                    )}
                    <div>
                      <h3 className="text-lg">{cred.title}</h3>
                      {cred.institution && (
                        <p className="mt-1 text-[0.95rem] font-medium text-[var(--color-accent-text)]">
                          {cred.institution}
                        </p>
                      )}
                      {cred.description && (
                        <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{cred.description}</p>
                      )}
                      {cred.expertise && cred.expertise.length > 0 && (
                        <ul className="mt-3 flex flex-col gap-2 text-[0.95rem] leading-relaxed text-muted">
                          {cred.expertise.map((item, j) => (
                            <li key={j} className="flex gap-2.5">
                              <span
                                aria-hidden="true"
                                className="leaf mt-[0.6em] h-2 w-2 flex-shrink-0"
                                style={{ backgroundColor: LEAF_FILLS[j % LEAF_FILLS.length] }}
                              />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      {cred.note && (
                        <p className="mt-3 border-s-2 border-[var(--color-accent)] ps-3 text-[0.9rem] leading-relaxed text-muted">
                          {cred.note}
                        </p>
                      )}
                    </div>
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </StaggerChildren>
      </div>

      <Lightbox
        images={scans}
        currentIndex={currentIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </section>
  );
}
