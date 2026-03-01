'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { Lightbox } from '@/components/ui/Lightbox';
import { Container } from '@/components/ui/Container';
import { StaggerChildren, StaggerItem } from '@/components/animation/StaggerChildren';

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
    <section className="bg-light-gray py-[var(--spacing-section)]">
      <Container>
        {/* Credentials list */}
        <div className="mb-12 space-y-6">
          {credentials.map((cred, i) => (
            <div key={i} className="rounded-xl bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-charcoal mb-1">{cred.title}</h3>
              <p className="text-sm font-medium text-[var(--color-accent)] mb-2">{cred.institution}</p>
              <p className="text-sm text-charcoal/70 leading-relaxed">{cred.description}</p>
            </div>
          ))}
        </div>

        {/* Certificate images grid */}
        <StaggerChildren className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {certificateImages.map((img, i) => (
            <StaggerItem key={i}>
              <button
                onClick={() => openLightbox(i)}
                className="group relative aspect-[3/4] w-full overflow-hidden rounded-xl cursor-pointer"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
              </button>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Container>

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
