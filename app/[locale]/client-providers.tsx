"use client";
import {KnownLocale} from "@/lib/i18n/locales";
import {FunctionComponent, PropsWithChildren} from "react";
import {NextUIProvider} from '@nextui-org/react';
import {ThemeProvider as NextThemesProvider} from "next-themes";

export type Props = PropsWithChildren<{
  locale: KnownLocale
}>;

export default (async p => {
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
