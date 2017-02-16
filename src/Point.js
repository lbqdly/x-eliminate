/**
 * Created by YTRX-CTO on 2016/1/14.
 */

var Assets = require("./Assets.js");
var Point = function (str, font) {
    createjs.Container.call(this);

    var ss = Assets.loader.getResult(String(font));
    var txt = new createjs.BitmapText(str + "", ss);

    this.addChild(txt);
};
Point.prototype = Object.create(createjs.Container.prototype);
Point.prototype.constructor = Point;


module.exports = Point;