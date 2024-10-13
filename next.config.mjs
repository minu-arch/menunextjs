/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: "/(.*)",
        has: [
          {
            type: "host",
            value: "^(?!localhost|www\\.minufy\\.site).*$",
          },
        ],
        destination: "https://www.minufy.site/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
