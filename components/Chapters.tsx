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
    <>
      <div className="lg:pl-[19.5rem]">
        <div className="max-w-4xl mx-auto">
          <div id="stub" className="sticky top-[80px] pt-15 bg-slate-200"></div>
          <div className="text-justify bg-slate-100 p-10 pt-10">
            {data.map((dataItem) => {
              const text = decode(dataItem.text).split(' ');
              text.shift();
              const word = text.shift()?.split('');
              const firstLatterInWord = word?.shift();
              const restoredWord = `<span>${firstLatterInWord} <span>${word?.join('')}`;
              return (
                <div key={`${dataItem.id}r2`}>
                  <div id={`rozdil_${dataItem.id}`} className="rozdil"></div>
                  <p className="font-bold mb-12 pt-16 sticky top-5">{dataItem.rozdil}</p>
                  <p>
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
        </div>
      </div>
    </>
  );
}
