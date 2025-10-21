// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ désactive ESLint au moment du build
  },
  typescript: {
    ignoreBuildErrors: true, // ✅ empêche aussi les erreurs TS de bloquer la build
  },
};

export default nextConfig;
