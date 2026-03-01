/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Baris di bawah ini opsional, gunakan jika Anda butuh fitur tertentu
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;