import {NextIntlClientProvider} from 'next-intl';
import {getMessages, unstable_setRequestLocale} from 'next-intl/server';
import {FunctionComponent} from 'react';
import {LayoutProps} from '@/app/next-types';
import locales from '@/lib/i18n/locales';

export default (async ({children, params}) => {
  unstable_setRequestLocale(params.locale);
  const messages = await getMessages();

  return (
    <html lang={params.locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}) satisfies FunctionComponent<LayoutProps>;

export const generateStaticParams = () => locales.map((locale) => ({locale}));