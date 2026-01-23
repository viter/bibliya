import KnyhaCard from './KnyhaCard';
import Link from 'next/link';
import { knyhySZ } from '@/utils/knyhy';

export default function KnyhaCardSZ() {
  return (
    <KnyhaCard knyha="sz">
      <div>
        <h1 className="text-neutral-700 dark:text-cyan-100 font-bold">П&apos;ятикнижжя:</h1>
        <ul className="text-neutral-800 dark:text-neutral-100 pl-5 pb-3">
          {Object.entries(knyhySZ[0]).map((k, i: number) => (
            <Link key={i} href={`/${k[0]}`} scroll={false}>
              <li className="hover:bg-neutral-300 dark:hover:bg-cyan-800 px-2 rounded-md">
                {Array.isArray(k[1].title) ? k[1].title[0] : k[1].title}
              </li>
            </Link>
          ))}
        </ul>

        <h1 className="text-neutral-700 dark:text-cyan-100 font-bold">Книги:</h1>
        <ul className="text-neutral-800 dark:text-neutral-300 pl-5 pb-3">
          {Object.entries(knyhySZ[1]).map((k, i: number) => (
            <Link key={i} href={`/${k[0]}`} scroll={false}>
              <li className="hover:bg-neutral-300 dark:hover:bg-cyan-800 px-2 rounded-md">
                {Array.isArray(k[1].title) ? k[1].title[0] : k[1].title}
              </li>
            </Link>
          ))}
        </ul>

        <h1 className="text-neutral-700 dark:text-cyan-100 font-bold">Книги поетичні:</h1>
        <ul className="text-neutral-800 dark:text-neutral-300 pl-5 pb-3">
          {Object.entries(knyhySZ[2]).map((k, i: number) => (
            <Link key={i} href={`/${k[0]}`} scroll={false}>
              <li className="hover:bg-neutral-300 dark:hover:bg-cyan-800 px-2 rounded-md">
                {Array.isArray(k[1].title) ? k[1].title[0] : k[1].title}
              </li>
            </Link>
          ))}
        </ul>
      </div>

      <div>
        <h1 className="text-neutral-700 dark:text-cyan-100 font-bold">Книги пророків:</h1>
        <ul className="text-neutral-800 dark:text-neutral-300 pl-5 pb-3">
          {Object.entries(knyhySZ[3]).map((k, i: number) => (
            <Link key={i} href={`/${k[0]}`} scroll={false}>
              <li className="hover:bg-neutral-300 dark:hover:bg-cyan-800 px-2 rounded-md">
                {Array.isArray(k[1].title) ? k[1].title[0] : k[1].title}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </KnyhaCard>
  );
}
