import {FunctionComponent} from "react";
import {KnownLocale} from "../i18n/locales";
import {getLocale} from "next-intl/server";
import {MDXRemote, MDXRemoteProps} from 'next-mdx-remote/rsc';
import {readFile} from "fs/promises";
import {resolve, sep} from "path";

export type MDXLocalizedProps = {
  import: string,
  type?: 'md' | 'mdx',
  locale?: KnownLocale,
  components?: MDXRemoteProps["components"]
};

export const MDXLocalized: FunctionComponent<MDXLocalizedProps> = async (p) => {
  const locale = p.locale ?? await getLocale();
  const type = p.type ?? 'md';
  const source = resolve(p.import, `${locale}.${type}`);

  const res = await readFile(source);
  const content = res.toString();

  return <MDXRemote source={content} components={p.components} />;
};

type LocalizedMdxIndexOptions = & Pick<MDXLocalizedProps, 'type'>;
type LocalizedMdxIndexProps = & Pick<MDXLocalizedProps, 'locale' | 'components'>;
export const localizedMdxIndex = (
  importMetaUrl: string,
  options?: LocalizedMdxIndexOptions
) => {
  const importDir = importMetaUrl
    .split('file://')[1]
    .split(sep).slice(0, -1).join(sep);

  return (function LocalizedMdxIndex(p) {
    return <MDXLocalized
      import={importDir}
      type={options?.type}
      locale={p.locale}
      components={p.components}
    />;
  }) satisfies FunctionComponent<LocalizedMdxIndexProps>;
};