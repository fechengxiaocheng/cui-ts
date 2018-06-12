var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        'babel-polyfill',
        './src/main.tsx',
    ], //入口
    output: { //输出
        path: path.join(__dirname, '../public'),
        filename: "cui.min.js",
        publicPath: './'
    },
    mode: "production",
    module: {
        rules: global.rules
    },
    resolve: global.resolve,
    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [
                    autoprefixer(),
                ]
            }
        }),
        new ExtractTextPlugin({
            filename: './cui.min.css'
        }),
    ],
    cache: true
}