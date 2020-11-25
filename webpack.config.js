/* eslint-disable @typescript-eslint/no-var-requires */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';
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
  {
    test: /\.(sa|sc|c)ss$/,
    use: [
      MiniCssExtractPlugin.loader,
      'css-loader',
      'sass-loader',
    ],
  },
];

const optimization = {
  minimizer: [
    new OptimizeCssAssetsWebpackPlugin(),
    new TerserWebpackPlugin(),
  ],
};

const configs = [{
  context,
  resolve,
  optimization: isProduction ? optimization : {},
  mode: isProduction ? 'production' : 'development',
  devtool: isProduction ? 'nosources-source-map' : 'inline-source-map',
  devServer: {
    contentBase: `${__dirname}/dist`,
    compress: true,
    port: 9000,
  },
  entry: './demo/index.js',
  output: {
    path: `${__dirname}/dist`,
    filename: 'index.js',
  },
  watchOptions: { aggregateTimeout: 100 },
  module: { rules },
  plugins: [
    new HtmlWebpackPlugin({
      template: './demo/index.pug',
      filename: 'index.html',
    }),
    new CopyPlugin([{ from: 'assets/favicons', to: 'favicons/' }]),
    new Webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery' }),
    new MiniCssExtractPlugin({ filename: 'index.css' }),
    new CleanWebpackPlugin(),
  ],
}];

if (isProduction) {
  configs.push({
    context,
    resolve,
    optimization,
    entry: './slider/plugin/plugin.ts',
    output: {
      path: `${__dirname}/plugin`,
      filename: 'slider.js',
    },
    mode: 'production',
    devtool: 'nosources-source-map',
    module: { rules },
    plugins: [
      new MiniCssExtractPlugin({ filename: 'slider.css' }),
      new CleanWebpackPlugin(),
    ],
  });
}

module.exports = configs;
