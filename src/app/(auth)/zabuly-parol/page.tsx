import type { JSX } from 'react';
import type { Metadata } from 'next';
import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm';

export const metadata: Metadata = {
  title: 'Забули пароль — Святе Письмо',
};

export default function ForgotPasswordPage(): JSX.Element {
  return <ForgotPasswordForm />;
}
