import {FunctionComponent} from 'react';
import {PageProps} from '@/app/next-types';
import Content from "./_contents";
import {unstable_setRequestLocale} from 'next-intl/server';

export default (({params}) => {
  unstable_setRequestLocale(params.locale);
  return (
    <Content />
  );
}) satisfies FunctionComponent<PageProps>;
