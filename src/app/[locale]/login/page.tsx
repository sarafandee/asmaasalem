import type { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { LoginForm } from '@/components/auth/LoginForm';

export default async function LoginPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { locale } = await params;
  const { callbackUrl } = await searchParams;
  const dict = await getDictionary(locale as Locale);

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-white p-8 shadow-[var(--shadow-lg)]">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-charcoal">
              {dict.auth.loginTitle}
            </h1>
            <p className="mt-2 text-sm text-gray">
              {dict.auth.loginSubtitle}
            </p>
          </div>

          <LoginForm
            locale={locale}
            labels={{
              email: dict.auth.email,
              password: dict.auth.password,
              submit: dict.auth.loginButton,
              error: dict.auth.invalidCredentials,
            }}
            callbackUrl={callbackUrl}
          />
        </div>
      </div>
    </div>
  );
}
