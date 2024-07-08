import {FunctionComponent} from 'react';
import {PageProps} from '@/app/next-types';
import clsx from 'clsx';
import {unstable_setRequestLocale} from 'next-intl/server';

export default (p => {
  unstable_setRequestLocale(p.params.locale);
  return (
    <>
      <main className={clsx(
        'content mx-auto',
        'pt-8 pb-16 px-4',
        'prose dark:prose-invert max-w-none',
      )}>
        ARCHIVE
      </main >
    </>
  );
}) satisfies FunctionComponent<PageProps>;
