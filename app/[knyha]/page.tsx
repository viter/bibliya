import { db } from '@/lib/db';
import ScrollerScript from '@/components/ScrollerScript';
import Chapters from '@/components/Chapters';
import Contents from '@/components/Contents';
import KnyhaHeader from '@/components/KnyhaHeader';

type KnyhaParams = {
  params: { knyha: string };
};

export default async function Knyha({ params }: KnyhaParams): Promise<JSX.Element> {
  const data = await db.bibliya.findMany({
    where: {
      knyha: params.knyha,
    },
  });

  return (
    <>
      <KnyhaHeader knyha={params.knyha} />
      <main className="bg-slate-200">
        <Contents data={data} />
        <Chapters data={data} />
        <ScrollerScript />
      </main>
    </>
  );
}
