import {KnownLocale} from "@/lib/i18n/locales";
import {FunctionComponent, PropsWithChildren} from "react";
import {LocalizedStringProvider} from 'react-aria/i18n';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from "next-intl/server";
import ClientProviders from "./client-providers";

export type Props = PropsWithChildren<{
  locale: KnownLocale
}>;

export default (async p => {
  const messages = await getMessages();
  return (
    <>
      <LocalizedStringProvider locale={p.locale as string} />
      <NextIntlClientProvider messages={messages}>
        <ClientProviders locale={p.locale}>
          {p.children}
        </ClientProviders>
      </NextIntlClientProvider>
    </>
  );
}) satisfies FunctionComponent<Props>;