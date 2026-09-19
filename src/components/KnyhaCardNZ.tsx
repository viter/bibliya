import KnyhaCard from './KnyhaCard';
import Link from 'next/link';
import { knyhyNZ } from '@/utils/knyhy';
import { decode } from 'html-entities';

export default function KnyhaCardNZ() {
  return (
    <KnyhaCard knyha="nz">
      <div>
        <h3 className="text-foreground font-bold">Євангелії:</h3>
        <ul className="text-card-foreground pl-5 pb-3">
          {Object.entries(knyhyNZ[0]).map((k, i: number) => (
            <li key={i} className="hover:bg-accent px-2 rounded-sm">
              <Link href={`/${k[0]}`} scroll={false}>
                {Array.isArray(k[1].title) ? k[1].title[0] : k[1].title}
              </Link>
            </li>
          ))}
        </ul>

        <ul className="text-foreground font-bold pb-3">
          {Object.entries(knyhyNZ[1]).map((k, i: number) => (
            <li key={i} className="hover:bg-accent rounded-sm">
              <Link href={`/${k[0]}`} scroll={false}>
                {Array.isArray(k[1].title) ? k[1].title[0] : k[1].title}
              </Link>
            </li>
          ))}
        </ul>

        <h3 className="text-foreground font-bold">Послання:</h3>
        <h4 className="text-foreground ml-3 italic">Ап. Павла:</h4>
        <ul className="text-card-foreground pl-6 pb-3">
          {Object.entries(knyhyNZ[2]).map((k, i: number) => (
            <li key={i} className="hover:bg-accent px-2 rounded-sm">
              <Link href={`/${k[0]}`} scroll={false}>
                {Array.isArray(k[1].title) ? decode(k[1].title[0]) : decode(k[1].title)}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <ul className="text-card-foreground ml-3 pb-3 italic">
          {Object.entries(knyhyNZ[3]).map((k, i: number) => (
            <li key={i} className="hover:bg-accent rounded-sm">
              <Link href={`/${k[0]}`} scroll={false}>
                {Array.isArray(k[1].title) ? decode(k[1].title[0]) : decode(k[1].title)}
              </Link>
            </li>
          ))}
        </ul>

        <h4 className="text-foreground ml-3 italic">Ап. Петра:</h4>
        <ul className="text-card-foreground pl-6 pb-3">
          {Object.entries(knyhyNZ[4]).map((k, i: number) => (
            <li key={i} className="hover:bg-accent rounded-sm">
              <Link href={`/${k[0]}`} scroll={false}>
                {Array.isArray(k[1].title) ? k[1].title[0] : k[1].title}
              </Link>
            </li>
          ))}
        </ul>

        <h4 className="text-foreground ml-3 italic">Ап. Йоана:</h4>
        <ul className="text-card-foreground pl-6 pb-3">
          {Object.entries(knyhyNZ[5]).map((k, i: number) => (
            <li key={i} className="hover:bg-accent px-2 rounded-sm">
              <Link href={`/${k[0]}`} scroll={false}>
                {Array.isArray(k[1].title) ? k[1].title[0] : k[1].title}
              </Link>
            </li>
          ))}
        </ul>

        <ul className="text-card-foreground pl-3 pb-3 italic">
          {Object.entries(knyhyNZ[6]).map((k, i: number) => (
            <li key={i} className="hover:bg-accent px-2 rounded-sm">
              <Link href={`/${k[0]}`} scroll={false}>
                {Array.isArray(k[1].title) ? k[1].title[0] : k[1].title}
              </Link>
            </li>
          ))}
        </ul>

        <ul className="text-foreground font-bold pb-3">
          {Object.entries(knyhyNZ[7]).map((k, i: number) => (
            <li key={i} className="hover:bg-accent px-2 rounded-sm">
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
