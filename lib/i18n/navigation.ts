import {createSharedPathnamesNavigation} from 'next-intl/navigation';
import locales from '@/lib/i18n/locales';

export const {Link, redirect, usePathname, useRouter} = createSharedPathnamesNavigation({
  locales
});