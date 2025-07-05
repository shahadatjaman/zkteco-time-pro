import type { NextConfig } from 'next';

/**
 * Next.js Configuration
 */
const nextConfig: NextConfig = {
  // Enable React's Strict Mode to help with debugging and highlight potential issues
  reactStrictMode: true,

  // Configure image optimization for external sources
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
    // Optional: set additional config like deviceSizes or domains if needed
    // domains: ['images.unsplash.com', 'res.cloudinary.com'],
  },
};

export default nextConfig;
