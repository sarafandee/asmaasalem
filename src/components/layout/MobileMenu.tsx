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
  authButton: { label: string; href: string };
}

export function MobileMenu({
  isOpen,
  onClose,
  navItems,
  languageToggleName,
  toggleHref,
  pathname,
  authButton,
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
          className="fixed inset-0 z-50 bg-charcoal flex flex-col"
        >
          {/* Close button */}
          <div className="flex justify-end p-6">
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white text-3xl leading-none cursor-pointer"
              aria-label="Close menu"
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
                      'text-2xl font-medium transition-colors duration-200',
                      isActive
                        ? 'text-[var(--color-accent)]'
                        : 'text-white/80 hover:text-white'
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
              <Link
                href={toggleHref}
                onClick={onClose}
                className="mt-4 rounded-full border border-white/30 px-6 py-2 text-lg text-white/80 transition-colors duration-200 hover:border-white hover:text-white"
              >
                {languageToggleName}
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (navItems.length + 1) * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={authButton.href}
                onClick={onClose}
                className="mt-2 rounded-full bg-[var(--color-accent)] px-6 py-2 text-lg font-medium text-white transition-opacity duration-200 hover:opacity-90"
              >
                {authButton.label}
              </Link>
            </motion.div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
