const webpackConfig = require("./webpack.config");

module.exports = function (config) {
    config.set({
        frameworks: ["mocha", "chai", "sinon"],
        files: [
            "dist/style.js",
            "src/test/**/*.spec.ts"
        ],
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
        browsers: ["Firefox"],
        singleRun: false,
        concurrency: Infinity
    });
};