/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io', // للسماح بصور Sanity (منتجاتك)
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // 👈 هذا هو السطر الجديد المطلوب
      },
    ],
  },
};

export default nextConfig;