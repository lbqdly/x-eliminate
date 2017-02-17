var webpack = require('webpack');
var path = require('path');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var update = require('immutability-helper');

var commonPlugins = [
    //new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js?v=[hash]'),
    new HtmlWebpackPlugin({
        filename: './index.html',
        template: path.resolve(__dirname, './src/index.html')
    })
    ,new CopyWebpackPlugin([{ from: 'src/asset', to: '../dist/asset' },{ from: 'src/createjs', to: '../dist/createjs' }])
];

module.exports = {
    //devtool: 'eval',
    watch: true,
    entry: {
        js: path.resolve(__dirname, './src/main')
    },
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: 'bundle.js?v=[hash]',
        publicPath: './'
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel'
            }, {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: 'style!css!postcss'
            }
        ]
    },
    postcss: function () {
        return [autoprefixer({browsers: ['> 1%', 'iOS 7', 'last 2 versions']})];
    },
    commonPlugins: commonPlugins,
    plugins: update(commonPlugins, {
        $push: [
            new webpack.DefinePlugin({
                __DEBUG__: true
            }),
            new BrowserSyncPlugin(
                // BrowserSync options
                {
                    server: {baseDir: ['dist']}
                    // browse to http://localhost:3000/ during development
                    //host: 'localhost',
                    //port: 3000

                    // proxy the Webpack Dev Server endpoint
                    // (which should be serving on http://localhost:3100/)
                    // through BrowserSync
                    //proxy: 'http://localhost:8090/'
                },
                // plugin options
                {
                    // prevent BrowserSync from reloading the page
                    // and let Webpack Dev Server take care of this
                    reload: true
                }
            )
        ]
    })
};
