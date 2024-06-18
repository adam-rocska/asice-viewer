/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};

if (process.env.NODE_ENV === 'production') {
  nextConfig.basePath = '/asice-viewer';
}

export default nextConfig;
