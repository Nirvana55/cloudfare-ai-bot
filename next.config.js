/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/auth/login",
        permanent: false,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/api/cloudfare",
        headers: [
          {
            key: "Content-Type",
            value: "text/event-stream",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
