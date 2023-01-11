/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["dashboard.genuka.com", "cdn.genuka.com"],
  },
  output: "standalone", // THIS IS IMPORTANT
};

module.exports = nextConfig;
