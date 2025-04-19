import { NextConfig } from "next";
import path from "node:path";

// Define your Next.js configuration
const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      public: path.resolve(__dirname, "public"),
      app: path.resolve(__dirname, "src/app"),
      assets: path.resolve(__dirname, "src/assets"),
      common: path.resolve(__dirname, "src/common"),
      features: path.resolve(__dirname, "src/features"),
    };
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "staging-it-incubator.s3.eu-central-1.amazonaws.com",
        pathname: "/trainee-instagram-api/Image/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        has: [
          {
            type: "query",
            key: "accessToken",
          },
        ],
        destination: "/",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
