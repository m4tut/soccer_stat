const path = require('path');
const sassResourcesLoader = require('craco-sass-resources-loader');

const resolvePath = p => path.resolve(__dirname, p);

module.exports = {
  webpack: {
    alias: {
      '@assets': resolvePath('./src/assets'),
      '@pages': resolvePath('./src/pages'),
    },
  },
  plugins: [
    {
      plugin: sassResourcesLoader,
      options: {
        resources: './src/assets/styles/base/global-import.scss',
      },
    },
  ],
};
