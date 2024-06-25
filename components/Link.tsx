import {LinkProps, Link as NextLink} from "@nextui-org/react";
import {forwardRef} from "react";
import {useLocale} from "next-intl";
import {isKnownLocale} from "@/lib/i18n/locales";

export default forwardRef<HTMLAnchorElement, LinkProps>(function Link(p, ref) {
  const href = useHref(p);
  return (
    <NextLink {...p} ref={ref} href={href} />
  );
});

/// MARK: This is a shameful piece of function to hack around the hora dance of NextUI-NextJS-NextIntl
function useHref(props: LinkProps): LinkProps["href"] {
  const currentLocale = useLocale();

  if (!props.href) return props.href;
  if (/.+?::/.test(props.href)) return props.href;

  const pathComponents = props.href.split('/').filter(Boolean);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
  const locale = props.hrefLang || currentLocale;

  if (pathComponents[0] !== basePath) pathComponents.unshift(basePath);
  if (!isKnownLocale(pathComponents[1])) pathComponents.splice(1, 0, locale);

  return pathComponents.join('/');
}