'use client';

import KnyhaCardSZ from './KnyhaCardSZ';
import KnyhaCardNZ from './KnyhaCardNZ';
import clsx from 'clsx';
import localFont from 'next/font/local';
import { useState } from 'react';
import ThemeSwitch from './ThemeSwitch';
import PaletteSwitch from './PaletteSwitch';
import SearchDialog from './SearchDialog';

const evangelieFont = localFont({
  src: '../lib/fonts/Evangelie.ttf',
  variable: '--font-evangelie',
});

export default function KnyhyContents() {
  const [showSearchDialog, setShowSearchDialog] = useState(false);

  function handleCloseDialog() {
    setShowSearchDialog(false);
  }
  return (
    <div className="p-3">
      <SearchDialog showDialog={showSearchDialog} onClose={handleCloseDialog} />
      <header className="md:flex justify-between items-center mb-10 px-8 xl:px-0">
        <div>
          <h1
            className={clsx(
              evangelieFont.variable,
              'font-evangelie text-foreground text-5xl lg:text-7xl',
            )}
          >
            Святе Письмо
          </h1>
          <h2 className="text-muted-foreground pl-2 mt-1 text-sm lg:text-base mb-5">
            в перекладі о.Івана Хоменка
          </h2>
        </div>
        <div className="flex items-center gap-5">
          {/*<SearchBtn click={handleSearchClick} />*/}
          <div className="flex items-center gap-1">
            <PaletteSwitch />
            <div className="w-8 h-8 rounded-full p-1 bg-secondary hover:bg-accent hover:cursor-pointer">
              <ThemeSwitch />
            </div>
          </div>
        </div>
      </header>
      <div className="md:flex md:justify-evenly md:gap-10 xl:justify-between content-center">
        <KnyhaCardSZ />
        <KnyhaCardNZ />
      </div>
    </div>
  );
}
