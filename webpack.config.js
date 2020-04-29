'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Webpack = require('webpack');

const isProduction = process.env.NODE_ENV === 'production';
const mode = isProduction ? 'production' : 'development';
const devtool = isProduction ? 'nosources-source-map' : 'inline-source-map';

module.exports = {
  mode,
  devtool,
  devServer: {
    contentBase: `${__dirname}/dist`,
    compress: true,
    port: 9000,
  },
  context: `${__dirname}/src`,
  entry: './index.ts',
  output: {
    path: `${__dirname}/dist`,
    filename: 'index.js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.node$/,
        use: 'node-loader',
      },
    ],
  },
  watchOptions: {
    aggregateTimeout: 100,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.pug',
      filename: 'index.html',
    }),
    new CopyPlugin([
      {
        from: 'chunks/favicons',
        to: '',
      },
    ]),
    new Webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
  ],
};
