'use client';

import { Data } from '@/lib/types';
import { decode } from 'html-entities';
import { forwardRef } from 'react';
import { ScrollArea } from './ui/scroll-area';
import { cn } from '@/lib/utils';

type ContentsProps = {
  data: Data[];
  onChapterClick: (id: string) => void;
};

const Contents = forwardRef<HTMLDivElement, ContentsProps>(function Contents(
  { data, onChapterClick },
  ref,
) {
  const baseClass = 'block px-2 py-1 border border-transparent hover:border-l-neutral-800';
  const activeClass = 'font-bold text-neutral-900 dark:text-neutral-100';
  const inactiveClass = 'text-neutral-900 dark:text-neutral-300';

  return (
    <div
      id="content"
      ref={ref}
      className="hidden md:block 3xl:w-[25rem] md:fixed md:h-[calc(95vh-4rem)] max-h-screen w-58 lg:w-78 mb-5 pr-5"
    >
      <ScrollArea className="h-full fixed">
        <nav>
          <ul id="itemsList" className="leading-6">
            {data.map((dataItem, index) => {
              const isActive = index === 0;
              return (
                <li key={String(dataItem.id) + 'r1'}>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      onChapterClick(String(dataItem.id));
                    }}
                    id={'item_' + String(dataItem.id)}
                    className={cn(baseClass, isActive ? activeClass : inactiveClass)}
                  >
                    {decode(dataItem.rozdil)}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </ScrollArea>
    </div>
  );
});

export default Contents;
