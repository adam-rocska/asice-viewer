import createMiddleware from 'next-intl/middleware';
import locales from '@/lib/i18n/locales';
import pathnames from './lib/i18n/pathnames';
import {NextMiddleware} from "next/server";

const intlMiddleware = createMiddleware({
  locales,
  pathnames,
  defaultLocale: locales[0]
});

export default (function middleware(request) {
  const {pathname} = request.nextUrl;

  const shouldHandle =
    pathname === '/' ||
    new RegExp(`^/(${locales.join('|')})(/.*)?$`).test(
      request.nextUrl.pathname
    );
  if (!shouldHandle) return;

  return intlMiddleware(request);
}) satisfies NextMiddleware;