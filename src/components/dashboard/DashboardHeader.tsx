'use client';

import { signOut } from 'next-auth/react';
import Link from 'next/link';

interface DashboardHeaderProps {
  locale: string;
  userName: string;
  userRole: string;
  logoutLabel: string;
  toggleLocale: { name: string; href: string };
}

export function DashboardHeader({
  locale,
  userName,
  userRole,
  logoutLabel,
  toggleLocale,
}: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-sand bg-white/80 px-6 backdrop-blur-sm">
      <div className="text-sm text-warm-gray">
        <span className="font-medium text-charcoal">{userName}</span>
        <span className="mx-2 text-gray">|</span>
        <span className="capitalize">{userRole}</span>
      </div>

      <div className="flex items-center gap-4">
        <Link
          href={toggleLocale.href}
          className="text-sm font-medium text-warm-gray transition-colors hover:text-[var(--color-accent)]"
        >
          {toggleLocale.name}
        </Link>

        <button
          onClick={() => signOut({ callbackUrl: `/${locale}/login` })}
          className="rounded-full border border-sand px-4 py-1.5 text-sm font-medium text-warm-gray transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600"
        >
          {logoutLabel}
        </button>
      </div>
    </header>
  );
}
