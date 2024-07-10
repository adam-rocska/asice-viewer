"use client";
import {FunctionComponent} from 'react';
import {PageProps} from '@/app/next-types';
import FileTable from "@/features/asice-table";
import {useSearchParams} from 'next/navigation';
import {useTranslations} from 'next-intl';
import useFileStorage from '@/features/use-asice-storage';
import AsiceBrowser from '@/features/asice-browser';

export default (() => {
  const searchParams = useSearchParams();
  const t = useTranslations();
  const archiveName = searchParams.get(t('features.fileViewer.queryStringParameter.name'));
  const {file} = useFileStorage(archiveName);
  return (
    <>
      <FileTable className="not-prose" />
      <AsiceBrowser file={file} />
    </>
  );
}) satisfies FunctionComponent<PageProps>;
