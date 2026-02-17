import { Data } from '@/lib/types';
import { decode } from 'html-entities';
import { forwardRef } from 'react';
import { ScrollArea } from './ui/scroll-area';
import { cn } from '@/lib/utils';

const Contents = forwardRef<HTMLDivElement, { data: Data[] }>(function Contents({ data }, ref) {
  return (
    <>
      <div
        id="content"
        ref={ref}
        className="hidden md:block md:left-[max(0px,calc(50%-45rem))] 3xl:w-[25rem] fixed z-20 inset-0 top-30 right-auto w-58 lg:w-78 px-8 mb-5"
      >
        <ScrollArea className="h-full">
          <nav>
            <ul id="itemsList" className="leading-6">
              {data.map((dataItem, index) => (
                <li key={`${dataItem.id}r1`}>
                  <a
                    href={`#rozdil_${dataItem.id}`}
                    id={`item_${dataItem.id}`}
                    className={cn(
                      index === 0
                        ? 'font-bold dark:text-neutral-100 hover:border-transparent'
                        : 'dark:text-neutral-400',
                      'block px-2 py-1 border  border-transparent hover:border-l-neutral-800 dark:hover:border-l-neutral-400',
                    )}
                  >
                    {decode(dataItem.rozdil)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </ScrollArea>
      </div>
    </>
  );
});

export default Contents;
