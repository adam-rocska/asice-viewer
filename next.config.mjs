import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./lib/i18n/index.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/asice-viewer',
  images: {
    unoptimized: true,
  },
};

export default withNextIntl(nextConfig);
