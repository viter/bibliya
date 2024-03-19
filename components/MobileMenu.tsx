'use client';

import { Data } from '@/lib/types';
import { decode } from 'html-entities';
import clsx from 'clsx';

interface MobileMenuProps {
  data: Data[];
  handleClick: () => void;
  onTouchStart: (e: TouchEvent) => void;
  onTouchEnd: (e: TouchEvent) => void;
}

export default function MobileMenu({
  data,
  handleClick,
  onTouchStart,
  onTouchEnd,
}: MobileMenuProps) {
  function handleMainDivClick(e: any) {
    if (e.target.getAttribute('id') === 'main') {
      handleClick();
    }
  }

  return (
    <div
      id="main"
      className="w-full h-full top-0 fixed backdrop-blur-[8px] bg-slate/30"
      onClick={handleMainDivClick}
      onTouchStart={handleMainDivClick}
    >
      <div
        id="mobileMenu"
        className="fixed inset-0 w-2/3 p-5 overflow-y-auto bg-slate-200  overscroll-y-contain shadow-2xl"
      >
        <p>Mobile Menu</p>
        <div
          id="contentMobile"
          className="fixed inset-0 top-[100px] right-auto w-2/3 px-8 overflow-y-auto"
          onTouchStart={(e: any) => onTouchStart(e)}
          onTouchEnd={(e: any) => onTouchEnd(e)}
        >
          <nav className="lg:text-sm lg:leading-6 relative">
            <ul id="itemsList" className="text-sm leading-6">
              {data.map((dataItem, index) => (
                <li key={`${dataItem.id}r3`}>
                  <a
                    href={`#rozdil_${dataItem.id}`}
                    id={`item_${dataItem.id}`}
                    onClick={() => handleClick()}
                    className={clsx(index === 0 && 'font-bold', 'block py-1 hover:text-slate-900 ')}
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
}
