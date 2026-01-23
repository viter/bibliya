import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import type { JSX } from 'react';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Святе Письмо',
  description: 'Святе Письмо у перекладі отця Івана Хоменка',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          inter.className,
          'bg-linear-to-t h-screen bg-fixed from-emerald-200 to-sky-200 dark:from-emerald-950 dark:to-sky-950',
        )}
      >
        <Providers>
          <div className="md:w-200 lg:w-262.5 relative md:mx-auto">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
