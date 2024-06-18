import {FunctionComponent, PropsWithChildren} from 'react';
import {I18nProviderClient} from '../../locales/client';

export type Props = PropsWithChildren<{
  locale: string;
}>;

export default (({locale, children}) => {
  return (
    <I18nProviderClient locale={locale}>
      {children}
    </I18nProviderClient>
  );
}) satisfies FunctionComponent<Props>;