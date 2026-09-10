import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import type { JSX } from 'react';
import { cn } from '@/lib/utils';
import { PALETTES, DEFAULT_PALETTE, PALETTE_STORAGE_KEY } from '@/lib/palettes';

const inter = Inter({ subsets: ['latin'] });

const paletteKeys = JSON.stringify(PALETTES.map((p) => p.key));
const setPaletteScript = `(function(){try{var k=${paletteKeys};var s=localStorage.getItem('${PALETTE_STORAGE_KEY}');document.documentElement.setAttribute('data-palette',k.indexOf(s)!==-1?s:'${DEFAULT_PALETTE}');}catch(e){}})();`;

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
      <body className={cn(inter.className, 'h-screen')}>
        <script dangerouslySetInnerHTML={{ __html: setPaletteScript }} />
        <Providers>
          <div className="md:w-190 lg:w-250 xl:w-7xl 2xl:w-350 relative md:mx-auto">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
