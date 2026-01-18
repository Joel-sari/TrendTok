import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Next.js 16 removed `eslint` config in next.config.*
  // (and `next lint` was removed). Keep TypeScript override only if you
  // intentionally want builds to succeed even with TS errors.
  typescript: { ignoreBuildErrors: true },

  // Optional: keep this only if you’re using React Compiler.
  reactCompiler: true,
};

export default nextConfig;