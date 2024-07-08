
const pathnames = [
  '/',
  '/robots.txt',
  '/sitemap.xml',
  '/files',
  '/about/the-creator',
  '/about/the-format',
  '/about/the-tool',
  '/features/nested-documents',
  '/features/non-technical-view',
  '/features/technical-view',
  '/legal/cookie-policy',
  '/legal/privacy-policy',
  '/legal/terms-of-use',
  '/legal/source-code-license'
] as const;

export default pathnames;
export type Pathname = typeof pathnames[number];

