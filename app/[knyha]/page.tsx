import Knyha from '@/components/Knyha';
import { db } from '@/lib/db';

type KnyhaParams = {
  params: { knyha: string };
};

export default async function KnyhaPage({ params }: KnyhaParams): Promise<JSX.Element> {
  const data = await db.bibliya.findMany({
    where: {
      knyha: params.knyha,
    },
  });

  return <Knyha knyha={params.knyha} data={data} />;
}
