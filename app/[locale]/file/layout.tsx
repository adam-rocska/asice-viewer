import {LayoutProps} from "@/app/next-types";
import SecondaryNavbar from "@/components/secondary-navbar";
import FileLoader from "@/features/file-loader";
import clsx from "clsx";
import {useTranslations} from "next-intl";
import {unstable_setRequestLocale} from "next-intl/server";
import {FunctionComponent, ReactNode} from "react";

export default (p => {
  unstable_setRequestLocale(p.params.locale);
  const t = useTranslations();
  return (
    <>
      <SecondaryNavbar
        breadcrumb={[
          [t('navigation.page.files.title'), `/files`],
        ]}
      >
        <FileLoader color="primary">
          {t('navigation.page.files.controls.openNewFile.label')}
        </FileLoader>
      </SecondaryNavbar>
      <main className={clsx(
        "container mx-auto",
        "flex flex-row gap-4",
        'prose dark:prose-invert max-w-7xl',
        'pt-8 pb-16 px-4'
      )}>
        <section className="flex-auto">
          {p.children}
        </section>
        {p.metaInformation && (
          <section className="w-3/12">
            {p.metaInformation}
          </section>
        )}
      </main>
    </>
  );
}) satisfies FunctionComponent<Props>;

type Props = LayoutProps & {
  metaInformation: ReactNode
};