"use client"
import {createI18nClient} from 'next-international/client';
import messages from '.';

export const {useI18n, useScopedI18n, I18nProviderClient} = createI18nClient({
  ...messages
}, {
  basePath: '/asice-viewer'
});