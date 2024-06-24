import {FunctionComponent} from 'react';
import {PageProps} from '@/app/next-types';
import TableView from "./_table-view";
import {unstable_setRequestLocale} from 'next-intl/server';

export default (({params}) => {
  unstable_setRequestLocale(params.locale);
  return (
    <>
      <TableView />
    </>
  );
}) satisfies FunctionComponent<PageProps>;
