import {useTranslations} from 'next-intl';
import {FunctionComponent} from 'react';
import {PageProps} from '@/app/next-types';
import {unstable_setRequestLocale} from 'next-intl/server';
import Contents from "./_contents";

export default (({params}) => {
  unstable_setRequestLocale(params.locale);
  const t = useTranslations('Index');

  return (
    <>
      <h1>{t('title')}</h1>
      <Contents locale={params.locale} />
    </>
  );
}) satisfies FunctionComponent<PageProps>;
