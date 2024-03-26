'use client';

import { useRef, useState } from 'react';
import { animate } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { knyhySZ, knyhyNZ } from '@/utils/knyhy';
import { decode } from 'html-entities';

export default function KnyhyContents() {
  const [move, setMove] = useState(true);
  const [move1, setMove1] = useState(true);
  const cover1 = useRef(null);
  const cover2 = useRef(null);
  const content1 = useRef(null);
  const content2 = useRef(null);

  function handleCover1Click() {
    setMove((prev) => {
      animate(cover2.current, { x: prev ? 450 : 0 }, { delay: prev ? 0.1 : 0, bounce: 0 });
      animate(content1.current, { x: prev ? 900 : 0 }, { delay: prev ? 0 : 0.2, bounce: 0 });
      return !prev;
    });
  }

  function handleCover2Click() {
    setMove1((prev) => {
      animate(cover1.current, { x: prev ? -450 : 0 }, { delay: prev ? 0.1 : 0, bounce: 0 });
      animate(content2.current, { x: prev ? -900 : 0 }, { delay: prev ? 0 : 0.2, bounce: 0 });
      return !prev;
    });
  }

  return (
    <div className="w-[900px] relative mx-auto overflow-x-clip">
      <div
        className="bg-slate-300 hover:bg-gray-300 w-[450px] h-[600px] p-4 left-0 z-10 absolute drop-shadow-lg rounded-md cursor-pointer"
        ref={cover1}
        onClick={handleCover1Click}
      >
        <h1 className="text-center text-3xl font-bold text-slate-600 mb-3">Старий Завіт</h1>
        <Image src="/sz.png" width={450} height={558} alt="Старий Завіт" className="rounded" />
      </div>
      <div
        className="bg-slate-300 hover:bg-gray-300 w-[450px] h-[600px] p-4 left-[450px] z-10 absolute drop-shadow-lg rounded-md cursor-pointer"
        ref={cover2}
        onClick={handleCover2Click}
      >
        <h1 className="text-center text-3xl font-bold text-slate-600 mb-3">Новий Завіт</h1>
        <Image src="/nz.png" width={450} height={558} alt="Новий Завіт" className="rounded" />
      </div>

      <div
        className="bg-slate-200 w-[450px] h-[600px] left-[-450px] py-4 absolute drop-shadow-lg rounded-md"
        ref={content1}
      >
        <div className="fixed overflow-y-auto top-5 bottom-10 left-10 right-2 inset-0">
          <div className="flex gap-12">
            <div>
              <h1 className="text-slate-700 font-bold text-lg">П&apos;ятикнижжя:</h1>
              <ul className="text-slate-800 pl-5 pb-3">
                {Object.entries(knyhySZ[0]).map((k, i: number) => (
                  <li key={i}>
                    <Link href={`/${k[0]}`} scroll={false}>
                      {Array.isArray(k[1]) ? k[1][0] : k[1]}
                    </Link>
                  </li>
                ))}
              </ul>

              <h1 className="text-slate-700 font-bold text-lg">Книги:</h1>
              <ul className="text-slate-800 pl-5 pb-3">
                {Object.entries(knyhySZ[1]).map((k, i: number) => (
                  <li key={i}>
                    <Link href={`/${k[0]}`} scroll={false}>
                      {Array.isArray(k[1]) ? k[1][0] : k[1]}
                    </Link>
                  </li>
                ))}
              </ul>

              <h1 className="text-slate-700 font-bold text-lg">Книги поетичні:</h1>
              <ul className="text-slate-800 pl-5 pb-3">
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
              <h1 className="text-slate-700 font-bold text-lg">Книги пророків:</h1>
              <ul className="text-slate-800 pl-5 pb-3">
                {Object.entries(knyhySZ[3]).map((k, i: number) => (
                  <li key={i}>
                    <Link href={`/${k[0]}`} scroll={false}>
                      {Array.isArray(k[1]) ? k[1][0] : k[1]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div
        className="bg-slate-200 w-[450px] left-[900px] h-[600px] py-4 absolute drop-shadow-lg rounded-md"
        ref={content2}
      >
        <div className="fixed overflow-y-auto top-5 bottom-10 left-5 right-2 inset-0">
          <div className="flex gap-12">
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
          </div>
        </div>
      </div>
    </div>
  );
}
