'use client';

import KnyhaCardSZ from './KnyhaCardSZ';
import KnyhaCardNZ from './KnyhaCardNZ';
import clsx from 'clsx';
import localFont from 'next/font/local';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import ThemeSwitch from './ThemeSwitch';

const evangelieFont = localFont({
  src: '../lib/fonts/Evangelie.ttf',
  variable: '--font-evangelie',
});

export default function KnyhyContents() {
  return (
    <>
      <header className="flex justify-between items-center mb-10 px-8 xl:px-0">
        <div>
          <h1
            className={clsx(
              evangelieFont.variable,
              'font-evangelie text-neutral-600 dark:text-neutral-300 text-5xl lg:text-7xl',
            )}
          >
            Святе Письмо
          </h1>
          <h2 className="text-gray-700 dark:text-gray-400 pl-2 mt-1 text-sm lg:text-base">
            в перекладі о.Івана Хоменка
          </h2>
        </div>
        <div className="w-8 h-8 rounded-full p-1 bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-600 dark:hover:bg-neutral-500 hover:cursor-pointer">
          <ThemeSwitch />
        </div>
      </header>
      <div className="md:flex md:justify-evenly md:gap-10 xl:justify-between content-center">
        <KnyhaCardSZ />
        <KnyhaCardNZ />
      </div>
    </>
  );
}
