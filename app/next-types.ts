import {KnownLocale} from "@/lib/i18n/locales";
import {PropsWithChildren} from "react";

export type PageProps = {
  params: {
    locale: KnownLocale;
  }
};
export type LayoutProps = PropsWithChildren<PageProps>;