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
        rules: [{
            test: /\.(eot|svg|ttf|woff|woff2)$/,
            loader: 'file-loader?name=fonts/[name].[ext]'
        },
        {
            test: /\.(png|jpg|gif)$/,
            loader: 'url-loader?limit=8192&name=images/[name].[ext]'
        },
        {
            test: /\.css$/,
            loader: "style-loader!css-loader"
        },
        {
            test: /\.(scss|sass)$/,
            loader: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader!postcss-loader!sass-loader"
            })
        },
        {
            test: /\.js?$/, //表示要变异的文件的类型，这里要编译的是js文件
            loader: 'babel-loader', //装载的哪些模块
            exclude: /node_modules/, //标示不变异node_modules文件夹下面的内容
            query: { //具体的编译的类型，
                compact: false, //表示不压缩
            }
        },
        {
            test: /\.(ts|tsx)?$/,
            loader: 'ts-loader'
        }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.js', '.scss', '.css', '.png', '.gif', '.jpg']
    },
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