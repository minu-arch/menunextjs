/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    if (process.env.NODE_ENV === "development") {
      return [];
    }
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "(?!www\\.minufy\\.site).*",
          },
        ],
        permanent: true,
        destination: "https://www.minufy.site/:path*",
      },
    ];
  },
};

export default nextConfig;
