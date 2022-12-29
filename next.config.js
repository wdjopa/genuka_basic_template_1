/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["dashboard.genuka.com", "cdn.genuka.com"],
  },
};

module.exports = nextConfig;
