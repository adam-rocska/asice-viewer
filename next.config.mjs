import createNextIntlPlugin from 'next-intl/plugin';
import mdx from '@next/mdx';
import remarkGfm from 'remark-gfm';

const withNextIntl = createNextIntlPlugin('./lib/i18n/getRequestConfig.ts');
const withMDX = mdx({
  extension: /\.(mdx|md)$/,
  options: {
    remarkPlugins: [remarkGfm],
  }
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/asice-viewer',
  pageExtensions: ['js', 'jsx', 'md','mdx', 'ts', 'tsx'],
  images: {
    unoptimized: true,
  },
  transpilePackages: ['next-mdx-remote'],
};

export default withMDX(
  withNextIntl(
    nextConfig
  )
);
