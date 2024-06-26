"use client";
import {FunctionComponent, Suspense} from 'react';
import {PageProps} from '@/app/next-types';
import TableView from "@/features/file-table";
import clsx from 'clsx';
import {useSearchParams} from 'next/navigation';
import {redirect} from '@/lib/i18n/navigation';
import {useTranslations} from 'next-intl';
import fileStorage from "@/db/file-storage";

export default (() => {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const fileName = searchParams.get(t('features.fileViewer.queryStringParameter.name'));
  if (!fileName) return redirect("/files");

  fileStorage.archives.get(fileName);

  return (
    <>
      <main className={clsx(
        'container mx-auto',
        'pt-8 pb-16 px-4',
        'prose dark:prose-invert',
      )}>
        <Suspense fallback={"Loading"}>
          <h1>
            Files
          </h1>
          <TableView className="not-prose" />
        </Suspense>
      </main>
    </>
  );
}) satisfies FunctionComponent<PageProps>;
