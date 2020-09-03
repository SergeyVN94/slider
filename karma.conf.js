/* eslint-disable @typescript-eslint/no-var-requires */
const Webpack = require('webpack');
const executablePath = require('puppeteer').executablePath();

const webpackConfig = require('./webpack.config.js').default.default[0];

process.env.CHROME_BIN = executablePath;

module.exports = (config) => {
  config.set({
    frameworks: ['mocha', 'chai', 'sinon'],
    files: ['src/**/*.spec.ts'],
    preprocessors: {
      'src/**/*.spec.ts': ['webpack', 'sourcemap'],
    },
    webpack: {
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
            test: /\.node$/,
            use: 'node-loader',
          },
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
      resolve: webpackConfig.resolve,
      mode: 'production',
      target: 'node',
      devtool: 'source-map',
      plugins: [
        new Webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery',
        }),
      ],
    },
    mime: { 'text/x-typescript': ['ts', 'tsx'] },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    singleRun: false,
    concurrency: Infinity,
  });
};
