import {FunctionComponent} from 'react';
import {PageProps} from '@/app/next-types';
import {unstable_setRequestLocale} from 'next-intl/server';
import Content from "./_contents";

export default (({params}) => {
  unstable_setRequestLocale(params.locale);

  return (
    <>
      <Content locale={params.locale} />
    </>
  );
}) satisfies FunctionComponent<PageProps>;
