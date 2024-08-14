import KnyhaCard from './KnyhaCard';
import Link from 'next/link';
import { knyhyNZ } from '@/utils/knyhy';
import { decode } from 'html-entities';

export default function KnyhaCardNZ() {
  return (
    <KnyhaCard knyha="nz">
      <div>
        <h1 className="text-neutral-700 dark:text-neutral-100 font-bold">Євангелії:</h1>
        <ul className="text-neutral-800 dark:text-neutral-300 pl-5 pb-3">
          {Object.entries(knyhyNZ[0]).map((k, i: number) => (
            <li key={i} className="hover:bg-neutral-300 dark:hover:bg-neutral-700 px-2 rounded-sm">
              <Link href={`/${k[0]}`} scroll={false}>
                {Array.isArray(k[1]) ? k[1][0] : k[1]}
              </Link>
            </li>
          ))}
        </ul>

        <ul className="text-neutral-700 dark:text-neutral-100 font-bold pb-3">
          {Object.entries(knyhyNZ[1]).map((k, i: number) => (
            <li key={i} className="hover:bg-neutral-300 dark:hover:bg-neutral-700 px-2 rounded-sm">
              <Link href={`/${k[0]}`} scroll={false}>
                {Array.isArray(k[1]) ? k[1][0] : k[1]}
              </Link>
            </li>
          ))}
        </ul>

        <h1 className="text-neutral-700 dark:text-neutral-100 font-bold">Послання:</h1>
        <h1 className="text-neutral-700 dark:text-neutral-100 ml-3 italic">Ап. Павла:</h1>
        <ul className="text-neutral-800 dark:text-neutral-300 pl-6 pb-3">
          {Object.entries(knyhyNZ[2]).map((k, i: number) => (
            <li key={i} className="hover:bg-neutral-300 dark:hover:bg-neutral-700 px-2 rounded-sm">
              <Link href={`/${k[0]}`} scroll={false}>
                {Array.isArray(k[1]) ? decode(k[1][0]) : decode(k[1])}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <ul className="text-neutral-800 dark:text-neutral-300 pl-3 pb-3 italic">
          {Object.entries(knyhyNZ[3]).map((k, i: number) => (
            <li key={i} className="hover:bg-neutral-300 dark:hover:bg-neutral-700 px-2 rounded-sm">
              <Link href={`/${k[0]}`} scroll={false}>
                {Array.isArray(k[1]) ? k[1][0] : k[1]}
              </Link>
            </li>
          ))}
        </ul>

        <h1 className="text-neutral-700 dark:text-neutral-100 ml-3 italic">Ап. Петра:</h1>
        <ul className="text-neutral-800 dark:text-neutral-300 pl-6 pb-3">
          {Object.entries(knyhyNZ[4]).map((k, i: number) => (
            <li key={i} className="hover:bg-neutral-300 dark:hover:bg-neutral-700 px-2 rounded-sm">
              <Link href={`/${k[0]}`} scroll={false}>
                {Array.isArray(k[1]) ? k[1][0] : k[1]}
              </Link>
            </li>
          ))}
        </ul>

        <h1 className="text-neutral-700 dark:text-neutral-100 ml-3 italic">Ап. Йоана:</h1>
        <ul className="text-neutral-800 dark:text-neutral-300 pl-6 pb-3">
          {Object.entries(knyhyNZ[5]).map((k, i: number) => (
            <li key={i} className="hover:bg-neutral-300 dark:hover:bg-neutral-700 px-2 rounded-sm">
              <Link href={`/${k[0]}`} scroll={false}>
                {Array.isArray(k[1]) ? k[1][0] : k[1]}
              </Link>
            </li>
          ))}
        </ul>

        <ul className="text-neutral-800 dark:text-neutral-300 pl-3 pb-3 italic">
          {Object.entries(knyhyNZ[6]).map((k, i: number) => (
            <li key={i} className="hover:bg-neutral-300 dark:hover:bg-neutral-700 px-2 rounded-sm">
              <Link href={`/${k[0]}`} scroll={false}>
                {Array.isArray(k[1]) ? k[1][0] : k[1]}
              </Link>
            </li>
          ))}
        </ul>

        <ul className="text-neutral-700 dark:text-neutral-100 font-bold pb-3">
          {Object.entries(knyhyNZ[7]).map((k, i: number) => (
            <li key={i} className="hover:bg-neutral-300 dark:hover:bg-neutral-700 px-2 rounded-sm">
              <Link href={`/${k[0]}`} scroll={false}>
                {Array.isArray(k[1]) ? k[1][0] : k[1]}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </KnyhaCard>
  );
}
