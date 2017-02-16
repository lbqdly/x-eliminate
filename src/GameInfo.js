/**
 * Created by YTRX-CTO on 2015/9/8.
 */
var Util = require('./Util.js');
module.exports = {
    BEST_SCORE: "shi-zi-xiao-best-score",//本地储存key
    WIDTH: 640,
    getWidth: function () {
        return this.WIDTH;
    },
    getHeight: function () {
        return Util.isPC() ? document.documentElement.clientHeight : document.documentElement.clientHeight * this.WIDTH / document.documentElement.clientWidth;
    },
    flagColor: '#555555',
    girdType0: '#bbbeb0',
    girdType1: '#bbbebf',
    round: 5,//圆角值
    gap: 1,//间隔
    totalEl: 7,//el的种类数,一共多少种色彩
    dense: 0.8,//格子密集度
    helperNum: 3,//帮助次数
    countTime: 60000,//倒计时毫秒数
    timerBarHeight: 20,//计时条高度
    scoreBarHeight: 30,//记分条高度
    scoreScale: 2,//得分基数
    timePunish: 3000,//失误后扣除的时间豪秒
    size: 68,//格子大小
    keepClickGap: 1200//连击间隔毫秒
};