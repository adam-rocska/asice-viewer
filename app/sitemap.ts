import {MetadataRoute} from 'next';
import {getPathname} from '@/lib/i18n/navigation';
import locales from '@/lib/i18n/locales';
import pathnames from '@/lib/i18n/pathnames';

// Adapt this as necessary
const host = process.env.NEXT_PUBLIC_BASE + process.env.NEXT_PUBLIC_BASE_PATH;

export default function sitemap(): MetadataRoute.Sitemap {
  const keys = Object.keys(pathnames) as Array<keyof typeof pathnames>;

  function getUrl(
    key: keyof typeof pathnames,
    locale: (typeof locales)[number]
  ) {
    const pathname = getPathname({locale, href: key});
    return `${host}/${locale}${pathname === '/' ? '' : pathname}`;
  }

  return keys.map((key) => ({
    url: getUrl(key, locales[0]),
    lastModified: new Date(),
    alternates: {
      languages: Object.fromEntries(
        locales.map((locale) => [locale, getUrl(key, locale)])
      )
    }
  }));
}