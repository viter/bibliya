'use client';

import { Data } from '@/lib/types';
import { MOBILE_WINDOW_WIDTH } from '@/lib/constants';
import Chapters from '@/components/Chapters';
import Contents from '@/components/Contents';
import KnyhaHeader from '@/components/KnyhaHeader';
import SelectionToolbar from '@/components/SelectionToolbar';
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
  prevItem: Element | null;
  contentsDiv: HTMLDivElement | null;
};

export default function Knyha({ knyha, data }: KnyhaParams) {
  const contentsRef = useRef<HTMLDivElement>(null);
  const chaptersRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const currentItem = useRef('');
  const hasScrolledToVerseRef = useRef(false);

  const [showMenu, setShowMenu] = useState(false);

  const { width } = useWindowSize();

  // Close the mobile menu when the viewport grows past the mobile breakpoint,
  // without calling setState directly inside the DOM-wiring effect below.
  const [prevWidth, setPrevWidth] = useState(width);
  if (width !== prevWidth) {
    setPrevWidth(width);
    if (width > MOBILE_WINDOW_WIDTH) {
      setShowMenu(false);
    }
  }

  // Keep body scroll locking in sync with the mobile menu instead of toggling
  // the class by hand at every call site that opens/closes it.
  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', showMenu);
  }, [showMenu]);

  useEffect(() => {
    // `useWindowSize` reports 0 until it measures the real viewport on mount;
    // wait for that so we attach the listener for the right (mobile/desktop)
    // branch once, instead of briefly wiring up the wrong one first.
    if (width === 0) return;

    const chaptersDiv = chaptersRef.current;
    const contentsDiv = contentsRef.current;

    const args: ScrollerArgs = {
      rozdily: chaptersDiv?.querySelectorAll('.rozdil'),
      activeItem: contentsDiv ? contentsDiv.querySelector('nav > ul > li > a.font-bold') : null,
      prevItem: null,
      contentsDiv,
    };

    if (width > MOBILE_WINDOW_WIDTH) {
      chaptersDiv
        ?.querySelector('[data-slot=scroll-area-viewport]')
        ?.addEventListener('scroll', scroller.bind(args));
    } else {
      chaptersDiv
        ?.querySelector('[data-slot=scroll-area-viewport]')
        ?.addEventListener('scroll', scrollerMobile.bind({ currentItem }));
    }

    if (!hasScrolledToVerseRef.current) {
      const hash = window.location.hash.slice(1);
      if (hash.startsWith('verse_')) {
        hasScrolledToVerseRef.current = true;
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'center' });

        const chapterId = hash.split('_')[1];
        currentItem.current = `rozdil_${chapterId}`;

        const activeItem = contentsDiv?.querySelector(`#item_${chapterId}`);
        if (activeItem) {
          contentsDiv?.querySelectorAll('nav > ul > li > a.font-bold').forEach((el) => {
            el.classList.remove('font-bold', 'dark:text-neutral-100');
            el.classList.add('dark:text-neutral-300');
          });
          activeItem.classList.add('font-bold', 'dark:text-neutral-100');
          activeItem.classList.remove('dark:text-neutral-300');

          // Keep the scroll-spy's own bookkeeping in sync, so the next manual
          // scroll knows this is the item to un-highlight instead of leaving
          // it stuck highlighted.
          args.activeItem = activeItem;
          args.prevItem = activeItem;
        }
      }
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
    setShowMenu(!showMenu);
    highlightMenuItem();
  }

  function swipeMenuIn() {
    setShowMenu(true);
    highlightMenuItem();
  }

  function swipeMenuOut() {
    setShowMenu(false);
  }

  const touchStartRef = useRef({ x: 0, y: 0 });

  function touchStart(e: React.TouchEvent<HTMLDivElement>) {
    const touches = e.changedTouches;
    touchStartRef.current = { x: touches[0].clientX, y: touches[0].clientY };
  }

  function touchEnd(e: React.TouchEvent<HTMLDivElement>) {
    const touches = e.changedTouches;
    const endX = touches[0].clientX;
    const endY = touches[0].clientY;

    const deltaX = endX - touchStartRef.current.x;
    const deltaY = endY - touchStartRef.current.y;
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
      } else {
        swipeMenuOut();
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
    <div className="flex flex-col overflow-hidden h-dvh pb-4">
      <KnyhaHeader knyha={knyha} onClick={onClick} />
      <div className="flex flex-1 min-h-0">
        <Contents data={data} ref={contentsRef} onChapterClick={scrollToChapter} />
        <Chapters data={data} ref={chaptersRef} onTouchStart={touchStart} onTouchEnd={touchEnd} />
      </div>
      <SelectionToolbar containerRef={chaptersRef} data={data} knyha={knyha} />
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
