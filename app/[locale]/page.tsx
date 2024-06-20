"use client";
import {useTranslations} from 'next-intl';
import {FunctionComponent} from 'react';
import {PageProps} from '@/app/next-types';

export default (({params}) => {
  // unstable_setRequestLocale(params.locale);
  return (
    <>
      Hello.
    </>
  );
}) satisfies FunctionComponent<PageProps>;
