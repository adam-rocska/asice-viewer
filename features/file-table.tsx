"use client";
import {FunctionComponent, useCallback, useMemo, useState} from 'react';
import {Spacer, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableProps, TableRow, Selection, Dropdown, DropdownTrigger, Button, DropdownMenu, DropdownItem, Tooltip} from '@nextui-org/react';
import useFileList from './use-file-list';
import {useFormatter, useTranslations} from 'next-intl';
import byteFormatter from '@/lib/byte-formatter';
import {useIsClient} from 'usehooks-ts';
import clsx from 'clsx';
import FileLoader from './file-loader';
import PaperPlus from "@/icons/paper-plus.svg";
import MoreSquare from "@/icons/more-square.svg";
import {useLinkPropsFactory} from '@/components/link';
import fileStorage from "@/db/file-storage";
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
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set());
  const renderCell = useCallback(
    (file: File, key: string) => {
      switch (key) {
        case "name": return file.name;
        case "lastModified": return formatter.dateTime(new Date(file.lastModified));
        case "size": return byteFormatter.format(file.size);
        case "actions": return (
          <Tooltip
            content={t('features.fileTable.controls.deleteFile.explanation')}
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
              <TrashCan className='w-fit h-fit' />
            </Button>
          </Tooltip>
        );
        default: return null;
      }
    },
    [formatter]
  );

  const controls = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Spacer />
          <FileLoader color="primary" endContent={<PaperPlus />}>
            {t('features.fileTable.controls.openNewFile')}
          </FileLoader>
        </div>
      </div>
    );
  }, [t]);

  return (
    <Table
      aria-label={"Files loaded in this browser"}
      isHeaderSticky

      selectedKeys={selectedKeys}
      onSelectionChange={setSelectedKeys}
      selectionMode="multiple"

      topContent={controls}
      topContentPlacement="outside"

      sortDescriptor={fileList.sortDescriptor}
      onSortChange={fileList.sort}

      className={clsx(p.className, "max-h-96")}
      isStriped
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
            {...linkProps({href: `/file?${t('features.fileViewer.queryStringParameter.name')}=${item.name}`})}
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
