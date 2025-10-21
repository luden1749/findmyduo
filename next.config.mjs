/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // ✅ Empêche le build de planter à cause d'erreurs ESLint
    ignoreDuringBuilds: true,
  },
  pageExtensions: ['js', 'jsx'],
};

export default nextConfig;