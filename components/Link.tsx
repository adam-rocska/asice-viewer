import {LinkProps, Link as NextLink} from "@nextui-org/react";
import {forwardRef} from "react";
import {useLocale} from "next-intl";
import {KnownLocale, isKnownLocale} from "@/lib/i18n/locales";

export default forwardRef<HTMLAnchorElement, LinkProps>(function Link(p, ref) {
  const props = useLinkPropsFactory();
  return (
    <NextLink {...props(p)} ref={ref} />
  );
});


export function useLinkPropsFactory(defaultLocale?: KnownLocale) {
  const currentLocale = useLocale();

  return function linkPropsFactory<P extends LinkProps>(props: P): P {
    if (!props.href) return props;
    if (/.+?::/.test(props.href)) return props;

    const pathComponents = props.href.split('/').filter(Boolean);
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
    const locale = props.hrefLang ?? defaultLocale ?? currentLocale;

    if (pathComponents[0] !== basePath) pathComponents.unshift(basePath);
    if (!isKnownLocale(pathComponents[1])) pathComponents.splice(1, 0, locale);

    return {
      ...props,
      href: pathComponents.join('/'),
      hrefLang: locale
    };
  };
}
