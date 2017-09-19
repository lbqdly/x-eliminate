/**
 * Created by YTRX-CTO on 2015/9/9.
 */
module.exports = {
    randomize: function (inArray) {
        var arr = [];
        while (inArray.length > 0) {
            var i = Math.floor(inArray.length * Math.random());
            arr.push(inArray[i]);
            inArray.splice(i, 1);
        }
        return arr;
    },
    isPC: function () {
        var userAgentInfo = navigator.userAgent;
        var Agents = ["Android", "iPhone",
            "SymbianOS", "Windows Phone",
            "iPad", "iPod"];
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    }
};