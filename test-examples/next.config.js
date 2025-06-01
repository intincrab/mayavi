/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Add any experimental features if needed
  },
  // Transpile the mayavi package
  transpilePackages: ['mayavi'],
};

module.exports = nextConfig; 