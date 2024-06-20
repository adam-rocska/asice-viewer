import {useTranslations} from 'next-intl';
import {FunctionComponent} from 'react';
import {PageProps} from '@/app/next-types';
import {unstable_setRequestLocale} from 'next-intl/server';
import Contents from "./_contents";

export default (({params}) => {
  unstable_setRequestLocale(params.locale);

  return (
    <>
      <Contents locale={params.locale} />
    </>
  );
}) satisfies FunctionComponent<PageProps>;
