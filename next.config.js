/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  reactStrictMode: false,
  images: {
    unoptimized: true,

    domains: ["dashboard.genuka.com", "cdn.genuka.com"],
    loader: "custom",
    loaderFile: "./utils/loader.js",
  },
};

module.exports = nextConfig;
