var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');
var global = require('./webpack.base.js');

module.exports = {
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",
    entry: {
        // vendor: ['react', 'react-dom'],
        app: [
            `webpack-dev-server/client?http://localhost:${global.devPort}/`,
            'babel-polyfill',
            'react-hot-loader/patch',
            path.join(__dirname, '../src/main.tsx')
        ]
    },
    output: { //输出
        path: path.join(__dirname, '../dist'),
        filename: "bundle.js",
        publicPath: '/'
    },
    devServer: {
        // 设置服务器访问的基本目录
        contentBase: path.resolve(__dirname, '../dist'), //最好设置成绝对路径
        // 设置服务器的ip地址,可以是localhost
        host: 'localhost',
        // 设置端口
        port: global.devPort,
        // 设置自动拉起浏览器
        open: true,
        hot: true
    },
    mode: "development",
    performance: {
        hints: false
    },
    module: {
        rules: global.rules
    },
    resolve: global.resolve,
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            inject: 'body',
            template: path.join(__dirname, '../index.html') //模板地址
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    // 分片及vendor提取
    // optimization: {
    //     splitChunks: {
    //         cacheGroups: {
    //             commons: {
    //                 chunks: 'initial',
    //                 minChunks: 2,
    //                 maxInitialRequests: 5,
    //                 minSize: 0
    //             },
    //             vendor: {
    //                 test: /node_modules/,
    //                 chunks: 'initial',
    //                 name: 'vendor',
    //                 priority: 10,
    //                 enforce: true
    //             }
    //         }
    //     }
    // },
    cache: true
}