'use client';

import { Data } from '@/lib/types';
import Chapters from '@/components/Chapters';
import Contents from '@/components/Contents';
import KnyhaHeader from '@/components/KnyhaHeader';
import { useEffect, useRef } from 'react';
import { scroller } from '@/utils/clientEvents';

type KnyhaParams = {
  knyha: string;
  data: Data[];
};

export default function Knyha({ knyha, data }: KnyhaParams) {
  const contentsRef = useRef<HTMLDivElement>(null);
  const chaptersRef = useRef<HTMLDivElement>(null);

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

  return (
    <>
      <KnyhaHeader knyha={knyha} />
      <Contents data={data} ref={contentsRef} />
      <Chapters data={data} ref={chaptersRef} />
    </>
  );
}
