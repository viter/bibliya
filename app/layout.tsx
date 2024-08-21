import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import clsx from 'clsx';
import { Providers } from './providers';

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
      <body className={clsx(inter.className, 'bg-neutral-100 dark:bg-neutral-800')}>
        <Providers>
          <div className="md:w-[800px] lg:w-[1050px] relative md:mx-auto">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
