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
    <div className="container mx-auto bg-slate-300">
      <KnyhaHeader knyha={params.knyha} />
      <Contents data={data} />
      <Chapters data={data} />
      <ScrollerScript />
    </div>
  );
}
