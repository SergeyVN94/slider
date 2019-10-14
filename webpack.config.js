'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: `${__dirname}/src`,
    entry: './index.ts',
    output: {
        path: `${__dirname}/dist`,
        filename: 'slider.js'
    },
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
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
                loader: 'pug-loader'
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                  'style-loader',
                  'css-loader',
                  'sass-loader',
                ],
            }
        ]
    },
    watchOptions: {
        aggregateTimeout: 100
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.pug',
            filename: 'index.html'
        })
    ]
};