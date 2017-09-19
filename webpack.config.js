/**
 * Created by 5156 on 2017/4/10.
 */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');

//环境变量，开发环境或者生产环境，npm将通过这个值来区分打包。
const isDev = process.env.NODE_ENV === 'development';

const postcssLoader = {
    loader: 'postcss-loader',
    options: {
        plugins: (loader) => [
            autoprefixer({browsers: ['iOS 7', 'Android >= 4.0', '> 1%']}),
            cssnano()
        ]
    }
};

module.exports = {
    context: path.join(__dirname, 'src'),
    //代码插入方式
    devtool: isDev ? 'eval-source-map' : 'source-map',
    //监听文件改动
    watch: isDev,
    output: {
        path: path.resolve(__dirname, 'dist/'),
        //文件命名
        filename: 'index.[chunkHash:7].js',

    },
    //入口js文件
    entry: './x/index.js',
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.ejs'
        }),
        //静态文件包，直接copy到发布目录。
        new CopyWebpackPlugin([{from: './statics', to: './statics'}])

    ].concat(
        isDev
            ? [
            //开启自动刷新
            new BrowserSyncPlugin({
                    server: {
                        baseDir: "dist",
                        index: "index.html"
                    }
                },
                {reload: true}
            )]
            : [
            //开启代码压缩
            new webpack.optimize.UglifyJsPlugin({
                sourceMap: true,
                comments: false,
                compress: {warnings: true}
            })]
    ),
    module: {
        rules: [
            {
                test: /\.js/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },

            //css文件引入全局受用。
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', postcssLoader]
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 2048,
                        name: '/assets/[name].[hash:7].[ext]'
                    }
                }]
            }
        ]
    }
};


