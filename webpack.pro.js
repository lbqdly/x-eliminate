/**
 * Created by aaron on 2017/1/22.
 */
var webpacDev = require('./webpack.dev');
var update = require('immutability-helper');
var webpack = require('webpack');
module.exports = {
    //devtool: 'eval',
    entry: webpacDev.entry,
    output: webpacDev.output,
    module: webpacDev.module,
    postcss: webpacDev.postcss,
    plugins: update(webpacDev.commonPlugins, {
        $push: [
            new webpack.DefinePlugin({
                __DEBUG__: false
            })
        ]
    }),
    resolve: webpacDev.resolve
};
