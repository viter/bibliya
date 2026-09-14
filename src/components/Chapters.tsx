import clsx from 'clsx';
import { decode } from 'html-entities';
import localFont from 'next/font/local';
import { Data } from '@/lib/types';
import { parseVerseLine, verseAnchorId } from '@/lib/verse';
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
    <div className="flex-1 md:ml-58 lg:ml-78 pb-4 h-[calc(100dvh-1.1rem)] md:h-[calc(100dvh-6rem)]">
      <div className="sticky top-0 h-[calc(100%-1rem)] text-justify text-card-foreground text-lg md:py-6 md:px-2 bg-card md:shadow-lg md:rounded-md mx-1">
        <ScrollArea
          className="h-full px-4"
          id="tekst"
          ref={ref}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {data.map((dataItem) => {
            const verses = decode(dataItem.text)
              .split(/\r\n|\r|\n/)
              .map((line) => parseVerseLine(line))
              .filter((verse) => verse !== null);

            const [firstVerse, ...restVerses] = verses;
            const firstVerseWords = firstVerse?.content.split(' ') ?? [];
            const word = firstVerseWords.shift()?.split('');
            const firstLatterInWord = word?.shift();

            return (
              <div key={`${dataItem.id}r2`}>
                <div id={`rozdil_${dataItem.id}`} className="rozdil"></div>
                <p className="leading-normal  font-bold pt-6 pb-6 mb-0 ">
                  {decode(dataItem.rozdil)}
                </p>
                <p className="mb-16">
                  {firstVerse && (
                    <span id={verseAnchorId(dataItem.id, firstVerse.num)}>
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
                      {firstVerseWords.join(' ')}
                    </span>
                  )}
                  {restVerses.map((verse) => (
                    <span key={verse.num} id={verseAnchorId(dataItem.id, verse.num)}>
                      {' '}
                      <span className="text-primary font-bold">{verse.num}</span> {verse.content}
                    </span>
                  ))}
                </p>
              </div>
            );
          })}
        </ScrollArea>
      </div>
    </div>
  );
});

export default Chapters;
