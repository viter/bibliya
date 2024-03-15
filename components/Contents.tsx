import { Data } from '@/lib/types';
import { decode } from 'html-entities';
import ShowContentsButton from './ShowContentsButton';

export default function Contents({ data }: { data: Data[] }) {
  return (
    <>
      <ShowContentsButton />
      <div
        id="content"
        className="left-[-1000px] lg:block lg:left-[max(0px,calc(50%-45rem))] 3xl:w-[25rem] fixed z-20 inset-0 top-[120px] right-auto w-[19.5rem] px-8 overflow-y-auto"
      >
        <nav className="lg:text-sm lg:leading-6 relative">
          <ul id="itemsList" className="text-sm leading-6">
            {data.map((dataItem) => (
              <li key={`${dataItem.id}r1`}>
                <a
                  href={`#rozdil_${dataItem.id}`}
                  id={`item_${dataItem.id}`}
                  className="block py-1 hover:text-slate-900 "
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
}
