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
  async redirects() {
    return [
      {
        source: "/",
        destination: "/signUp", // Replace with your custom route
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
