import {MetadataRoute} from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    host: process.env.NEXT_PUBLIC_BASE,
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: process.env.NEXT_PUBLIC_BASE
      + process.env.NEXT_PUBLIC_BASE_PATH
      + '/sitemap.xml',
  };
}
