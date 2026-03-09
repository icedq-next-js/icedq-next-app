/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'abyssgroupindia.com',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Enable compression
  compress: true,

  // Optimize production builds
  productionBrowserSourceMaps: false,

  // Enable SWR (Stale-While-Revalidate) for better caching
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  },

  // Custom headers for caching strategies
  headers: async () => {
    return [
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;