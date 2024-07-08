import {FunctionComponent} from 'react';
import {PageProps} from '@/app/next-types';
import {unstable_setRequestLocale} from 'next-intl/server';

export default (p => {
  unstable_setRequestLocale(p.params.locale);
  return null;
}) satisfies FunctionComponent<PageProps>;
