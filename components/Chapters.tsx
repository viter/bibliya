import clsx from 'clsx';
import { decode } from 'html-entities';
import localFont from 'next/font/local';
import { Data } from '@/lib/types';

type ChaptersProps = {
  data: Data[];
};

const arnoldFont = localFont({
  src: '../lib/fonts/Arnold_BocklinC_Initials.ttf',
  variable: '--font-arnold',
});

export default function Chapters({ data }: ChaptersProps) {
  return (
    <div
      id="tekst"
      className="text-justify bg-slate-100 lg:left-auto lg:right-9 lg:max-w-[65%] xl:right-20 2xl:left-[max(0px,calc(70%-45rem))] 2xl:max-w-5xl mt-[120px] p-10 pt-0 lg:inset-0 lg:overflow-y-auto lg:fixed"
    >
      {data.map((dataItem) => {
        const text = decode(dataItem.text).split(' ');
        text.shift();
        const word = text.shift()?.split('');
        const firstLatterInWord = word?.shift();
        return (
          <div key={`${dataItem.id}r2`}>
            <div id={`rozdil_${dataItem.id}`} className="rozdil"></div>
            <p className="bg-slate-100 font-bold pt-4 pb-6 mb-0 top-0 lg:sticky">
              {dataItem.rozdil}
            </p>
            <p className="mb-16">
              <span
                className={clsx(
                  arnoldFont.variable,
                  'font-arnold',
                  'text-[30px]',
                  'text-red-500',
                  'float-left',
                  'block',
                  'mr-2',
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
}
