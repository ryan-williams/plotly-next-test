/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: process.env.NEXT_BASE_PATH,
  // swcMinify: true,
  // transpilePackages: [ 'plotly.js', 'probe-image-size'],
  images: {
    unoptimized: true,
  },
  webpack(webpackConfig) {
    return {
      ...webpackConfig,
      optimization: {
        minimize: false
      }
    };
  },
}

module.exports = nextConfig
