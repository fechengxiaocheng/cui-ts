module.exports = {
    // 开发端口
    devPort: 8080,
    // 关联文件类型
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.scss', '.css', '.png', '.gif', '.jpg']
    },
    // loader
    rules: [{
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
    },
    {
        test: /\.(png|jpg|gif)$/,
        loader: process.env.NODE_ENV=='prd' ? 
        ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: "css-loader!postcss-loader!sass-loader"
        })
        :
        'url-loader?limit=8192&name=images/[name].[ext]'
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
}