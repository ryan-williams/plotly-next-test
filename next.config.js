/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // swcMinify: true,
  // transpilePackages: [ 'plotly.js', 'probe-image-size'],
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
