import {unstable_setRequestLocale} from 'next-intl/server';
import {FunctionComponent, ReactNode} from 'react';
import {LayoutProps} from '@/app/next-types';
import locales from '@/lib/i18n/locales';
import "./global.tw.css";
import Providers from './providers';

export default (async (p) => {
  unstable_setRequestLocale(p.params.locale);

  return (
    <html lang={p.params.locale}>
      <body className="">
        <Providers locale={p.params.locale}>
          {p.navbar}
          {p.children}
          {p.footer}
        </Providers>
      </body>
    </html>
  );
}) satisfies FunctionComponent<Props>;

export const generateStaticParams = () => locales.map((locale) => ({locale}));

type Props = LayoutProps & {
  navbar: ReactNode,
  footer: ReactNode
};