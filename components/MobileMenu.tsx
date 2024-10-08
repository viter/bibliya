'use client';

import { Data } from '@/lib/types';
import { decode } from 'html-entities';
import clsx from 'clsx';
import { forwardRef } from 'react';
import HomeButton from '@/components/HomeButton';
import ThemeSwitch from './ThemeSwitch';

interface MobileMenuProps {
  data: Data[];
  handleClick: () => void;
  onTouchStart: (e: TouchEvent) => void;
  onTouchEnd: (e: TouchEvent) => void;
}

const MobileMenu = forwardRef<HTMLDivElement, MobileMenuProps>(function MobileMenu(
  { data, handleClick, onTouchStart, onTouchEnd },
  ref,
) {
  function handleMainDivClick(e: any) {
    if (e.target.getAttribute('id') === 'main') {
      handleClick();
    }
  }

  return (
    <div
      id="main"
      className="w-full h-full top-0 fixed backdrop-blur-[8px] bg-neutral/30 shadow-2xl"
      onClick={handleMainDivClick}
      onTouchStart={handleMainDivClick}
    >
      <div
        id="mobileMenu"
        className="fixed inset-0 w-2/3 p-3 overflow-y-auto bg-neutral-200 dark:bg-neutral-800"
        ref={ref}
      >
        <div className="flex bg-neutral-300 dark:bg-neutral-700 py-3 px-5 rounded-md items-center justify-between">
          <HomeButton className="block text-neutral-700 hover:text-neutral-700 hover:bg-neutral-200/90 bg-neutral-200 dark:hover:bg-neutral-800/90 dark:bg-neutral-800 hover:shadow-md active:shadow-none p-2 rounded-md" />
          <div className="w-8 h-8 rounded-full p-1 bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-600 dark:hover:bg-neutral-500 hover:cursor-pointer">
            <ThemeSwitch />
          </div>
        </div>

        <div
          id="contentMobile"
          className="fixed inset-0 top-[90px] right-auto w-2/3 px-8 overflow-y-auto"
          onTouchStart={(e: any) => onTouchStart(e)}
          onTouchEnd={(e: any) => onTouchEnd(e)}
        >
          <nav className="lg:text-sm lg:leading-6 relative">
            <ul id="itemsList" className="leading-6">
              {data.map((dataItem, index) => (
                <li key={`${dataItem.id}r3`}>
                  <a
                    href={`#rozdil_${dataItem.id}`}
                    id={`item_m_${dataItem.id}`}
                    onClick={() => handleClick()}
                    className={clsx(
                      index === 0 && 'font-bold',
                      'block py-1 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-100',
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
