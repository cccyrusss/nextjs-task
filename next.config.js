/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3-ap-east-1.amazonaws.com",
      },
    ],
  },
}

module.exports = nextConfig