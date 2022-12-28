/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["dashboard.genuka.com", "cdn.genuka.com"],
  },
};

module.exports = nextConfig;
