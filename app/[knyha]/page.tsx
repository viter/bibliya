import Knyha from '@/components/Knyha';
import { db } from '@/prisma';

import type { JSX } from 'react';

type KnyhaParams = {
  params: Promise<{ knyha: string }>;
};

export default async function KnyhaPage(props: KnyhaParams): Promise<JSX.Element> {
  const params = await props.params;
  const data = await db.bibliya.findMany({
    where: {
      knyha: params.knyha,
    },
  });

  debugger;

  return <Knyha knyha={params.knyha} data={data} />;
}
