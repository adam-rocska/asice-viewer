import {FunctionComponent} from 'react';
import {PageProps} from '@/app/next-types';
import {unstable_setRequestLocale} from 'next-intl/server';
import FileLoader from "@/features/file-loader";
import {useTranslations} from 'next-intl';
import {Navbar, NavbarContent} from '@nextui-org/react';
import Link from '@/components/link';

export default (p => {
  unstable_setRequestLocale(p.params.locale);
  const t = useTranslations();
  return (
    <Navbar
      classNames={{base: 'bg-content1/70'}}
      isBordered
      isBlurred
    >
      <NavbarContent justify="start">
        <Link href={"/files"} color="foreground">
          {t('navigation.page.files.title')}
        </Link>
      </NavbarContent>
      <NavbarContent justify="end">
        <FileLoader color="primary">
          {t('navigation.page.files.controls.openNewFile.label')}
        </FileLoader>
      </NavbarContent>
    </Navbar>
  );
}) satisfies FunctionComponent<PageProps>;
