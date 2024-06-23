import {FunctionComponent} from 'react';
import {PageProps} from '@/app/next-types';
import Content from "./_contents";
import {unstable_setRequestLocale} from 'next-intl/server';
import CallToAction from "./_contents/call-to-action";
import clsx from 'clsx';
import {Input} from '@nextui-org/react';

export default (({params}) => {
  unstable_setRequestLocale(params.locale);
  return (
    <main className={clsx(
      'bg-gradient-to-tl',
      'from-slate-50 to-slate-100 border-slate-200',
      'dark:from-slate-900 dark:to-slate-950 dark:border-slate-800',
    )}>
      <section className={clsx(
        'prose dark:prose-invert',
        'mx-auto',
        'border-1',
        'bg-gradient-to-br',
        'from-slate-50 to-slate-100 border-slate-200',
        'dark:from-slate-900 dark:to-slate-950 dark:border-slate-800',
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
