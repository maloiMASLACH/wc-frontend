/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const { resolve } = require('path');
const webpack = require('webpack');

module.exports = ({ development }) => ({
  context: resolve(__dirname, 'src'),
  entry: './index.ts',
  devtool: development ? 'inline-source-map' : false,
  mode: development ? 'development' : 'production',
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
    'react-router-dom': 'react-router-dom',
    'react-router': 'react-router',
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'vit-ui-kit',
    libraryTarget: 'umd',
    globalObject: "typeof self === 'undefined' ? this : self",
    clean: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@components': path.resolve(__dirname, 'src/components/'),
      // '@layout': path.resolve(__dirname, 'src/layout/'),
      '@utils': path.resolve(__dirname, 'src/utils/'),
      // '@api': path.resolve(__dirname, 'src/api/'),
    },
    fallback: {
      buffer: require.resolve('buffer/'),
      stream: require.resolve('stream-browserify'),
      crypto: require.resolve('crypto-browserify'),
      https: require.resolve('https-browserify'),
      url: require.resolve('url/'),
      http: require.resolve('stream-http'),
    },
  },
  optimization: false,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.png$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        // {
        //   from: resolve(__dirname, 'src/assets'),
        //   to: resolve(__dirname, 'dist/assets'),
        // },
        {
          from: resolve(__dirname, 'src/vitTheme.js'),
          to: resolve(__dirname, 'dist/vitTheme.js'),
        },
      ],
    }),
    new ESLintPlugin({ extensions: ['ts'] }),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
  ],
});
