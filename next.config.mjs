/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    const env = process.env.NEXT_PUBLIC_ENV || process.env.NODE_ENV;

    // Nu facem redirect în mediul de dezvoltare
    if (env === "development") {
      return [];
    }

    return [
      {
        source: "/(.*)",
        has: [
          {
            type: "host",
            key: "host",
            value: "^(?!www\\.minufy\\.site).*$",
          },
        ],
        destination: "https://www.minufy.site/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
