import {FunctionComponent} from 'react';
import {PageProps} from '@/app/next-types';
import TableView from "@/features/file-table";
import {unstable_setRequestLocale} from 'next-intl/server';
import clsx from 'clsx';

export default (({params}) => {
  unstable_setRequestLocale(params.locale);
  return (
    <>
      <main className={clsx(
        'container mx-auto',
        'pt-8 pb-16 px-4',
        'prose dark:prose-invert',
      )}>
        <h1>
          Files
        </h1>
        <TableView className="not-prose" />
      </main>
    </>
  );
}) satisfies FunctionComponent<PageProps>;
