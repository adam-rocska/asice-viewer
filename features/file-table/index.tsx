"use client";
import {FunctionComponent, useCallback} from 'react';
import {Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableProps, TableRow} from '@nextui-org/react';
import useFileList from './use-file-list';
import {useFormatter, useTranslations} from 'next-intl';
import byteFormatter from '@/lib/byte-formatter';
import {useIsClient} from 'usehooks-ts';

type Props = {
  className?: TableProps["className"];
};

export default (p => {
  const isClient = useIsClient();
  const fileList = useFileList();
  const formatter = useFormatter();
  const t = useTranslations();
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
    {key: "name", label: t('features.fileTable.columnLabel.fileName')},
    {key: "lastModified", label: t('features.fileTable.columnLabel.lastModified')},
    {key: "size", label: t('features.fileTable.columnLabel.fileSize')},
  ];

  return (
    <Table
      aria-label={"Files loaded in this browser"}
      sortDescriptor={fileList.sortDescriptor}
      onSortChange={fileList.sort}
      className={p.className}
      isStriped
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
        loadingContent={<Spinner label={t('features.fileTable.loading')} />}
        emptyContent={t('features.fileTable.noFilesToDisplay')}
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
}) satisfies FunctionComponent<Props>;

type Column = {key: keyof File, label: string, };