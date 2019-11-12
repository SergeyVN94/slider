const webpackConfig = require("./webpack.config");
// const jsdom = require('jsdom');

module.exports = function (config) {
    config.set({
        frameworks: ["mocha", "chai", "sinon"],
        files: [
            { pattern: "dist/index.css", type: 'css', watched: true },
            "src/test/**/*.spec.ts"
        ],
        // customDebugFile: 'dist/index.html',
        // customContextFile: 'dist/index.html',
        client: {
            clearContext: false,
            runInParent: true
        },
        preprocessors: {
            "src/test/**/*.spec.ts": ["webpack", "sourcemap"]
        },
        reporters: ['mocha', 'coverage'],
        webpack: {
            module: webpackConfig.module,
            resolve: webpackConfig.resolve,
            mode: 'production',
            target: 'node',
            devtool: 'source-map'
        },
        mime: {
            'text/x-typescript': ['ts','tsx']
        },
        reporters: ["progress"],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ["PhantomJS"],
        singleRun: false,
        concurrency: Infinity
    });
};