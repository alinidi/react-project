/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  distDir: './dist',
  images: {
    unoptimized: true,
    domains: ['api.artic.edu', 'images.weserv.nl'],
  },
};

export default nextConfig;
