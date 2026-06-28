/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    outputFileTracingIncludes: {
      "/api/academy/download": ["./content/academy/**/*"],
    },
  },
};

export default nextConfig;
