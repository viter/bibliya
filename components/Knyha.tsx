'use client';

import { Data } from '@/lib/types';
import Chapters from '@/components/Chapters';
import Contents from '@/components/Contents';
import KnyhaHeader from '@/components/KnyhaHeader';
import { useEffect, useRef, useState } from 'react';
import { scroller } from '@/utils/clientEvents';
import MobileMenu from '@/components/MobileMenu';
import { useWindowSize } from '@raddix/use-window-size';

type KnyhaParams = {
  knyha: string;
  data: Data[];
};

const MOBILE_WINDOW_WIDTH = 768;

export default function Knyha({ knyha, data }: KnyhaParams) {
  const contentsRef = useRef<HTMLDivElement>(null);
  const chaptersRef = useRef<HTMLDivElement>(null);

  const [showMenu, setShowMenu] = useState(false);

  const { width } = useWindowSize();

  useEffect(() => {
    const chaptersDiv = chaptersRef.current;
    const contentsDiv = contentsRef.current;

    const args = {
      rozdily: chaptersDiv?.querySelectorAll('.rozdil'),
      activeItem: contentsDiv ? contentsDiv.querySelector('nav > ul > li > a.font-bold') : null,
      prevItem: undefined,
      scrollOffset: 0,
      contentsDiv,
    };

    chaptersDiv?.addEventListener('scroll', scroller.bind(args));

    return () => {
      chaptersDiv?.removeEventListener('scroll', scroller.bind(args));
    };
  }, []);

  function onClick() {
    setShowMenu(!showMenu);
    showMenu
      ? document.body.classList.remove('overflow-hidden')
      : document.body.classList.add('overflow-hidden');
  }

  function swipeMenuIn() {
    setShowMenu(true);
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

  return (
    <>
      <KnyhaHeader knyha={knyha} onClick={onClick} />
      <Contents data={data} ref={contentsRef} />
      <Chapters data={data} ref={chaptersRef} onTouchStart={touchStart} onTouchEnd={touchEnd} />
      {showMenu && width <= MOBILE_WINDOW_WIDTH ? (
        <MobileMenu
          data={data}
          handleClick={onClick}
          onTouchStart={touchStart}
          onTouchEnd={touchEnd}
        />
      ) : null}
    </>
  );
}
