import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Knyha from '@/components/Knyha';
import { prisma } from '@/lib/prisma';
import { SITE_NAME } from '@/lib/site';
import { getKnyhaTitle, getKnyhaZavit } from '@/utils/knyhy';

type KnyhaParams = {
  params: Promise<{ knyha: string }>;
};

export async function generateMetadata(props: KnyhaParams): Promise<Metadata> {
  const { knyha } = await props.params;
  const title = getKnyhaTitle(knyha);
  if (!title) return {};

  const description = `${title} — ${getKnyhaZavit(knyha)}. Читайте онлайн у перекладі отця Івана Хоменка.`;

  return {
    title,
    description,
    alternates: { canonical: `/${knyha}` },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      locale: 'uk_UA',
      title: `${title} — ${SITE_NAME}`,
      description,
      url: `/${knyha}`,
    },
  };
}

export default async function KnyhaPage(props: KnyhaParams) {
  const params = await props.params;
  if (!getKnyhaTitle(params.knyha)) notFound();

  const data = await prisma.bibliya.findMany({
    where: {
      knyha: params.knyha,
    },
  });

  return <Knyha knyha={params.knyha} data={data} />;
}
