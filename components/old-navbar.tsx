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
    <header className="navbar bg-base-100">
      <div className="navbar-start">
        <LinkWrapper href="/" passHref legacyBehavior>
          <Link
            className="btn btn-ghost text-xl"
          >
            {t('navigation.title')}
          </Link>
        </LinkWrapper>
      </div>

      <div className="navbar-end">
        <MenuTrigger>
          <Button className={'menu-dropdown-toggle'}>
            {t('navigation.menu.about.title')}
          </Button>
          <Popover>
            <Menu className="menu  bg-base-200 max-w-72 rounded-box gap-4 shadow-lg">
              <MenuItem className="grid grid-cols-2 grid-rows-2 rounded-box  p-4 hover:bg-base-100">
                <div className="w-9 h-9 row-span-2 justify-self-center self-center">
                  <Heart />
                </div>
                <Text slot="label" className="menu-title justify-self-start self-end">
                  {t('navigation.menu.about.tool.title')}
                </Text>
                <Text slot="description" className="justify-self-start self-start">
                  {t('navigation.menu.about.tool.description')}
                </Text>
              </MenuItem>
            </Menu>
          </Popover>
        </MenuTrigger>

        <ul className="menu menu-horizontal px-1">
          <li>
            <details>
              <summary>
                {t('navigation.menu.about.title')}
              </summary>
              <ul>
                <li>
                  <LinkWrapper href="/about/the-tool" passHref legacyBehavior>
                    <Link>
                      {t('navigation.menu.about.tool.title')}
                    </Link>
                  </LinkWrapper>
                </li>
                <li>
                  <LinkWrapper href="/about/the-format" passHref legacyBehavior>
                    <Link>
                      {t('navigation.menu.about.format.title')}
                    </Link>
                  </LinkWrapper>
                </li>
                <li>
                  <LinkWrapper href="/about/the-creator" passHref legacyBehavior>
                    <Link>
                      {t('navigation.menu.about.creator.title')}
                    </Link>
                  </LinkWrapper>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <details>
              <summary>Parent</summary>
              <ul className="p-2">
                <li><a>Submenu 1</a></li>
                <li><a>Submenu 2</a></li>
              </ul>
            </details>
          </li>
          <li><a>Item 3</a></li>
        </ul>
      </div>

      <nav className="navbar-end menu menu-horizontal px-1">
        <LinkWrapper href="/about" passHref legacyBehavior>
          <Link>
            {t('navigation.menu.features.title')}
          </Link>
        </LinkWrapper>
      </nav>
    </header>
  );
}) satisfies FunctionComponent<Props>;
