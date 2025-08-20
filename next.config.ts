import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  // output: 'export',
  distDir: './dist',
  images: {
    unoptimized: true,
    domains: ['api.artic.edu', 'images.weserv.nl'],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
