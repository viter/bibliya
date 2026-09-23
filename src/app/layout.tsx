import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import type { JSX } from 'react';
import { cn } from '@/lib/utils';
import { PALETTES, DEFAULT_PALETTE, PALETTE_STORAGE_KEY } from '@/lib/palettes';
import { CookieConsent } from '@/components/CookieConsent';
import RootOverlay from '@/components/RootOverlay';
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/site';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

const paletteKeys = JSON.stringify(PALETTES.map((p) => p.key));
const setPaletteScript = `(function(){try{var k=${paletteKeys};var s=localStorage.getItem('${PALETTE_STORAGE_KEY}');document.documentElement.setAttribute('data-palette',k.indexOf(s)!==-1?s:'${DEFAULT_PALETTE}');}catch(e){}})();`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: 'uk_UA',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="uk" suppressHydrationWarning>
      <body className={cn(inter.className, 'h-screen')}>
        <script dangerouslySetInnerHTML={{ __html: setPaletteScript }} />
        <div className="md:max-w-190 lg:max-w-250 xl:max-w-7xl 2xl:max-w-350 relative md:mx-auto px-2 md:px-5">
          <Providers>
            {children}
            <RootOverlay />
          </Providers>
          <CookieConsent />
        </div>
      </body>
    </html>
  );
}
