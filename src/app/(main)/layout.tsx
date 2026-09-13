import type { JSX } from 'react';
import MainHeader from '@/components/MainHeader';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <>
      <MainHeader />
      {children}
    </>
  );
}
