"use client";
import {FunctionComponent} from 'react';
import {PageProps} from '@/app/next-types';
import FileTable from "@/features/asice-table";

export default (() => {

  return (
    <>
      <main>
        <FileTable className="not-prose" />
      </main >
    </>
  );
}) satisfies FunctionComponent<PageProps>;
