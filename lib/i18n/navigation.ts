import {createLocalizedPathnamesNavigation} from 'next-intl/navigation';
import locales from '@/lib/i18n/locales';
import pathnames from './pathnames';

export const {redirect, usePathname, useRouter, permanentRedirect, getPathname} = createLocalizedPathnamesNavigation({
  locales,
  pathnames
});
