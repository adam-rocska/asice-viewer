import {LayoutProps} from "@/app/next-types";
import {unstable_setRequestLocale} from "next-intl/server";
import {FunctionComponent} from "react";

export default (p => {
  unstable_setRequestLocale(p.params.locale);
  return (
    <>
      {p.children}
    </>
  );
}) satisfies FunctionComponent<LayoutProps>;