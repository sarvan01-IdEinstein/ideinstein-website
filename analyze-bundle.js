// Bundle analyzer script for performance monitoring
// Run with: npm run analyze

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const nextConfig = require('./next.config.js');

module.exports = {
  ...nextConfig,
  webpack: (config, { isServer }) => {
    // Apply existing webpack config
    if (nextConfig.webpack) {
      config = nextConfig.webpack(config, { isServer });
    }

    // Add bundle analyzer in production
    if (process.env.ANALYZE === 'true') {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          analyzerPort: isServer ? 8888 : 8889,
          openAnalyzer: true,
        })
      );
    }

    return config;
  },
};