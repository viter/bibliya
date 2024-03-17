import localFont from 'next/font/local';
import Link from 'next/link';

const arnoldFont = localFont({
  src: '../lib/fonts/Arnold_BocklinC_Initials.ttf',
  variable: '--font-arnold',
});

export default function Home(): JSX.Element {
  return (
    <div
      className="container flex flex-col px-6 mx-auto space-y-8 bg-greylight
    md:space-x-8 md:space-y-0 md:flex-row md:pr-0"
    >
      <div className="flex flex-col pt-6 md:w-2/5">
        <div className="bg-greydarker rounded-sm py-2 mb-5">
          <h1
            className="text-xl font-bold text-center
          text-greendarker md:text-2xl"
          >
            Старий Завіт
          </h1>
        </div>
        <p className="text-gray-700">
          <Link href="/but" scroll={false}>
            Буття
          </Link>
        </p>
        <p className="text-gray-700">
          <Link href="/vyh">Вихід</Link>
        </p>
      </div>
      <div className="flex flex-col md:py-6 md:w-2/5">
        <div className="bg-greydarker rounded-sm py-2 mb-5">
          <h1
            className="text-xl font-bold text-center
          text-greendarker md:text-2xl"
          >
            Новий Завіт
          </h1>
        </div>
        <p className="text-gray-700">
          text text text text text text text text texttext text text text text text text text text
          text text text text text
        </p>
      </div>
      <div className={`${arnoldFont.variable} font-arnold`}>Привіт</div>
    </div>
  );
}
