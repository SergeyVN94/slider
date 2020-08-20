const webpackConfig = require('./webpack.config')[0];
const Webpack = require('webpack');
process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = (config) => {
  config.set({
    frameworks: ['mocha', 'chai', 'sinon'],
    files: ['src/test/*.spec.ts'],
    preprocessors: {
      'src/test/*.spec.ts': ['webpack', 'sourcemap'],
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
    mime: {
      'text/x-typescript': ['ts', 'tsx'],
    },
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
