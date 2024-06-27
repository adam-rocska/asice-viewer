"use client";
import {FunctionComponent} from 'react';
import {PageProps} from '@/app/next-types';
import clsx from 'clsx';
import {useSearchParams} from 'next/navigation';
import {redirect} from '@/lib/i18n/navigation';
import {useTranslations} from 'next-intl';
import fileStorage from "@/db/file-storage";
import SecondaryNavbar from '@/components/secondary-navbar';
import {useLiveQuery} from 'dexie-react-hooks';
import useFileStorage from '@/features/use-file-storage';

export default (() => {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const fileName = searchParams.get(t('features.fileViewer.queryStringParameter.name'));
  if (!fileName) return redirect("/files");

  const file = useFileStorage(fileName);
  const archives = useLiveQuery(() => fileStorage.archives.toArray(), [], []);

  return (
    <>
      <SecondaryNavbar
        breadcrumb={[
          [
            "File",
            `/file?${t('features.fileViewer.queryStringParameter.name')}=${fileName}`,
            archives.map(({name}) => [
              name,
              `/file?${t('features.fileViewer.queryStringParameter.name')}=${name}`
            ])
          ],
        ]}
      >
      </SecondaryNavbar>
      <main className={clsx(
        'container mx-auto',
        'pt-8 pb-16 px-4',
        'prose dark:prose-invert',
      )}>

      </main >
    </>
  );
}) satisfies FunctionComponent<PageProps>;
