import {unstable_setRequestLocale} from 'next-intl/server';
import {FunctionComponent} from 'react';
import {LayoutProps} from '@/app/next-types';
import locales from '@/lib/i18n/locales';
import "./global.tw.css";
import Providers from './providers';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export default (async ({children, params}) => {
  unstable_setRequestLocale(params.locale);

  return (
    <html lang={params.locale}>
      <body>
        <Providers locale={params.locale}>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}) satisfies FunctionComponent<LayoutProps>;

export const generateStaticParams = () => locales.map((locale) => ({locale}));