import type { JSX } from 'react';
import type { Metadata } from 'next';
import { RegisterForm } from '@/components/auth/RegisterForm';

export const metadata: Metadata = {
  title: 'Реєстрація — Святе Письмо',
};

export default function RegisterPage(): JSX.Element {
  return <RegisterForm />;
}
