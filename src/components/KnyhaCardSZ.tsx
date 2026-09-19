import KnyhaCard from './KnyhaCard';
import Link from 'next/link';
import { knyhySZ } from '@/utils/knyhy';

export default function KnyhaCardSZ() {
  return (
    <KnyhaCard knyha="sz">
      <div>
        <h3 className="text-foreground font-bold">П&apos;ятикнижжя:</h3>
        <ul className="text-card-foreground pl-5 pb-3">
          {Object.entries(knyhySZ[0]).map((k, i: number) => (
            <Link key={i} href={`/${k[0]}`} scroll={false}>
              <li className="hover:bg-accent px-2 rounded-md">
                {Array.isArray(k[1].title) ? k[1].title[0] : k[1].title}
              </li>
            </Link>
          ))}
        </ul>

        <h3 className="text-foreground font-bold">Книги:</h3>
        <ul className="text-card-foreground pl-5 pb-3">
          {Object.entries(knyhySZ[1]).map((k, i: number) => (
            <Link key={i} href={`/${k[0]}`} scroll={false}>
              <li className="hover:bg-accent px-2 rounded-md">
                {Array.isArray(k[1].title) ? k[1].title[0] : k[1].title}
              </li>
            </Link>
          ))}
        </ul>

        <h3 className="text-foreground font-bold">Книги поетичні:</h3>
        <ul className="text-card-foreground pl-5 pb-3">
          {Object.entries(knyhySZ[2]).map((k, i: number) => (
            <Link key={i} href={`/${k[0]}`} scroll={false}>
              <li className="hover:bg-accent px-2 rounded-md">
                {Array.isArray(k[1].title) ? k[1].title[0] : k[1].title}
              </li>
            </Link>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-foreground font-bold">Книги пророків:</h3>
        <ul className="text-card-foreground pl-5 pb-3">
          {Object.entries(knyhySZ[3]).map((k, i: number) => (
            <Link key={i} href={`/${k[0]}`} scroll={false}>
              <li className="hover:bg-accent px-2 rounded-md">
                {Array.isArray(k[1].title) ? k[1].title[0] : k[1].title}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </KnyhaCard>
  );
}
