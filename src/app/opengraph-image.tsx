import { OG_SIZE, renderOgImage } from '@/lib/og-image';
import { SITE_NAME } from '@/lib/site';

export const alt = SITE_NAME;
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function Image() {
  return renderOgImage(SITE_NAME, 'в перекладі о. Івана Хоменка');
}
