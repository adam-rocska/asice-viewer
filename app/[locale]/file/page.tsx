"use client";
import {FunctionComponent} from 'react';
import {PageProps} from '@/app/next-types';
import clsx from 'clsx';
import {useSearchParams} from 'next/navigation';
import {redirect} from '@/lib/i18n/navigation';
import {useTranslations} from 'next-intl';
import useFileStorage from '@/features/use-file-storage';
import {Skeleton} from '@nextui-org/react';

export default (() => {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const fileName = searchParams.get(t('features.fileViewer.queryStringParameter.name'));
  if (!fileName) return redirect("/files");

  const {file} = useFileStorage(fileName);

  return (
    <>
      <main className={clsx(
        'content mx-auto',
        'pt-8 pb-16 px-4',
        'prose dark:prose-invert max-w-none',
      )}>
        <Skeleton isLoaded={!!file}>
          <h1>
            {file?.name}
          </h1>
        </Skeleton>
      </main >
    </>
  );
}) satisfies FunctionComponent<PageProps>;
