'use client';

import { cn } from '@/lib/utils';
import localFont from 'next/font/local';
import SearchBtn from './Search/SearchBtn';
import QuotesBtn from './QuotesBtn';
import PaletteSwitch from './PaletteSwitch';
import ThemeSwitch from './ThemeSwitch';
import UserMenu from './auth/UserMenu';
import HelpBtn from './HelpBtn';
import Link from 'next/link';

const evangelieFont = localFont({
  src: '../lib/fonts/Evangelie.ttf',
  variable: '--font-evangelie',
  preload: false,
});

export default function MainHeader() {
  return (
    <header className="md:flex justify-between items-center mb-2 md:mb-5">
      <Link href="/" className="text-center">
        <h1
          className={cn(
            evangelieFont.variable,
            'font-evangelie text-foreground text-4xl md:text-6xl',
          )}
        >
          Святе Письмо
        </h1>
        <h2 className="text-muted-foreground pl-1 mt-1 text-sm lg:text-base mb-2 md:mb-5">
          в перекладі о.Івана Хоменка
        </h2>
      </Link>

      <div className="flex items-center justify-evenly gap-2">
        <SearchBtn />

        <QuotesBtn />
        <PaletteSwitch />
        <ThemeSwitch />
        <HelpBtn />
        <UserMenu />
      </div>
    </header>
  );
}
