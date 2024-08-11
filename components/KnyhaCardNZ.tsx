import KnyhaCard from './KnyhaCard';
import Link from 'next/link';
import { knyhyNZ } from '@/utils/knyhy';
import { decode } from 'html-entities';

export default function KnyhaCardNZ() {
  return (
    <KnyhaCard knyha="nz">
      <div>
        <h1 className="text-slate-700 font-bold text-lg">Євангелії:</h1>
        <ul className="text-slate-800 pl-5 pb-3">
          {Object.entries(knyhyNZ[0]).map((k, i: number) => (
            <li key={i}>
              <Link href={`/${k[0]}`} scroll={false}>
                {Array.isArray(k[1]) ? k[1][0] : k[1]}
              </Link>
            </li>
          ))}
        </ul>

        <ul className="text-slate-700 font-bold text-lg pb-3">
          {Object.entries(knyhyNZ[1]).map((k, i: number) => (
            <li key={i}>
              <Link href={`/${k[0]}`} scroll={false}>
                {Array.isArray(k[1]) ? k[1][0] : k[1]}
              </Link>
            </li>
          ))}
        </ul>

        <h1 className="text-slate-700 font-bold text-lg">Послання:</h1>
        <h1 className="text-slate-700 text-lg ml-3 italic">Ап. Павла:</h1>
        <ul className="text-slate-800 pl-6 pb-3">
          {Object.entries(knyhyNZ[2]).map((k, i: number) => (
            <li key={i}>
              <Link href={`/${k[0]}`} scroll={false}>
                {Array.isArray(k[1]) ? decode(k[1][0]) : decode(k[1])}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <ul className="text-slate-800 pl-3 pb-3 text-lg italic">
          {Object.entries(knyhyNZ[3]).map((k, i: number) => (
            <li key={i}>
              <Link href={`/${k[0]}`} scroll={false}>
                {Array.isArray(k[1]) ? k[1][0] : k[1]}
              </Link>
            </li>
          ))}
        </ul>

        <h1 className="text-slate-700 text-lg ml-3 italic">Ап. Петра:</h1>
        <ul className="text-slate-800 pl-6 pb-3">
          {Object.entries(knyhyNZ[4]).map((k, i: number) => (
            <li key={i}>
              <Link href={`/${k[0]}`} scroll={false}>
                {Array.isArray(k[1]) ? k[1][0] : k[1]}
              </Link>
            </li>
          ))}
        </ul>

        <h1 className="text-slate-700 text-lg ml-3 italic">Ап. Йоана:</h1>
        <ul className="text-slate-800 pl-6 pb-3">
          {Object.entries(knyhyNZ[5]).map((k, i: number) => (
            <li key={i}>
              <Link href={`/${k[0]}`} scroll={false}>
                {Array.isArray(k[1]) ? k[1][0] : k[1]}
              </Link>
            </li>
          ))}
        </ul>

        <ul className="text-slate-800 pl-3 pb-3 text-lg italic">
          {Object.entries(knyhyNZ[6]).map((k, i: number) => (
            <li key={i}>
              <Link href={`/${k[0]}`} scroll={false}>
                {Array.isArray(k[1]) ? k[1][0] : k[1]}
              </Link>
            </li>
          ))}
        </ul>

        <ul className="text-slate-700 font-bold text-lg pb-3">
          {Object.entries(knyhyNZ[7]).map((k, i: number) => (
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
