import type { JSX } from 'react';
import Link from 'next/link';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <div className="flex min-h-[calc(100dvh-2rem)] items-center justify-center">
      <div className="w-full max-w-sm">
        <Link href="/" className="block text-center mb-8">
          <h1 className="text-foreground text-3xl font-semibold">Святе Письмо</h1>
        </Link>
        {children}
      </div>
    </div>
  );
}
