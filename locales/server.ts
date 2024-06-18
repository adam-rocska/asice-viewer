import {createI18nServer} from 'next-international/server';
import messages from '.';

export const {getI18n, getScopedI18n, getStaticParams} = createI18nServer({
  ...messages
});