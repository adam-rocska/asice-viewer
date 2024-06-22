"use client";
import locales, {KnownLocale} from "@/lib/i18n/locales";
import {Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Link} from "@nextui-org/react";
import {useLocale, useNow, useTranslations} from "next-intl";
import {FunctionComponent} from "react";
import Language from "@/icons/language.svg";
import {usePathname, Link as LocalizedLink} from "@/lib/i18n/navigation";

export default (() => {
  const t = useTranslations();
  const locale = useLocale();
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
    <footer className="bg-white dark:bg-gray-900">
      <div className="mx-auto w-full max-w-screen-xl">
        <div className="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-4">
          {Object.entries(menuItems).map(([title, items], index) => (
            <div key={`${title}-${index}`}>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                {title}
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium opacity-65">
                {items.map(([label, href], index) => (
                  <li className="mb-4" key={`${label}-${index}`}>
                    <Link
                      className="w-full"
                      underline="hover"
                      href={href}
                      color="foreground"
                      size="sm"
                      isExternal={href.startsWith("http")}
                      showAnchorIcon={href.startsWith("http")}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="px-4 py-6 bg-gray-100 dark:bg-gray-700 md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-300 sm:text-center">
            © {now.getFullYear()} <Link href="/" color="foreground" size="sm" underline="hover">{t('footer.copyright')}</Link>. {t('footer.rightsReserved')}
          </span>
          <div className="flex mt-4 sm:justify-center md:mt-0 space-x-5 rtl:space-x-reverse">
            <Dropdown>
              <DropdownTrigger>
                <Button
                  startContent={<Language className="w-4 h-4 mr-2" />}
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
                      <DropdownItem key={locale}>
                        <LocalizedLink
                          href={pathName}
                          locale={locale}
                        >
                          {localeInNative(locale)} <small><i>({displayNames.of(locale)})</i></small>
                        </LocalizedLink>
                      </DropdownItem>
                    ))
                }
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>
    </footer>
  );
}) satisfies FunctionComponent;


type MenuItems = {[label in string]: Array<[label: string, href: string]>};

const localeInNative = (
  locale: KnownLocale
): string => new Intl.DisplayNames([locale], {type: "language"}).of(locale) ?? "";