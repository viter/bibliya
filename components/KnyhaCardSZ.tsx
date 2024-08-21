import KnyhaCard from './KnyhaCard';
import Link from 'next/link';
import { knyhySZ } from '@/utils/knyhy';

export default function KnyhaCardSZ() {
  return (
    <KnyhaCard knyha="sz">
      <div>
        <h1 className="text-neutral-700 dark:text-neutral-100 font-bold">П&apos;ятикнижжя:</h1>
        <ul className="text-neutral-800 dark:text-neutral-300 pl-5 pb-3">
          {Object.entries(knyhySZ[0]).map((k, i: number) => (
            <li key={i} className="hover:bg-neutral-300 dark:hover:bg-neutral-700 px-2 rounded-sm">
              <Link href={`/${k[0]}`} scroll={false}>
                {Array.isArray(k[1].title) ? k[1].title[0] : k[1].title}
              </Link>
            </li>
          ))}
        </ul>

        <h1 className="text-neutral-700 dark:text-neutral-100 font-bold">Книги:</h1>
        <ul className="text-neutral-800 dark:text-neutral-300 pl-5 pb-3">
          {Object.entries(knyhySZ[1]).map((k, i: number) => (
            <li key={i} className="hover:bg-neutral-300 dark:hover:bg-neutral-700 px-2 rounded-sm">
              <Link href={`/${k[0]}`} scroll={false}>
                {Array.isArray(k[1].title) ? k[1].title[0] : k[1].title}
              </Link>
            </li>
          ))}
        </ul>

        <h1 className="text-neutral-700 dark:text-neutral-100 font-bold">Книги поетичні:</h1>
        <ul className="text-neutral-800 dark:text-neutral-300 pl-5 pb-3">
          {Object.entries(knyhySZ[2]).map((k, i: number) => (
            <li key={i} className="hover:bg-neutral-300 dark:hover:bg-neutral-700 px-2 rounded-sm">
              <Link href={`/${k[0]}`} scroll={false}>
                {Array.isArray(k[1].title) ? k[1].title[0] : k[1].title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h1 className="text-neutral-700 dark:text-neutral-100 font-bold">Книги пророків:</h1>
        <ul className="text-neutral-800 dark:text-neutral-300 pl-5 pb-3">
          {Object.entries(knyhySZ[3]).map((k, i: number) => (
            <li key={i} className="hover:bg-neutral-300 dark:hover:bg-neutral-700 px-2 rounded-sm">
              <Link href={`/${k[0]}`} scroll={false}>
                {Array.isArray(k[1].title) ? k[1].title[0] : k[1].title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </KnyhaCard>
  );
}
