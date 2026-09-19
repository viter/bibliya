import type { JSX } from 'react';
import type { Metadata } from 'next';
import { LoginForm } from '@/components/auth/LoginForm';
import { safeRedirectPath } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Вхід',
};

interface LoginPageProps {
  searchParams: Promise<{ redirectTo?: string }>;
}

export default async function LoginPage(props: LoginPageProps): Promise<JSX.Element> {
  const { redirectTo } = await props.searchParams;

  return <LoginForm redirectTo={safeRedirectPath(redirectTo)} />;
}
