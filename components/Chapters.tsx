import clsx from 'clsx';
import { decode } from 'html-entities';
import localFont from 'next/font/local';
import { Data } from '@/lib/types';
import { forwardRef } from 'react';

type ChaptersProps = {
  data: Data[];
  onTouchStart: (e: TouchEvent) => void;
  onTouchEnd: (e: TouchEvent) => void;
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
    <div
      id="tekst"
      ref={ref}
      className="leading-relaxed text-justify text-neutral-800 dark:text-neutral-300  bg-neutral-100 dark:bg-neutral-700 text-lg md:left-auto md:right-9 md:max-w-[65%] xl:right-20 2xl:left-[max(0px,calc(70%-45rem))] 2xl:max-w-5xl mt-[120px] p-5 md:px-10 pt-0 md:inset-0 md:overflow-y-auto md:fixed shadow-xl dark:shadow-neutral-950"
      onTouchStart={(e: any) => onTouchStart(e)}
      onTouchEnd={(e: any) => onTouchEnd(e)}
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
            <p className="leading-normal bg-neutral-100 dark:bg-neutral-700 font-bold pt-6 pb-6 mb-0 top-[-1px] md:sticky">
              {decode(dataItem.rozdil)}
            </p>
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
    </div>
  );
});

export default Chapters;
