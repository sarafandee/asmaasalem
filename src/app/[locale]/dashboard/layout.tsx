import { notFound } from 'next/navigation';
import { locales, localeConfig } from '@/lib/i18n/config';
import type { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { requireAuth } from '@/lib/auth';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const typedLocale = locale as Locale;
  const user = await requireAuth(locale);
  const dict = await getDictionary(typedLocale);
  const config = localeConfig[typedLocale];

  const allNavItems = [
    { label: dict.dashboard.overview, href: `/${locale}/dashboard`, icon: '\u2302' },
    { label: dict.dashboard.clients, href: `/${locale}/dashboard/clients`, icon: '\u2603' },
    { label: dict.dashboard.tests, href: `/${locale}/dashboard/tests`, icon: '\u2606' },
    { label: dict.dashboard.knowledge, href: `/${locale}/dashboard/knowledge`, icon: '\u{1F4DA}', adminOnly: true },
    { label: dict.dashboard.users, href: `/${locale}/dashboard/users`, icon: '\u2699', adminOnly: true },
  ];

  // Filter admin-only nav items for non-admin users
  const filteredNavItems = user.role === 'admin'
    ? allNavItems
    : allNavItems.filter((item) => !item.adminOnly);

  const toggleLocale = config.toggleLocale;
  const currentPath = `/${locale}/dashboard`;
  const togglePath = currentPath.replace(`/${locale}/`, `/${toggleLocale}/`);

  return (
    <div className="min-h-screen bg-light-gray">
      <DashboardSidebar
        locale={locale}
        navItems={filteredNavItems}
        backLabel={dict.dashboard.backToSite}
      />

      <div className="ms-64">
        <DashboardHeader
          locale={locale}
          userName={user.name}
          userRole={user.role}
          logoutLabel={dict.auth.logout}
          toggleLocale={{
            name: config.toggleName,
            href: togglePath,
          }}
        />

        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
