var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');

module.exports = {
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",
    entry: {
        // vendor: ['react', 'react-dom'],
        app: [
            'webpack-dev-server/client?http://localhost:8080/',
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
        port: 8080,
        // 设置自动拉起浏览器
        open: true,
        hot: true
    },
    mode: "production",
    performance: {
        hints: false
    },
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
            loader: "style-loader!css-loader!postcss-loader!sass-loader"
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
            test: /\.tsx$/,
            enforce: 'pre',
            loader: ['awesome-typescript-loader', 'tslint-loader']
        }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.scss', '.css', '.png', '.gif', '.jpg']
    },
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