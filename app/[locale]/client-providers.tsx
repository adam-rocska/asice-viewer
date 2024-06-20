"use client";
import locales, {KnownLocale} from "@/lib/i18n/locales";
import {FunctionComponent, PropsWithChildren} from "react";
import {I18nProvider} from "react-aria";
import {useRouter} from '@/lib/i18n/navigation';
import {RouterProvider} from 'react-aria-components';

export type Props = PropsWithChildren<{
  locale: KnownLocale
}>;

export default (async p => {
  const localePrefixes = locales.map(l => l === 'en' ? '' : `/${l}`);
  const router = useRouter();
  const useHref = (href: string) => process.env.NEXT_PUBLIC_BASE_PATH
    + (localePrefixes.some(prefix => href.startsWith(prefix)) ? `/${p.locale}` : '')
    + href;

  return (
    <>
      <I18nProvider locale={p.locale}>
        <RouterProvider
          navigate={router.push}
          useHref={useHref}
        >
          {p.children}
        </RouterProvider>
      </I18nProvider>
    </>
  );
}) satisfies FunctionComponent<Props>;


declare module 'react-aria-components' {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>['push']>[1]
    >;
  }
}
