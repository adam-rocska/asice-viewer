"use client";
import locales, {KnownLocale} from "@/lib/i18n/locales";
import {Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@nextui-org/react";
import {useLocale, useNow, useTranslations} from "next-intl";
import {FunctionComponent} from "react";
import Language from "@/icons/language.svg";
import {usePathname} from "@/lib/i18n/navigation";
import clsx from "clsx";
import Link, {Href, useLinkPropsFactory} from "@/components/link";

export default (() => {
  const t = useTranslations();
  const locale = useLocale();
  const linkProps = useLinkPropsFactory();
  const now = useNow();
  const displayNames = new Intl.DisplayNames([locale], {type: "language"});
  const pathName = usePathname();

  const menuItems: MenuItems = {
    [t("navigation.menu.features.title")]: [
      [t("navigation.menu.features.technicalView.title"), "/features/technical-view"],
      [t("navigation.menu.features.nonTechnicalView.title"), "/features/non-technical-view"],
      [t("navigation.menu.features.nestedDocuments.title"), "/features/nested-documents"]
    ],
    [t("navigation.menu.about.title")]: [
      [t("navigation.menu.about.tool.title"), "/about/the-tool"],
      [t("navigation.menu.about.format.title"), "/about/the-format"],
      [t("navigation.menu.about.creator.title"), "/about/the-creator"]
    ],
    [t("navigation.menu.feedback.title")]: [
      [t("navigation.menu.feedback.bugReport.title"), `https://github.com/adam-rocska/asice-viewer/issues/new?template=bug_report.${locale}.md`,],
      [t("navigation.menu.feedback.featureRequest.title"), `https://github.com/adam-rocska/asice-viewer/issues/new?template=feature_request.${locale}.md`,]
    ],
    [t("navigation.menu.legal.title")]: [
      [t("navigation.menu.legal.cookiePolicy.title"), "/legal/cookie-policy"],
      [t("navigation.menu.legal.privacyPolicy.title"), "/legal/privacy-policy"],
      [t("navigation.menu.legal.sourceCodeLicense.title"), "/legal/source-code-license"],
      [t("navigation.menu.legal.termsOfUse.title"), "/legal/terms-of-use"]
    ]
  };

  return (
    <>
      <footer className={clsx(
        "bg-content1",
        "border-t-1 border-t-divider",
        "border-b-1 border-b-content3",
        'prose dark:prose-invert max-w-none prose-a:no-underline',
      )}>
        <div className={clsx(
          "container mx-auto",
          "grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-4"
        )}>
          {Object.entries(menuItems).map(([title, items], index) => (
            <div key={`${title}-${index}`}>
              <h4 className="uppercase leading-tight">
                {title}
              </h4>
              {items.map(([label, href], index) => (
                <Link
                  key={`${label}-${index}`}
                  className="w-full"
                  underline="hover"
                  {...linkProps({href})}
                  color="foreground"
                  size="sm"
                >
                  {label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </footer>
      <footer className={clsx(
        "bg-gradient-to-br",
        "from-content2 to-content1",
        "border-t-1 border-t-content2",
      )}>
        <div className={clsx(
          "container mx-auto",
          "px-4 py-6 md:flex md:items-center md:justify-between"
        )}>
          <small>
            © {now.getFullYear()} <Link href="/" color="foreground" size="sm" underline="hover">{t('footer.copyright')}</Link>. {t('footer.rightsReserved')}
          </small>
          <Dropdown>
            <DropdownTrigger>
              <Button
                startContent={<Language className="size-4" />}
              >
                {displayNames.of(locale)}
              </Button>
            </DropdownTrigger>
            <DropdownMenu selectionMode="single" selectedKeys={new Set([locale])}>
              {
                Array.from(locales)
                  .sort((a, b) => {
                    const aLocalized = localeInNative(a);
                    const bLocalized = localeInNative(b);
                    return aLocalized.localeCompare(bLocalized);
                  })
                  .map((locale) => (
                    <DropdownItem
                      key={locale}
                      {...linkProps({
                        href: pathName,
                        hrefLang: locale,
                      })}
                    >
                      {localeInNative(locale)} <small><i>({displayNames.of(locale)})</i></small>
                    </DropdownItem>
                  ))
              }
            </DropdownMenu>
          </Dropdown>
        </div>
      </footer >
    </>
  );
}) satisfies FunctionComponent;


type MenuItems = {[label in string]: Array<[label: string, href: Href]>};

const localeInNative = (
  locale: KnownLocale
): string => new Intl.DisplayNames([locale], {type: "language"}).of(locale) ?? "";