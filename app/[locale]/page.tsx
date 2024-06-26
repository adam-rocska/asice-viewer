import {FunctionComponent} from 'react';
import {PageProps} from '@/app/next-types';
import Content from "./_contents";
import {unstable_setRequestLocale} from 'next-intl/server';
import CallToAction from "./_contents/call-to-action";
import clsx from 'clsx';

export default (({params}) => {
  unstable_setRequestLocale(params.locale);
  return (
    <main className={clsx(
      'bg-gradient-to-tl',
      'from-background to-content1 border-divider',
    )}>
      <section className={clsx(
        'prose dark:prose-invert',
        'mx-auto',
        'border-1 rounded-lg',
        'bg-gradient-to-br',
        'from-content1 to-background border-divider',
        'px-[6cqw] py-[6cqh]',
        'mt-12 mb-24'
      )}>
        <Content components={{
          CallToAction
        }} />
      </section>
    </main>
  );
}) satisfies FunctionComponent<PageProps>;
