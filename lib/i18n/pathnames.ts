import {KnownLocale} from "./locales";

const pathnames = {
  "/": "/",
  "/robots.txt": "/robots.txt",
  "/sitemap.xml": "/sitemap.xml",
  "/files": {
    "en": "/files",
    "hu": "/fajlok",
    "de": "/dateien",
    "ro": "/fisiere",
    "sk": "/súbory",
    "hr": "/datoteke"
  },
  "/file": {
    "en": "/file",
    "hu": "/fajl",
    "de": "/datei",
    "ro": "/fisier",
    "sk": "/súbor",
    "hr": "/datoteka"
  },
  "/about/the-creator": {
    "en": "/about/the-creator",
    "hu": "/rolunk/a-creator",
    "de": "/uber/den-creator",
    "ro": "/despre/creatorul",
    "sk": "/o/creator",
    "hr": "/o-creatoru"
  },
  "/about/the-format": {
    "en": "/about/the-format",
    "hu": "/rolunk/a-format",
    "de": "/uber/das-format",
    "ro": "/despre/formatul",
    "sk": "/o/formate",
    "hr": "/o-formatu"
  },
  "/about/the-tool": {
    "en": "/about/the-tool",
    "hu": "/rolunk/a-eszkoz",
    "de": "/uber/das-werkzeug",
    "ro": "/despre/unealta",
    "sk": "/o/naradie",
    "hr": "/o-alatu"
  },
  "/features/nested-documents": {
    "en": "/features/nested-documents",
    "hu": "/funkciok/beagyazott-dokumentumok",
    "de": "/funktionen/verschachtelte-dokumente",
    "ro": "/caracteristici/documente-nestate",
    "sk": "/funkcie/vložené-dokumenty",
    "hr": "/značajke/ugnježdeni-dokumenti"
  },
  "/features/non-technical-view": {
    "en": "/features/non-technical-view",
    "hu": "/funkciok/nem-technikai-nezet",
    "de": "/funktionen/nicht-technische-ansicht",
    "ro": "/caracteristici/viziune-non-tehnica",
    "sk": "/funkcie/netechnický-pohľad",
    "hr": "/značajke/netehnički-pogled"
  },
  "/features/technical-view": {
    "en": "/features/technical-view",
    "hu": "/funkciok/technikai-nezet",
    "de": "/funktionen/technische-ansicht",
    "ro": "/caracteristici/viziune-tehnica",
    "sk": "/funkcie/technický-pohľad",
    "hr": "/značajke/tehnički-pogled"
  },
  "/legal/cookie-policy": {
    "en": "/legal/cookie-policy",
    "hu": "/jogi/suti-szabalyzat",
    "de": "/rechtliches/cookie-richtlinie",
    "ro": "/legal/politica-cookie",
    "sk": "/právne/zásady-používania-súborov-cookie",
    "hr": "/pravno/politika-kolačića"
  },
  "/legal/privacy-policy": {
    "en": "/legal/privacy-policy",
    "hu": "/jogi/adatvedelmi-nyilatkozat",
    "de": "/rechtliches/datenschutzrichtlinie",
    "ro": "/legal/politica-de-confidențialitate",
    "sk": "/právne/ochrana-súkromia",
    "hr": "/pravno/politika-privatnosti"
  },
  "/legal/terms-of-use": {
    "en": "/legal/terms-of-use",
    "hu": "/jogi/hasznalati-feltetelek",
    "de": "/rechtliches/nutzungsbedingungen",
    "ro": "/legal/termeni-de-utilizare",
    "sk": "/právne/podmienky-používania",
    "hr": "/pravno/uvjeti-korištenja"
  },
  "/legal/source-code-license": {
    "en": "/legal/source-code-license",
    "hu": "/jogi/forraskod-licenc",
    "de": "/rechtliches/quellcode-lizenz",
    "ro": "/legal/licență-cod-sursă",
    "sk": "/právne/licencia-zdrojového-kódu",
    "hr": "/pravno/licenca-izvornog-koda"
  }
} as const;

export type PathNames = {
  [path in string]: string | Record<KnownLocale, string>;
};

export default pathnames;
export type Pathname = keyof typeof pathnames;
