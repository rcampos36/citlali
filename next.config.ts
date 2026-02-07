import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

const projectRoot =
  typeof __dirname !== "undefined"
    ? path.resolve(__dirname)
    : path.resolve(path.dirname(fileURLToPath(import.meta.url)));

const nextConfig: NextConfig = {
  turbopack: {
    root: projectRoot,
    resolveAlias: {
      tailwindcss: path.join(projectRoot, "node_modules", "tailwindcss"),
    },
  },
  webpack: (config, { isServer }) => {
    config.context = projectRoot;
    config.resolve = config.resolve ?? {};
    config.resolve.alias = {
      ...config.resolve.alias,
      tailwindcss: path.join(projectRoot, "node_modules", "tailwindcss"),
    };
    config.resolve.modules = [
      path.join(projectRoot, "node_modules"),
      ...(config.resolve.modules ?? ["node_modules"]),
    ];
    return config;
  },
};

export default nextConfig;
