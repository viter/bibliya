import KnyhaCard from './KnyhaCard';
import Link from 'next/link';
import { knyhySZ } from '@/utils/knyhy';

export default function KnyhaCardSZ() {
  return (
    <KnyhaCard knyha="sz">
      <div>
        <h1 className="text-neutral-700 font-bold text-lg">П&apos;ятикнижжя:</h1>
        <ul className="text-neutral-800 pl-5 pb-3">
          {Object.entries(knyhySZ[0]).map((k, i: number) => (
            <li key={i}>
              <Link href={`/${k[0]}`} scroll={false}>
                {Array.isArray(k[1]) ? k[1][0] : k[1]}
              </Link>
            </li>
          ))}
        </ul>

        <h1 className="text-neutral-700 font-bold text-lg">Книги:</h1>
        <ul className="text-neutral-800 pl-5 pb-3">
          {Object.entries(knyhySZ[1]).map((k, i: number) => (
            <li key={i}>
              <Link href={`/${k[0]}`} scroll={false}>
                {Array.isArray(k[1]) ? k[1][0] : k[1]}
              </Link>
            </li>
          ))}
        </ul>

        <h1 className="text-neutral-700 font-bold text-lg">Книги поетичні:</h1>
        <ul className="text-neutral-800 pl-5 pb-3">
          {Object.entries(knyhySZ[2]).map((k, i: number) => (
            <li key={i}>
              <Link href={`/${k[0]}`} scroll={false}>
                {Array.isArray(k[1]) ? k[1][0] : k[1]}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h1 className="text-neutral-700 font-bold text-lg">Книги пророків:</h1>
        <ul className="text-neutral-800 pl-5 pb-3">
          {Object.entries(knyhySZ[3]).map((k, i: number) => (
            <li key={i}>
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
