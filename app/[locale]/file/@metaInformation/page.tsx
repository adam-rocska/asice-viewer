import {FunctionComponent, lazy, Suspense} from 'react';
import {PageProps} from '@/app/next-types';
import {Card, CardBody, CardHeader, Skeleton} from '@nextui-org/react';
import StorageStatus from './storage-status';
import {unstable_setRequestLocale} from 'next-intl/server';

export default (p => {
  unstable_setRequestLocale(p.params.locale);
  return (
    <>
      <Card>
        <CardHeader>
          <h2 className='leading-tight my-0'>
            Storage Status
          </h2>
        </CardHeader>
        <CardBody>
          <Suspense fallback={
            <Skeleton
              className='w-full aspect-paper-A-horizontal'
            />
          }>
            <StorageStatus />
          </Suspense>
        </CardBody>
      </Card>
    </>
  );
}) satisfies FunctionComponent<PageProps>;
