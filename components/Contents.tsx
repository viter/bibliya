import { Data } from '@/lib/types';
import { decode } from 'html-entities';
import { forwardRef } from 'react';
import clsx from 'clsx';

const Contents = forwardRef<HTMLDivElement, { data: Data[] }>(function Contents({ data }, ref) {
  return (
    <>
      <div
        id="content"
        ref={ref}
        className="hidden text-neutral-800 md:block md:left-[max(0px,calc(50%-45rem))] 3xl:w-[25rem] fixed z-20 inset-0 top-[120px] right-auto w-[14.5rem] lg:w-[19.5rem] px-8 overflow-y-auto"
      >
        <nav>
          <ul id="itemsList" className="leading-6">
            {data.map((dataItem, index) => (
              <li key={`${dataItem.id}r1`}>
                <a
                  href={`#rozdil_${dataItem.id}`}
                  id={`item_${dataItem.id}`}
                  className={clsx(
                    index === 0 && 'font-bold hover:border-transparent',
                    'block px-2 py-1 border border-transparent  hover:border-l-neutral-800',
                  )}
                >
                  {decode(dataItem.rozdil)}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
});

export default Contents;
