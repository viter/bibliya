import Knyha from '@/components/Knyha';
import { prisma } from '@/lib/prisma';

type KnyhaParams = {
  params: Promise<{ knyha: string }>;
};

export default async function KnyhaPage(props: KnyhaParams) {
  const params = await props.params;
  const data = await prisma.bibliya.findMany({
    where: {
      knyha: params.knyha,
    },
  });

  return <Knyha knyha={params.knyha} data={data} />;
}
