"use client";
import {FunctionComponent, useCallback, useMemo} from 'react';
import {Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableProps, TableRow, Button, Tooltip, Spacer} from '@nextui-org/react';
import useFileList from './use-asice-list';
import {useFormatter, useTranslations} from 'next-intl';
import * as byteFormatter from '@/lib/byte-formatter';
import {useIsClient} from 'usehooks-ts';
import clsx from 'clsx';
import {useLinkPropsFactory} from '@/components/link';
import fileStorage from "@/db/asice-storage";
import TrashCan from "@/icons/trash-can.svg";

type Props = {
  className?: TableProps["className"];
};

export default (p => {
  const isClient = useIsClient();
  const fileList = useFileList();
  const formatter = useFormatter();
  const t = useTranslations();
  const linkProps = useLinkPropsFactory();
  const renderCell = useCallback(
    (file: File, key: string) => {
      switch (key) {
        case "name": return file.name;
        case "lastModified": return formatter.dateTime(new Date(file.lastModified));
        case "size": return byteFormatter.format(file.size);
        case "actions": return (
          <Tooltip
            content={t('features.fileTable.controls.deleteFile.tooltip')}
            color="danger"
            showArrow
          >
            <Button
              isIconOnly
              size="md"
              variant='light'
              color="danger"
              onPress={() => fileStorage.archives.delete(file.name)}
              aria-label={t('features.fileTable.controls.deleteFile.label')}
            >
              <TrashCan className='size-6' />
            </Button>
          </Tooltip>
        );
        default: return null;
      }
    },
    [formatter, t]
  );

  const controls = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Spacer />
          <Tooltip
            content={t('features.fileTable.controls.deleteSelectedFile.tooltip', {
              count: fileList.selectedKeys === 'all'
                ? Number.POSITIVE_INFINITY
                : fileList.selectedKeys.size,
            })}
            color="danger"
            isDisabled
          >
            <Button
              onPress={() => {
                if (fileList.selectedKeys === 'all') {
                  fileStorage.archives.clear();
                } else {
                  fileList.selectedKeys.forEach(key => {
                    if (typeof key === 'number') return;
                    fileStorage.archives.delete(key);
                  });
                }
              }}
              variant="light"
              color="danger"
              isDisabled={fileList.selectedKeys !== 'all' && fileList.selectedKeys.size === 0}
              endContent={<TrashCan className='size-6' />}
            >
              {t('features.fileTable.controls.deleteSelectedFile.label', {
                count: fileList.selectedKeys === 'all'
                  ? Number.POSITIVE_INFINITY
                  : fileList.selectedKeys.size,
              })}
            </Button>
          </Tooltip>
        </div>
      </div>
    );
  }, [fileList.selectedKeys, t]);

  return (
    <Table
      aria-label={"Files loaded in this browser"}
      isHeaderSticky

      selectedKeys={fileList.selectedKeys}
      onSelectionChange={fileList.setSelectedKeys}
      selectionMode="multiple"

      topContent={controls}
      topContentPlacement="inside"

      sortDescriptor={fileList.sortDescriptor}
      onSortChange={fileList.sort}

      className={clsx(p.className, "max-h-96")}
    >
      <TableHeader>
        <TableColumn allowsSorting key="name"> {t('features.fileTable.columnLabel.fileName')}</TableColumn>
        <TableColumn allowsSorting key="lastModified"> {t('features.fileTable.columnLabel.lastModified')}</TableColumn>
        <TableColumn allowsSorting key="size"> {t('features.fileTable.columnLabel.fileSize')}</TableColumn>
        <TableColumn allowsSorting key="actions"> {t('features.fileTable.columnLabel.actions')}</TableColumn>
      </TableHeader>
      <TableBody
        items={fileList.items}
        isLoading={!isClient || fileList.isLoading}
        loadingContent={<Spinner label={t('features.fileTable.loading')} />}
        emptyContent={t('features.fileTable.noFilesToDisplay')}
      >
        {(item) => (
          <TableRow
            key={item.name}
            {...linkProps({href: `/files?${t('features.fileViewer.queryStringParameter.name')}=${item.name}`})}
          >
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
