import KnyhaCardSZ from './KnyhaCardSZ';
import KnyhaCardNZ from './KnyhaCardNZ';
import clsx from 'clsx';
import localFont from 'next/font/local';

const evangelieFont = localFont({
  src: '../lib/fonts/Evangelie.ttf',
  variable: '--font-evangelie',
});

export default function KnyhyContents() {
  return (
    <>
      <header className="flex my-10">
        <div className="pl-8 xl:pl-0">
          <h1
            className={clsx(
              evangelieFont.variable,
              'font-evangelie text-neutral-600 text-5xl lg:text-7xl',
            )}
          >
            Святе Письмо
          </h1>
          <h2 className="text-gray-700 bg-gray-200 pl-2 mt-1 text-sm lg:text-base">
            в перекладі о.Івана Хоменка
          </h2>
        </div>
      </header>
      <div className="md:flex md:justify-evenly md:gap-10 xl:justify-between content-center">
        <KnyhaCardSZ />
        <KnyhaCardNZ />
      </div>
    </>
  );
}
