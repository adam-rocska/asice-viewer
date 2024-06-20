"use client";
import {FunctionComponent, PropsWithChildren, useState} from "react";
import {useTranslations} from "next-intl";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button} from "@nextui-org/react";

export type Props = PropsWithChildren;

export default (p => {
  const t = useTranslations();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems: MenuItem[] = [
    {
      title: t("navigation.menu.about.title"),
      items: [
        {
          title: t("navigation.menu.about.tool.title"),
          description: t("navigation.menu.about.tool.description"),
          href: "/about/the-tool"
        },
        {
          title: t("navigation.menu.about.format.title"),
          description: t("navigation.menu.about.format.description"),
          href: "/about/the-format"
        },
        {
          title: t("navigation.menu.about.creator.title"),
          description: t("navigation.menu.about.creator.description"),
          href: "/about/the-creator"
        }
      ]
    },
    {
      title: t("navigation.menu.features.title"),
      items: [
        {
          title: t("navigation.menu.features.technicalView.title"),
          description: t("navigation.menu.features.technicalView.description"),
          href: "/features/technical-view"
        },
        {
          title: t("navigation.menu.features.nonTechnicalView.title"),
          description: t("navigation.menu.features.nonTechnicalView.description"),
          href: "/features/non-technical-view"
        },
        {
          title: t("navigation.menu.features.nestedDocuments.title"),
          description: t("navigation.menu.features.nestedDocuments.description"),
          href: "/features/nested-documents"
        }
      ]
    }
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className="@container">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? t('actions.close') : t('actions.open')}
          className="@sm:hidden"
        />
        <NavbarBrand className="font-bold text-inherit">
          {t('navigation.title')}
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden @sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item.title}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}) satisfies FunctionComponent<Props>;

type MenuItem = {
  title: string;
  items: Array<{
    title: string;
    description: string;
    href: string;
  }>
}