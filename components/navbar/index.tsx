"use client";
import {FunctionComponent, PropsWithChildren} from "react";
import {Link as LinkWrapper} from "@/lib/i18n/navigation";
import {Button, Link, Menu, MenuItem, MenuTrigger, Popover, Text} from "react-aria-components";
import {useTranslations} from "next-intl";
import Heart from "@/icons/heart.svg";
import {tv} from "tailwind-variants";

export type Props = PropsWithChildren;

const menu = tv({
  slots: {

  }
});

export default (p => {
  const t = useTranslations();
  return (
    <Menu className="navbar bg-base-100">
      <MenuItem href="/" className="navbar-start btn btn-ghost text-xl flex-1 whitespace-nowrap">
        {t('navigation.title')}
      </MenuItem>

      <MenuItem className="navbar-end flex-auto w-full">
        <Menu className="menu menu-horizontal px-1 gap-4">
          <MenuItem className="btn">
            {t('navigation.menu.about.title')}
          </MenuItem>
          <MenuItem className="btn">
            {t('navigation.menu.features.title')}
          </MenuItem>
          <MenuItem className="btn">
            {t('navigation.menu.about.title')}
          </MenuItem>
        </Menu>
      </MenuItem>
    </Menu>
  );
}) satisfies FunctionComponent<Props>;
