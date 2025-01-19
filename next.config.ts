import { NextConfig } from 'next';
import path from "node:path";

// Define your Next.js configuration
const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      app: path.resolve(__dirname, "src/app"),
      common: path.resolve(__dirname, "src/common"),
      features: path.resolve(__dirname, "src/features"),
    };
    return config;
  },
};

export default nextConfig;
