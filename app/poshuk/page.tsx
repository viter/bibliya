import { db } from '@/prisma';
import { Data } from '@/lib/types';

import type { JSX } from 'react';

interface SearchParamsProps {
  searchParams: Promise<{
    q: string;
    zavit?: string | undefined;
    k?: string[] | undefined;
  }>;
}

export default async function PoshukPage(props: SearchParamsProps): Promise<JSX.Element> {
  const searchParams = await props.searchParams;
  const { q, zavit, k } = searchParams;

  // remove all unnecessary whitespaces
  const words = q.replace(/\s\s+/g, ' ').trim().split(' ');
  console.log(words);

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
    //`+${words.join(' +')}`, // search by all words in the phrase
    //words.join(' '), // search by some words in the phrase
  ];

  for (const phrase of phrases) {
    const result = await getSearchResults(phrase, zavit, k);
    console.log(result);
    result.forEach((r) => {
      if (!resultsIds.includes(r.id)) {
        resultsIds.push(r.id);
        results.push({
          id: r.id,
          knyha: r.knyha,
          rozdil: r.rozdil,
          text: r.text.split('\n'),
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
    const res = await db.bibliya.findMany({
      where: {
        text: {
          search: phrase,
        },
      },
    });

    return res as Data[];
  }

  return (
    <>
      <p>{results.length}</p>
      {results.map((r) => (
        <div key={r.id} className="mb-10">
          <p>{r.knyha}</p>
          <p>{r.rozdil}</p>
          {r.text.map((line) => (
            <p>{line}</p>
          ))}
        </div>
      ))}
    </>
  );
}
