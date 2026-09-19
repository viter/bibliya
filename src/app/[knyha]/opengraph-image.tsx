import { OG_SIZE, renderOgImage } from '@/lib/og-image';
import { SITE_NAME } from '@/lib/site';
import { getKnyhaTitle, getKnyhaZavit } from '@/utils/knyhy';

export const alt = SITE_NAME;
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ knyha: string }> }) {
  const { knyha } = await params;
  const title = getKnyhaTitle(knyha);
  if (!title) return renderOgImage(SITE_NAME, 'в перекладі о. Івана Хоменка');

  return renderOgImage(title, `${getKnyhaZavit(knyha)} · ${SITE_NAME}`);
}
