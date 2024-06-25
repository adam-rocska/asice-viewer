"use client";
import locales, {KnownLocale} from "@/lib/i18n/locales";
import {FunctionComponent, PropsWithChildren} from "react";
import {useRouter} from '@/lib/i18n/navigation';
import {NextUIProvider} from '@nextui-org/react';
import {ThemeProvider as NextThemesProvider} from "next-themes";

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
      <NextUIProvider
        skipFramerMotionAnimations={false}
        // navigate={router.push}
        locale={p.locale}
        className="flex flex-col min-h-screen"
      >
        <NextThemesProvider attribute="class">
          {p.children}
        </NextThemesProvider>
      </NextUIProvider>
    </>
  );
}) satisfies FunctionComponent<Props>;
