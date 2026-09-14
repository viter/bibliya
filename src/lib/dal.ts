import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';

/**
 * Redirects to /uviyty (preserving the way back) unless a session exists.
 * Call at the top of any Server Component page that should be protected.
 */
export async function requireSession(redirectTo: string) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect(`/uviyty?redirectTo=${encodeURIComponent(redirectTo)}`);
  }

  return session;
}
