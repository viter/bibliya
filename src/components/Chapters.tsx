import clsx from 'clsx';
import { decode } from 'html-entities';
import localFont from 'next/font/local';
import { Data } from '@/lib/types';
import { forwardRef, TouchEventHandler } from 'react';
import { ScrollArea } from './ui/scroll-area';

type ChaptersProps = {
  data: Data[];
  onTouchStart: TouchEventHandler<HTMLDivElement>;
  onTouchEnd: TouchEventHandler<HTMLDivElement>;
};

const arnoldFont = localFont({
  src: '../lib/fonts/Arnold_BocklinC_Initials.ttf',
  variable: '--font-arnold',
});

const Chapters = forwardRef<HTMLDivElement, ChaptersProps>(function Chapters(
  { data, onTouchStart, onTouchEnd },
  ref,
) {
  return (
    <div className="text-justify text-neutral-800 dark:text-neutral-200 text-lg md:left-auto md:right-9 md:max-w-[65%] xl:right-20 2xl:left-[max(0px,calc(70%-45rem))] 2xl:max-w-5xl mt-30 md:py-6 md:pl-6 md:pr-2 md:inset-0 md:fixed mb-5 bg-cyan-100 dark:bg-cyan-900 shadow-lg rounded-md">
      <ScrollArea
        className="h-full pr-4"
        id="tekst"
        ref={ref}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {data.map((dataItem) => {
          const text = decode(dataItem.text).split(' ');
          if (/^[0-9]/.test(text[0].trim())) {
            text.shift();
          }
          const word = text.shift()?.split('');
          const firstLatterInWord = word?.shift();
          return (
            <div key={`${dataItem.id}r2`}>
              <div id={`rozdil_${dataItem.id}`} className="rozdil"></div>
              <p className="leading-normal  font-bold pt-6 pb-6 mb-0 ">{decode(dataItem.rozdil)}</p>
              <p className="mb-16">
                <span
                  className={clsx(
                    arnoldFont.variable,
                    'font-arnold',
                    'text-[38px]',
                    'text-red-500',
                    'dark:text-red-400',
                    'float-left',
                    'block',
                    'mr-2',
                    'mt-3',
                  )}
                >
                  {firstLatterInWord}
                </span>
                {word?.join('')}&nbsp;
                {text.join(' ')}
              </p>
            </div>
          );
        })}
      </ScrollArea>
    </div>
  );
});

export default Chapters;
