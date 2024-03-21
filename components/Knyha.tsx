'use client';

import { Data } from '@/lib/types';
import { MOBILE_WINDOW_WIDTH } from '@/lib/constants';
import Chapters from '@/components/Chapters';
import Contents from '@/components/Contents';
import KnyhaHeader from '@/components/KnyhaHeader';
import { useEffect, useRef, useState } from 'react';
import { scroller, scrollerMobile } from '@/utils/clientEvents';
import MobileMenu from '@/components/MobileMenu';
import { useWindowSize } from '@raddix/use-window-size';
import clsx from 'clsx';

type KnyhaParams = {
  knyha: string;
  data: Data[];
};

type ScrollerArgs = {
  rozdily: NodeList | undefined;
  activeItem: Element | null;
  prevItem: HTMLDivElement | null;
  contentsDiv: HTMLDivElement | null;
};

export default function Knyha({ knyha, data }: KnyhaParams) {
  const contentsRef = useRef<HTMLDivElement>(null);
  const chaptersRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const currentItem = useRef('');

  const [showMenu, setShowMenu] = useState(false);

  const { width } = useWindowSize();

  useEffect(() => {
    const chaptersDiv = chaptersRef.current;
    const contentsDiv = contentsRef.current;

    const args: ScrollerArgs = {
      rozdily: chaptersDiv?.querySelectorAll('.rozdil'),
      activeItem: contentsDiv ? contentsDiv.querySelector('nav > ul > li > a.font-bold') : null,
      prevItem: null,
      contentsDiv,
    };

    if (width > MOBILE_WINDOW_WIDTH) {
      setShowMenu(false);
      chaptersDiv?.addEventListener('scroll', scroller.bind(args));
    } else {
      document.addEventListener('scroll', scrollerMobile.bind({ currentItem }));
    }

    return () => {
      chaptersDiv?.removeEventListener('scroll', scroller.bind(args));
      document.removeEventListener('scroll', scrollerMobile);
    };
  }, [width]);

  function onClick() {
    setShowMenu(!showMenu);
    highlightMenuItem();
    showMenu
      ? document.body.classList.remove('overflow-hidden')
      : document.body.classList.add('overflow-hidden');
  }

  function swipeMenuIn() {
    setShowMenu(true);
    highlightMenuItem();
  }

  function swipeMenuOut() {
    setShowMenu(false);
  }

  let startX = 0;
  let endX = 0;

  function touchStart(e: TouchEvent) {
    const touches = e.changedTouches;
    startX = touches[0].clientX;
  }

  function touchEnd(e: TouchEvent) {
    const touches = e.changedTouches;
    endX = touches[0].clientX;

    if (endX !== startX) {
      const swipeLength = Math.abs(endX - startX);
      const minSwipeLength = width / 3;
      if (width <= MOBILE_WINDOW_WIDTH && swipeLength >= minSwipeLength) {
        if (endX >= startX) {
          swipeMenuIn();
          document.body.classList.add('overflow-hidden');
        } else {
          swipeMenuOut();
          document.body.classList.remove('overflow-hidden');
        }
      }
    }
  }

  function highlightMenuItem() {
    const contentsDiv = mobileMenuRef?.current;
    const activeItem = contentsDiv?.querySelector(`#item_m_${currentItem.current.split('_')[1]}`);

    contentsDiv?.querySelector('nav > ul > li > a.font-bold')?.classList.remove('font-bold');

    if (!activeItem?.classList.contains('font-bold')) {
      activeItem?.classList.add('font-bold');
    }

    activeItem?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  return (
    <>
      <KnyhaHeader knyha={knyha} onClick={onClick} />
      <Contents data={data} ref={contentsRef} />
      <Chapters data={data} ref={chaptersRef} onTouchStart={touchStart} onTouchEnd={touchEnd} />
      <div className={clsx(showMenu ? '' : 'left-[-10000px] fixed')}>
        <MobileMenu
          data={data}
          ref={mobileMenuRef}
          handleClick={onClick}
          onTouchStart={touchStart}
          onTouchEnd={touchEnd}
        />
      </div>
    </>
  );
}
