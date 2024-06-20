"use client";
import {useTranslations} from 'next-intl';
import {FunctionComponent} from 'react';
import {PageProps} from '@/app/next-types';
import {unstable_setRequestLocale} from 'next-intl/server';
import {Button, Keyboard, Menu, MenuItem, MenuTrigger, Popover, Text} from 'react-aria-components';

export default (({params}) => {
  // unstable_setRequestLocale(params.locale);
  const t = useTranslations('Index');
  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Hello there</h1>
            <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
      {/* <h1>{t('title')}</h1>
      <Button className="btn btn-secondary">Secondary</Button> */}
    </>
  );
}) satisfies FunctionComponent<PageProps>;
