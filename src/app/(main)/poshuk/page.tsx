import { ScrollArea } from '@/components/ui/scroll-area';
import { prisma } from '@/lib/prisma';
import { Data } from '@/lib/types';
import { parseVerseLine, verseAnchorId } from '@/lib/verse';
import { knyhy } from '@/utils/knyhy';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';

import type { JSX } from 'react';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Пошук',
  robots: { index: false },
};

function highlightLine(line: string, words: string[]): ReactNode[] {
  const escaped = words
    .map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .sort((a, b) => b.length - a.length);
  const re = new RegExp(`(${escaped.join('|')})`, 'gi');
  return line.split(re).map((part, i) =>
    words.some((w) => part.toLowerCase() === w.toLowerCase()) ? (
      <mark
        key={i}
        className="bg-yellow-200 dark:bg-yellow-800 text-accent-foreground rounded px-0.5"
      >
        {part}
      </mark>
    ) : (
      part
    ),
  );
}

interface SearchParamsProps {
  searchParams: Promise<{
    q?: string | string[] | undefined;
    zavit?: string | undefined;
    k?: string | string[] | undefined;
  }>;
}

export default async function PoshukPage(props: SearchParamsProps): Promise<JSX.Element> {
  const searchParams = await props.searchParams;
  const { zavit } = searchParams;
  // repeated `q` params arrive as an array, use the first one
  const q = [searchParams.q].flat()[0]?.trim();
  // a single `k` param arrives as a string, multiple as an array
  const k = searchParams.k === undefined ? undefined : [searchParams.k].flat();

  // nothing to search for, show the main page
  if (!q) redirect('/');

  // remove all unnecessary whitespaces
  const words = q.replace(/\s\s+/g, ' ').trim().split(' ');

  const resultsIds: number[] = [];

  const results: {
    id: number;
    knyha: string;
    rozdil: string;
    text: string[];
    zavit: string;
  }[] = [];

  const phrases = [
    `"${words.join(' ')}"`, // search by the whole phrase
    `+${words.join(' +')}`, // search by all words in the phrase
    words.join(' '), // search by some words in the phrase
  ];

  for (const phrase of phrases) {
    const result = await getSearchResults(phrase, zavit, k);
    result.forEach((r) => {
      if (!resultsIds.includes(r.id)) {
        resultsIds.push(r.id);
        results.push({
          id: r.id,
          knyha: r.knyha,
          rozdil: r.rozdil,
          text: r.text.split(/\r\n|\r|\n/),
          zavit: r.zavit,
        });
      }
    });
  }

  async function getSearchResults(
    phrase: string,
    zavit: string | undefined,
    knyha: string[] | undefined,
  ) {
    const res = await prisma.bibliya.findMany({
      where: {
        text: {
          search: phrase,
        },
        ...(zavit ? { zavit } : {}),
        ...(knyha && knyha.length > 0 ? { knyha: { in: knyha } } : {}),
      },
    });

    return res as Data[];
  }

  const lineMatches = (line: string) => {
    const lowerLine = line.toLowerCase();
    return words.some((word) => lowerLine.includes(word.toLowerCase()));
  };

  // a full-text hit may have no line containing the literal words, so only count results we can show
  const visibleResults = results.filter((r) => r.text.some(lineMatches));

  return (
    <div className="relative">
      <div className="lg:shadow-md w-full bg-card p-1 xl:p-10 2xl:p-15 rounded-lg h-[calc(100dvh-10rem)] overflow-hidden">
        <ScrollArea
          className="h-full w-full pr-3"
          scrollbarClassName="opacity-0 data-[hovering]:opacity-100 data-[scrolling]:opacity-100"
        >
          <p className="text-center text-2xl mb-5">Результати пошуку</p>
          {visibleResults.length === 0 && (
            <p className="text-center text-muted-foreground">
              За запитом «{words.join(' ')}» нічого не знайдено. Перевірте написання або спробуйте
              інші слова чи ширшу область пошуку.
            </p>
          )}
          {visibleResults.map((r) => (
            <div key={r.id} className="mb-10">
              <p className="text-xl font-semibold text-muted-foreground mb-2">
                {Array.isArray(knyhy[r.knyha].title) && knyhy[r.knyha].title.length > 1
                  ? knyhy[r.knyha].title[1]
                  : knyhy[r.knyha].title}
              </p>
              <p className="italic text-md font-semibold mb-1">{r.rozdil}</p>
              {r.text.map((line, i) => {
                if (!lineMatches(line)) return null;

                const verse = parseVerseLine(line);
                const href = verse
                  ? `/${r.knyha}#${verseAnchorId(r.id, verse.num)}`
                  : `/${r.knyha}`;

                return (
                  <Link href={href} key={i} target="_blank">
                    {highlightLine(line, words)}
                  </Link>
                );
              })}
            </div>
          ))}
        </ScrollArea>
      </div>
    </div>
  );
}
