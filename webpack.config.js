'use strict';

const path = require('path');
const TerserJSPlugin = require('terser-webpack-plugin');
const version = require('./package.json').version;

const prod = process.env.NODE_ENV === 'production';

// eslint-disable-next-line max-len
const filename = `discord${process.env.VERSIONED ? `.${version}` : ''}${prod ? '.min' : ''}.js`;

module.exports = {
  entry: './dist/index.js',
  mode: prod ? 'production' : 'development',
  output: {
    path: path.resolve('./webpack'),
    filename,
    library: 'Discord',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      { test: /\.md$/, loader: 'ignore-loader' },
      {
        test: require.resolve('./package.json'),
        type: 'javascript/auto',
        use: {
          loader: 'json-filter-loader',
          options: {
            used: ['version', 'homepage'],
          },
        },
      },
    ],
  },
  node: {
    fs: 'empty',
    dns: 'mock',
    tls: 'mock',
    child_process: 'empty',
    dgram: 'empty',
    __dirname: true,
    process: true,
    path: 'empty',
    Buffer: true,
    zlib: 'empty',
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserJSPlugin({
        cache: false,
        terserOptions: {
          mangle: { keep_classnames: true, keep_fnames: true },
          keep_classnames: true,
          keep_fnames: true,
          output: { comments: false },
        },
      }),
    ],
  },
};
