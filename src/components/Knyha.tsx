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
      document.body.classList.remove('overflow-hidden');
      chaptersDiv
        ?.querySelector('[data-slot=scroll-area-viewport]')
        ?.addEventListener('scroll', scroller.bind(args));
    } else {
      chaptersDiv
        ?.querySelector('[data-slot=scroll-area-viewport]')
        ?.addEventListener('scroll', scrollerMobile.bind({ currentItem }));
    }

    return () => {
      chaptersDiv?.removeEventListener('scroll', scroller.bind(args));
      chaptersDiv?.removeEventListener('scroll', scrollerMobile);
    };
  }, [width]);

  function scrollToChapter(id: string) {
    const scrollViewport = chaptersRef.current?.querySelector('[data-slot=scroll-area-viewport]');
    const target = document.getElementById(`rozdil_${id}`);

    if (scrollViewport && target) {
      scrollViewport.scrollTo({
        top: target.offsetTop,
        behavior: 'instant',
      });
    }
  }

  function onClick() {
    const next = !showMenu;
    setShowMenu(next);
    highlightMenuItem();
    if (next) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }

  function swipeMenuIn() {
    setShowMenu(true);
    highlightMenuItem();
  }

  function swipeMenuOut() {
    setShowMenu(false);
  }

  let startX = 0;
  let startY = 0;
  let endX = 0;
  let endY = 0;

  function touchStart(e: React.TouchEvent<HTMLDivElement>) {
    const touches = e.changedTouches;
    // eslint-disable-next-line react-hooks/immutability
    startX = touches[0].clientX;
    startY = touches[0].clientY;
  }

  function touchEnd(e: React.TouchEvent<HTMLDivElement>) {
    const touches = e.changedTouches;
    endX = touches[0].clientX;
    endY = touches[0].clientY;

    const deltaX = endX - startX;
    const deltaY = endY - startY;
    const horizontalLength = Math.abs(deltaX);
    const verticalLength = Math.abs(deltaY);
    const minSwipeLength = width / 3;

    // Require the gesture to be clearly horizontal so a vertical scroll of the
    // reading text can never be misread as a swipe that opens/closes the menu.
    const isHorizontalSwipe =
      horizontalLength >= minSwipeLength && horizontalLength > verticalLength * 1.5;

    if (width <= MOBILE_WINDOW_WIDTH && isHorizontalSwipe) {
      if (deltaX >= 0) {
        swipeMenuIn();
        document.body.classList.add('overflow-hidden');
      } else {
        swipeMenuOut();
        document.body.classList.remove('overflow-hidden');
      }
    }
  }

  function highlightMenuItem() {
    const contentsDiv = mobileMenuRef?.current;
    const activeItem = contentsDiv?.querySelector(`#item_m_${currentItem.current.split('_')[1]}`);

    console.log('///////', currentItem.current);

    contentsDiv?.querySelector('nav > ul > li > a.font-bold')?.classList.remove('font-bold');

    if (!activeItem?.classList.contains('font-bold')) {
      activeItem?.classList.add('font-bold');
    }

    activeItem?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  return (
    <div className="overflow-hidden h-[calc(100%-1rem)]">
      <KnyhaHeader knyha={knyha} onClick={onClick} />
      <div className="flex">
        <Contents data={data} ref={contentsRef} onChapterClick={scrollToChapter} />
        <Chapters data={data} ref={chaptersRef} onTouchStart={touchStart} onTouchEnd={touchEnd} />
      </div>
      <div className={clsx(showMenu ? '' : 'invisible fixed')}>
        <MobileMenu
          data={data}
          ref={mobileMenuRef}
          handleClick={onClick}
          onChapterClick={scrollToChapter}
        />
      </div>
    </div>
  );
}
