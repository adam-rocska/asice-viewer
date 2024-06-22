import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
import locales, {KnownLocale} from './locales';

export default getRequestConfig(async ({locale}) => {
  if (!locales.includes(locale as KnownLocale)) notFound();
  return {
    messages: (await import(`@/messages/${locale}.json`)).default
  };
});