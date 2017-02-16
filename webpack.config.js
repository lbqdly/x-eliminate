/**
 * Created by YTRX-CTO on 2015/9/6.
 */
module.exports = {
    //watch:true,
    //页面入口文件配置
    entry: {
        szx: './src/main.js'
    },
    //入口文件输出配置
    output: {
        path: 'build',
        filename: '[name].js'
    },
    module: {
        //加载器配置
        loaders: [
            {test: /\.css$/, loader: 'style-loader!css-loader'},
            {test: /\.css$/, loader: 'style!css!autoprefixer'}
        ]
    }/*,
     //其它解决方案配置
     resolve: {
     root: 'E:/github/flux-example/src', //绝对路径
     extensions: ['', '.src', '.json', '.scss'],
     alias: {
     AppStore : 'src/stores/AppStores.src',
     ActionType : 'src/actions/ActionType.src',
     AppAction : 'src/actions/AppAction.src'
     }
     }*/
};