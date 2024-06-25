"use client";
import {FunctionComponent, SVGProps, useState} from "react";
import {useTranslations, useLocale} from "next-intl";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/react";
import Info from "@/icons/info.svg";
import Paper from "@/icons/paper.svg";
import Profile from "@/icons/profile.svg";
import Search from "@/icons/search.svg";
import Show from "@/icons/show.svg";
import Bug from "@/icons/bug.svg";
import Wand from "@/icons/wand.svg";
import Folder from "@/icons/folder.svg";
import ChevronDown from "@/icons/chevron-down.svg";
import GithubAnimated from "@/icons/github-animated";
import Link from "@/components/Link";

export default (() => {
  const t = useTranslations();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const locale = useLocale();

  const menuItems: MenuItem[] = [
    {
      title: t("navigation.menu.features.title"),
      items: [
        {
          title: t("navigation.menu.features.technicalView.title"),
          description: t("navigation.menu.features.technicalView.description"),
          href: "/features/technical-view",
          icon: Search
        },
        {
          title: t("navigation.menu.features.nonTechnicalView.title"),
          description: t("navigation.menu.features.nonTechnicalView.description"),
          href: "/features/non-technical-view",
          icon: Show
        },
        {
          title: t("navigation.menu.features.nestedDocuments.title"),
          description: t("navigation.menu.features.nestedDocuments.description"),
          href: "/features/nested-documents",
          icon: Folder
        }
      ]
    },
    {
      title: t("navigation.menu.about.title"),
      items: [
        {
          title: t("navigation.menu.about.tool.title"),
          description: t("navigation.menu.about.tool.description"),
          href: "/about/the-tool",
          icon: Info
        },
        {
          title: t("navigation.menu.about.format.title"),
          description: t("navigation.menu.about.format.description"),
          href: "/about/the-format",
          icon: Paper
        },
        {
          title: t("navigation.menu.about.creator.title"),
          description: t("navigation.menu.about.creator.description"),
          href: "/about/the-creator",
          icon: Profile
        }
      ]
    },
    {
      title: t("navigation.menu.feedback.title"),
      items: [
        {
          title: t("navigation.menu.feedback.bugReport.title"),
          description: t("navigation.menu.feedback.bugReport.description"),
          href: `https://github.com/adam-rocska/asice-viewer/issues/new?template=bug_report.${locale}.md`,
          icon: Bug
        },
        {
          title: t("navigation.menu.feedback.featureRequest.title"),
          description: t("navigation.menu.feedback.featureRequest.description"),
          href: `https://github.com/adam-rocska/asice-viewer/issues/new?template=feature_request.${locale}.md`,
          icon: Wand
        }
      ]
    }
  ];

  return (
    <Navbar isBordered onMenuOpenChange={setIsMenuOpen} className="@container" classNames={{
      base: "bg-slate-50/70 dark:bg-slate-950/70"
    }}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? t('actions.close') : t('actions.open')}
          className="@sm:hidden"
        />
        <NavbarBrand className="font-bold text-inherit">
          <Link href="/" color="foreground">
            {t('navigation.title')}
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden @sm:flex gap-4" justify="center">
        {menuItems.map((item, index) => (
          <Dropdown key={`${item}-${index}`}>
            <NavbarItem>
              <DropdownTrigger>
                <Button
                  disableRipple
                  className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                  endContent={<ChevronDown width={16} height={16} />}
                  radius="sm"
                  variant="light"
                >
                  {item.title}
                </Button>
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu
              aria-label={item.title}
              className="w-[340px]"
              itemClasses={{
                base: "gap-4",
              }}
            >
              {item.items.map((subItem, subIndex) => (
                <DropdownItem
                  href={subItem.href}
                  target={subItem.href.startsWith("http") ? "_blank" : undefined}
                  key={`${item}-${index}-${subIndex}-${subIndex}`}
                  description={subItem.description}
                  startContent={<subItem.icon width={32} height={32} />}
                >
                  {subItem.title}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        ))}
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              href="#"
              size="lg"
            >
              {item.title}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>

      <NavbarContent justify="end">
        <NavbarItem className="hidden @lg:flex">
          <Button
            as={Link}
            isExternal
            href="https://github.com/adam-rocska/asice-viewer"
            color="secondary"
            variant="flat"
          >
            {t("actions.starOnGithub")}
            <GithubAnimated width={24} height={24} />
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar >
  );
}) satisfies FunctionComponent;

type MenuItem = {
  title: string;
  items: Array<{
    title: string;
    description: string;
    href: string;
    icon: FunctionComponent<SVGProps<SVGElement>>;
  }>
}
