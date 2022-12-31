/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  reactStrictMode: false,
  images: {
    domains: ["dashboard.genuka.com", "cdn.genuka.com"],
  },
};

module.exports = nextConfig;
