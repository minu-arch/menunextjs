/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: "/(.*)",
        destination: "https://www.minufy.site/$1",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
