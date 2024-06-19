import {Locale} from "@/lib/i18n/locales";
import {PropsWithChildren} from "react";

export type PageProps = {
  params: {
    locale: Locale;
  }
};
export type LayoutProps = PropsWithChildren<PageProps>;