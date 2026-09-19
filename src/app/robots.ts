import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/poshuk',
        '/tsytaty',
        '/uviyty',
        '/reyestratsiya',
        '/zabuly-parol',
        '/skynuty-parol',
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
