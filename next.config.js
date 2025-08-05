/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          "https://asia-northeast1-clipvocab.cloudfunctions.net/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
