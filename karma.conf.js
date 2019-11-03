const webpackConfig = require("./webpack.config");

module.exports = function(config) {
    config.set({
        basePath: "",
        frameworks: ["mocha", "chai", "sinon"],
        files: [
            "src/test/**/*.spec.ts"
        ],
        exclude: [],
        preprocessors: {
            "src/test/**/*.spec.ts": ["webpack"]
        },
        webpack: {
            module: webpackConfig.module,
            resolve: webpackConfig.resolve,
            mode: 'production'
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