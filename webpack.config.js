'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const mode = isProduction ? 'production' : 'development';
const devtool = isProduction ? 'nosources-source-map' : 'inline-source-map';
const context = `${__dirname}/src`;
const resolve = { extensions: ['.ts', '.js'] };
const rules = [
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
    test: /\.node$/,
    use: 'node-loader',
  },
];

module.exports = [
  {
    mode,
    devtool,
    context,
    resolve,
    devServer: {
      contentBase: `${__dirname}/dist`,
      compress: true,
      port: 9000,
    },
    entry: './index.ts',
    output: {
      path: `${__dirname}/dist`,
      filename: 'index.js',
    },
    watchOptions: { aggregateTimeout: 100 },
    module: {
      rules: [
        ...rules,
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader',
          ],
        },
      ],
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
  },
  {
    context,
    resolve,
    entry: './components/slider/plugin/plugin.ts',
    output: {
      path: `${__dirname}/dist/plugin`,
      filename: 'slider.js',
    },
    mode: 'production',
    devtool: 'nosources-source-map',
    module: {
      rules: [
        ...rules,
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'sass-loader',
              options: { sourceMap: false },
            },
          ],
        },
      ],
    },
    plugins: [new MiniCssExtractPlugin({ filename: 'slider.css' })],
  },
];
