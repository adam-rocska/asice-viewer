import createMiddleware from 'next-intl/middleware';
import locales from '@/lib/i18n/locales';

export default createMiddleware({
  locales,
  defaultLocale: locales[0]
});

export const config = {
  matcher: ['/', `/(${locales.join('|')})/:path*`]
};