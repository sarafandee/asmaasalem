'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

interface NavItem {
  label: string;
  href: string;
  icon: string;
}

interface DashboardSidebarProps {
  locale: string;
  navItems: NavItem[];
  backLabel: string;
}

export function DashboardSidebar({ locale, navItems, backLabel }: DashboardSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 start-0 z-30 flex w-64 flex-col border-e border-sand bg-cream">
      {/* Logo / Brand */}
      <div className="flex h-16 items-center px-6 border-b border-sand">
        <Link href={`/${locale}/dashboard`} className="text-lg font-bold text-charcoal">
          Luscher<span className="text-[var(--color-accent)]">Test</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== `/${locale}/dashboard` && pathname.startsWith(item.href));

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={clsx(
                    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-[var(--color-accent)]/10 text-[var(--color-accent)]'
                      : 'text-warm-gray hover:bg-sand hover:text-charcoal'
                  )}
                >
                  <span className="text-base">{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Back to site */}
      <div className="border-t border-sand px-3 py-4">
        <Link
          href={`/${locale}`}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-warm-gray transition-colors hover:bg-sand hover:text-charcoal"
        >
          <span className="text-base">&#8592;</span>
          {backLabel}
        </Link>
      </div>
    </aside>
  );
}
