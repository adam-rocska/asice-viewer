import {LinkProps, Link as NextLink} from "@nextui-org/react";
import {forwardRef} from "react";
import {useLocale} from "next-intl";
import {KnownLocale, isKnownLocale} from "@/lib/i18n/locales";
import {Except} from "type-fest";
import pathnames, {Pathname} from "@/app/pathnames";

export default forwardRef<HTMLAnchorElement, KnownLinkProps>(function Link(p, ref) {
  const props = useLinkPropsFactory();
  return (
    <NextLink {...props(p)} ref={ref} />
  );
});

export function useLinkPropsFactory(defaultLocale?: KnownLocale) {
  // MARK: yea, it's a force cast, but gotta live with it...
  const currentLocale = useLocale() as KnownLocale;

  return function linkPropsFactory<P extends KnownLinkProps>(props: P): P {
    if (!props.href) return props;
    if (isExternalHref(props.href)) return {...props, isExternal: true, showAnchorIcon: true};

    const pathComponents = props.href.split('/').filter(Boolean);
    const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? '')
      .replace(/^\/+/, "")
      .replace(/\/$/, "");
    const locale = props.hrefLang ?? defaultLocale ?? currentLocale;

    if (pathComponents[0] === basePath) pathComponents.shift();
    if (isKnownLocale(pathComponents[0])) pathComponents.shift();

    return {
      ...props,
      href: ['', basePath, locale, ...pathComponents].join('/'),
      hrefLang: locale
    };
  };
}

export type KnownLinkProps =
  & Except<
    LinkProps,
    | 'href'
    | 'hrefLang'
  >
  & {
    href?: Href;
    hrefLang?: KnownLocale;
  };

export type Href =
  | InternalHref
  | ExternalHref;
export function isHref(candidate: string): candidate is Href {
  return isInternalHref(candidate) || isExternalHref(candidate);
}

export type InternalHref =
  | `#${string}`
  | `?${string}`
  | Pathname
  | `${Pathname}?${string}`
  | `${Pathname}#${string}`;
export function isInternalHref(candidate: string): candidate is InternalHref {
  if (isExternalHref(candidate)) return false;
  if (candidate.startsWith('#')) return true;
  if (candidate.startsWith('?')) return true;
  const paths: readonly string[] = pathnames;
  const hashPaths = paths.map(path => `${path}#`);
  const queryPaths = paths.map(path => `${path}?`);
  if (paths.includes(candidate)) return true;
  if (hashPaths.some(path => candidate.startsWith(path))) return true;
  if (queryPaths.some(path => candidate.startsWith(path))) return true;

  const localePrefix = new RegExp(`^\/(${paths.join('|')}\/)`);
  const isLocalized = localePrefix.test(candidate);
  if (isLocalized) return isInternalHref(candidate.replace(localePrefix, '/'));

  return false;
}

export type ExternalHref = | `${string}://${string}`;
export function isExternalHref(candidate: string): candidate is ExternalHref {
  return /.+?:\/\//.test(candidate);
}