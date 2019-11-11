'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    context: `${__dirname}/src`,
    entry: {
        'index.js': './index.ts'
    },
    output: {
        path: `${__dirname}/dist`,
        filename: '[name]'
    },
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
        rules: [{
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.pug$/,
                loader: 'pug-loader'
            },
            // {
            //     test: /\.s[ac]ss$/i,
            //     use: [
            //         'style-loader',
            //         'css-loader',
            //         'sass-loader'
            //     ]
            // },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.node$/,
                use: 'node-loader'
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
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: 'index.css'
        })
    ]
};