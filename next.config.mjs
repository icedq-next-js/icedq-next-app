/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'abyssgroupindia.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;