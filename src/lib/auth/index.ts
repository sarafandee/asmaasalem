import { redirect } from 'next/navigation';
import { auth } from './config';

export { auth, signIn, signOut } from './config';

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  locale: 'ar' | 'en';
};

export async function getSessionUser(): Promise<SessionUser | null> {
  const session = await auth();
  if (!session?.user) return null;
  return session.user as SessionUser;
}

export async function requireAuth(locale: string = 'ar'): Promise<SessionUser> {
  const user = await getSessionUser();
  if (!user) redirect(`/${locale}/login`);
  return user;
}

export async function requireAdmin(locale: string = 'ar'): Promise<SessionUser> {
  const user = await requireAuth(locale);
  if (user.role !== 'admin') redirect(`/${locale}`);
  return user;
}
