import {createSharedPathnamesNavigation} from 'next-intl/navigation';
import locales from '@/lib/i18n/locales';
import {InternalHref, isInternalHref} from '@/components/link';

const sharedPathnamesNavigation = createSharedPathnamesNavigation({locales});

export const redirect = sharedPathnamesNavigation.redirect;
export const useRouter = sharedPathnamesNavigation.useRouter;
export const permanentRedirect = sharedPathnamesNavigation.permanentRedirect;

export const usePathname = (): InternalHref => {
  const result = sharedPathnamesNavigation.usePathname();
  if (isInternalHref(result)) return result;
  console.warn(`usePathname: unexpected result: ${result}`);
  return result as InternalHref;
};
