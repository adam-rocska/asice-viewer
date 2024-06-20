import {FunctionComponent} from "react";
import {KnownLocale} from "../i18n/locales";
import {getLocale} from "next-intl/server";
import {MDXRemote} from 'next-mdx-remote/rsc';
import {readFile} from "fs/promises";
import {resolve, sep} from "path";
import {existsSync} from "fs";

export type MDXLocalizedProps = {
  import: string,
  type?: 'md' | 'mdx',
  locale?: KnownLocale
};

export const MDXLocalized: FunctionComponent<MDXLocalizedProps> = async (props) => {
  const locale = props.locale ?? await getLocale();
  const type = props.type ?? 'md';
  const source = resolve(props.import, `${locale}.${type}`);

  const res = await readFile(source);
  const markdown = res.toString();
  return <MDXRemote source={markdown} />;
};

type LocalizedMdxIndexOptions = & Pick<MDXLocalizedProps, 'type'>;
type LocalizedMdxIndexProps = & Pick<MDXLocalizedProps, 'locale'>;
export const localizedMdxIndex = (
  importMetaUrl: string,
  options?: LocalizedMdxIndexOptions
) => {
  const importDir = importMetaUrl
    .split('file://')[1]
    .split(sep).slice(0, -1).join(sep);

  return (function LocalizedMdxIndex(props) {
    return <MDXLocalized
      import={importDir}
      type={options?.type}
      locale={props.locale}
    />;
  }) satisfies FunctionComponent<LocalizedMdxIndexProps>;
};