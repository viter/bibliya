import type { JSX } from 'react';
import type { Metadata } from 'next';
import { ResetPasswordForm } from '@/components/auth/ResetPasswordForm';

export const metadata: Metadata = {
  title: 'Скинути пароль',
};

interface ResetPasswordPageProps {
  searchParams: Promise<{ token?: string }>;
}

export default async function ResetPasswordPage(
  props: ResetPasswordPageProps,
): Promise<JSX.Element> {
  const { token } = await props.searchParams;

  return <ResetPasswordForm token={token} />;
}
