import createNextIntlPlugin from "next-intl/plugin";
import mdx from "@next/mdx";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";

const withNextIntl = createNextIntlPlugin("./lib/i18n/getRequestConfig.ts");
const withMDX = mdx({
  extension: /\.(mdx|md)$/,
  options: {
    remarkPlugins: [remarkGfm, remarkToc],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {unoptimized: true},
  reactStrictMode: true,
  compiler: {
    reactRemoveProperties: true,
    styledComponents: true,
  },
  compress: true,
  webpack(config, context) {
    const svgFileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg")
    );
    config.module.rules.push({
      ...svgFileLoaderRule,
      test: /\.svg$/i,
      resourceQuery: /url/,
    });
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: svgFileLoaderRule.issuer,
      resourceQuery: {not: [...svgFileLoaderRule.resourceQuery.not, /url/]},
      use: ["@svgr/webpack"],
    });
    svgFileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
  experimental: {
    optimizeServerReact: true,
    turbo: {
      rules: {"*.svg": {loaders: ["@svgr/webpack"], as: "*.js"}},
    },
  },
  transpilePackages: ["next-mdx-remote"],
};

export default withMDX(withNextIntl(nextConfig));
