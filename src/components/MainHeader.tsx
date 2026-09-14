'use client';

import { cn } from '@/lib/utils';
import localFont from 'next/font/local';
import SearchBtn from './Search/SearchBtn';
import PaletteSwitch from './PaletteSwitch';
import ThemeSwitch from './ThemeSwitch';
import UserMenu from './auth/UserMenu';
import Link from 'next/link';

const evangelieFont = localFont({
  src: '../lib/fonts/Evangelie.ttf',
  variable: '--font-evangelie',
  preload: false,
});

export default function MainHeader() {
  return (
    <header className="md:flex justify-between items-center mb-5">
      <Link href="/">
        <h1
          className={cn(
            evangelieFont.variable,
            'font-evangelie text-foreground text-5xl lg:text-7xl',
          )}
        >
          Святе Письмо
        </h1>
        <h2 className="text-muted-foreground pl-1 mt-1 text-sm lg:text-base mb-5">
          в перекладі о.Івана Хоменка
        </h2>
      </Link>

      <div className="flex items-center justify-between gap-5">
        <SearchBtn />
        <div className="flex items-center gap-2">
          <PaletteSwitch />

          <div className="w-8 h-8 rounded-full p-1 bg-secondary hover:bg-accent hover:cursor-pointer">
            <ThemeSwitch />
          </div>

          <UserMenu />
        </div>
      </div>
    </header>
  );
}
