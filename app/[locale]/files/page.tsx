import {FunctionComponent} from 'react';
import {PageProps} from '@/app/next-types';
import TableView from "@/features/file-table";
import {unstable_setRequestLocale} from 'next-intl/server';
import clsx from 'clsx';
import SecondaryNavbar from '@/components/secondary-navbar';
import {useTranslations} from 'next-intl';
import FileLoader from '@/features/file-loader';
import PaperPlus from '@/icons/paper-plus.svg';

export default (({params}) => {
  unstable_setRequestLocale(params.locale);
  const t = useTranslations();
  return (
    <>
      <SecondaryNavbar
        breadcrumb={[
          [t('navigation.page.files.title'), `/files`],
        ]}
      >
        <FileLoader color="primary" endContent={<PaperPlus className='size-fit' />}>
          {t('navigation.page.files.controls.openNewFile.label')}
        </FileLoader>
      </SecondaryNavbar>
      <main className={clsx(
        'container mx-auto',
        'pt-16 pb-32 px-4'
      )}>
        <TableView className="not-prose" />
      </main>
    </>
  );
}) satisfies FunctionComponent<PageProps>;
