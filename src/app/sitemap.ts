import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';
import { knyhaSlugs } from '@/utils/knyhy';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/dopomoha`, changeFrequency: 'yearly', priority: 0.3 },
    ...knyhaSlugs.map((slug) => ({
      url: `${SITE_URL}/${slug}`,
      changeFrequency: 'yearly' as const,
      priority: 0.8,
    })),
  ];
}
