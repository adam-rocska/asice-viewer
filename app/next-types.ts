import {PropsWithChildren} from "react";

export type PageProps = {
  params: {
    locale: string;
  }
};
export type LayoutProps = PropsWithChildren<PageProps>;
