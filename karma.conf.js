const webpackConfig = require('./webpack.config');

module.exports = function(config) {
    config.set({
        frameworks: ['mocha', 'chai', 'sinon'],
        files: ['src/**/*.spec.ts'],
        preprocessors: {
            'src/**/*.spec.ts': ['webpack', 'sourcemap'],
        },
        webpack: {
            module: webpackConfig.module,
            resolve: webpackConfig.resolve,
            mode: 'production',
            target: 'node',
            devtool: 'source-map',
        },
        mime: {
            'text/x-typescript': ['ts', 'tsx'],
        },
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['PhantomJS'],
        singleRun: false,
        concurrency: Infinity,
    });
};
