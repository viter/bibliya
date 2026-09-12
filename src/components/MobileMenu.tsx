'use client';

import { Data } from '@/lib/types';
import { decode } from 'html-entities';
import clsx from 'clsx';
import { forwardRef } from 'react';
import HomeButton from '@/components/HomeButton';
import ThemeSwitch from './ThemeSwitch';
import PaletteSwitch from './PaletteSwitch';

interface MobileMenuProps {
  data: Data[];
  handleClick: () => void;
  onChapterClick: (id: string) => void;
}

const MobileMenu = forwardRef<HTMLDivElement, MobileMenuProps>(function MobileMenu(
  { data, handleClick, onChapterClick },
  ref,
) {
  function handleMainDivClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      handleClick();
    }
  }

  function handleMainDivTouch(e: React.TouchEvent<HTMLDivElement>) {
    e.stopPropagation();
    if (e.currentTarget.id === 'main' && e.target === e.currentTarget) {
      handleClick();
    }
  }

  return (
    <div
      id="main"
      className="w-full z-20 h-full top-0 fixed backdrop-blur-sm bg-foreground/30 shadow-2xl"
      onClick={handleMainDivClick}
      onTouchStart={handleMainDivTouch}
    >
      <div
        id="mobileMenu"
        className="fixed inset-0 w-2/3 p-3 overflow-y-auto bg-card"
        ref={ref}
      >
        <div className="flex bg-secondary py-3 px-5 rounded-md items-center justify-between">
          <HomeButton className="block text-foreground hover:text-foreground bg-secondary hover:bg-accent hover:shadow-md active:shadow-none p-2 rounded-md" />
          <div className="flex items-center gap-1">
            <PaletteSwitch />
            <div className="w-8 h-8 rounded-full p-1 bg-secondary hover:bg-accent hover:cursor-pointer">
              <ThemeSwitch />
            </div>
          </div>
        </div>

        <div
          id="contentMobile"
          className="fixed inset-0 top-22.5 right-auto w-2/3 px-8 overflow-y-auto"
        >
          <nav className="lg:text-sm lg:leading-6 relative">
            <ul id="itemsList" className="leading-6">
              {data.map((dataItem, index) => (
                <li key={`${dataItem.id}r3`}>
                  <a
                    href={`#rozdil_${dataItem.id}`}
                    id={`item_m_${dataItem.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleClick(); // close menu
                      setTimeout(() => {
                        onChapterClick(String(dataItem.id)); // scroll inside ScrollArea
                      }, 100);
                    }}
                    className={clsx(
                      index === 0 && 'font-bold',
                      'block py-1 text-muted-foreground hover:text-foreground',
                    )}
                  >
                    {decode(dataItem.rozdil)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
});

export default MobileMenu;
