'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: { label: string; href: string }[];
  languageToggleName: string;
  toggleHref: string;
  pathname: string;
  ctaText: string;
  ctaHref: string;
  closeLabel: string;
}

export function MobileMenu({
  isOpen,
  onClose,
  navItems,
  languageToggleName,
  toggleHref,
  pathname,
  ctaText,
  ctaHref,
  closeLabel,
}: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-paper text-ink"
        >
          {/* Close button */}
          <div className="flex justify-end p-6">
            <button
              onClick={onClose}
              className="grid h-11 w-11 cursor-pointer place-items-center text-3xl leading-none text-muted hover:text-ink"
              aria-label={closeLabel}
            >
              &times;
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex flex-1 flex-col items-center justify-center gap-6">
            {navItems.map((item, i) => {
              const isActive = pathname === item.href;
              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={clsx(
                      'font-display text-2xl font-semibold transition-colors duration-200 sm:text-3xl',
                      isActive ? 'text-navy mark' : 'text-muted hover:text-ink'
                    )}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              );
            })}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navItems.length * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href={toggleHref}
                  onClick={onClose}
                  className="inline-flex h-12 items-center rounded-full border border-line px-6 text-lg text-ink transition-colors duration-200 hover:border-ink"
                >
                  {languageToggleName}
                </Link>
                <Link
                  href={ctaHref}
                  onClick={onClose}
                  className="pill h-12 bg-navy px-6 text-lg text-paper"
                >
                  {ctaText}
                </Link>
              </div>
            </motion.div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
