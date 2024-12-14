/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'api.slingacademy.com',
        port: ''
      }
    ]
  },
  transpilePackages: ['geist'],
  reactStrictMode: true,
  devIndicators: {
    autoPrerender: false
  },
  serverRuntimeConfig: {
    host: '0.0.0.0',
    port: 3000
  }
};

module.exports = nextConfig;
