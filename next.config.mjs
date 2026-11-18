/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: isProd ? '/better-ktu-notes' : '',
  assetPrefix: isProd ? '/better-ktu-notes/' : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
