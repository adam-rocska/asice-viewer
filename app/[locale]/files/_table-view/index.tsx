"use client";
import {FunctionComponent, useCallback} from 'react';
import {PageProps} from '@/app/next-types';
import {Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from '@nextui-org/react';
import useFileList from './use-file-list';
import {useFormatter} from 'next-intl';
import byteFormatter from '@/lib/byte-formatter';
import {useIsClient} from 'usehooks-ts';

export default (() => {
  const isClient = useIsClient();
  const fileList = useFileList();
  const formatter = useFormatter();
  const renderCell = useCallback(
    (file: File, key: keyof File) => {
      switch (key) {
        case "name": return file.name;
        case "lastModified": return formatter.dateTime(new Date(file.lastModified));
        case "size": return byteFormatter.format(file.size);
        default: return null;
      }
    },
    [formatter]
  );

  const columns: Column[] = [
    {key: "name", label: "Name"},
    {key: "lastModified", label: "Last Modified"},
    {key: "size", label: "Size"},
  ];

  return (
    <Table
      aria-label="Example table with client side sorting"
      sortDescriptor={fileList.sortDescriptor}
      onSortChange={fileList.sort}
      classNames={{table: "min-h-[400px]", }}
    >
      <TableHeader columns={columns}>
        {({key, label}) => (
          <TableColumn key={key} allowsSorting>
            {label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        items={fileList.items}
        isLoading={!isClient || fileList.isLoading}
        loadingContent={<Spinner label="Loading..." />}
      >
        {(item) => (
          <TableRow key={item.name}>
            {(columnKey) => (
              <TableCell>
                {renderCell(item, columnKey as keyof File)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}) satisfies FunctionComponent<PageProps>;

type Column = {key: keyof File, label: string, };