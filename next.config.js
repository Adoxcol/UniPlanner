/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'], // Add the domain of your external images
  },
  webpack: (config, { isServer }) => {
    // Exclude the problematic HTML file from being processed by Webpack
    config.module.rules.push({
      test: /\.html$/,
      exclude: /node_modules\/@mapbox\/node-pre-gyp\/lib\/util\/nw-pre-gyp\/index\.html/,
      use: 'raw-loader',
    });

    return config;
  },
};

module.exports = nextConfig;