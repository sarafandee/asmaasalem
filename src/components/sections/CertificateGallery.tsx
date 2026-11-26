'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { Lightbox } from '@/components/ui/Lightbox';
import { ScrollReveal } from '@/components/animation/ScrollReveal';
import { StaggerChildren, StaggerItem } from '@/components/animation/StaggerChildren';
import { LUSCHER_COLORS } from '@/lib/palette';

const LEAF_FILLS = Object.values(LUSCHER_COLORS).map((c) => c.fill);

interface CertificateGalleryProps {
  credentials: { title: string; institution: string; description: string }[];
}

const certificateImages = [
  { src: '/images/certificates/cert-1.jpg', alt: 'MTN Masters Certificate' },
  { src: '/images/certificates/cert-2.jpg', alt: 'Luscher Certified Certificate' },
  { src: '/images/certificates/cert-3.jpg', alt: 'Holistic Healing Master Certificate' },
  { src: '/images/certificates/cert-4.jpg', alt: 'Life Coach Certificate' },
  { src: '/images/certificates/cert-5.jpg', alt: 'Mental Health Certificate' },
];

export function CertificateGallery({ credentials }: CertificateGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = useCallback((index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? certificateImages.length - 1 : prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === certificateImages.length - 1 ? 0 : prev + 1));
  }, []);

  return (
    <section>
      <div className="mx-auto max-w-[1240px] px-5 py-[var(--spacing-section)] sm:px-8">
        {/* Credentials list with accent dots */}
        <ScrollReveal>
          <div className="mb-16 grid gap-5 md:grid-cols-2">
            {credentials.map((cred, i) => (
              <div key={i} className="lift flex gap-5 rounded-[28px] border border-line bg-card p-7">
                <span
                  aria-hidden="true"
                  className="leaf leaf-turn mt-1 h-7 w-7 flex-shrink-0"
                  style={{ backgroundColor: LEAF_FILLS[i % LEAF_FILLS.length] }}
                />
                <div>
                  <h3 className="text-lg">{cred.title}</h3>
                  {cred.institution && (
                    <p className="mt-1 text-[0.95rem] font-medium text-[var(--color-accent-text)]">{cred.institution}</p>
                  )}
                  {cred.description && (
                    <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{cred.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Certificate images */}
        <StaggerChildren className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {certificateImages.map((img, i) => (
            <StaggerItem key={i}>
              <button
                onClick={() => openLightbox(i)}
                className="group relative aspect-[3/4] w-full cursor-zoom-in overflow-hidden rounded-[20px] border border-line bg-card transition-transform duration-500 hover:-translate-y-2"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
                <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/20 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-80" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><path d="M11 8v6"/><path d="M8 11h6"/></svg>
                </div>
              </button>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>

      <Lightbox
        images={certificateImages}
        currentIndex={currentIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </section>
  );
}
