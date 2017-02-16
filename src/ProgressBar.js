/**
 * Created by YTRX-CTO on 2015/8/14.
 */
/*进度条*/
var GameInfo = require('./GameInfo.js');
var w = GameInfo.getWidth();
var h = GameInfo.getHeight();
c = createjs;
function ProgressBar() {
    c.Container.call(this);
    this.w = w / 3;
    this.h = 20;
    this._buildUI();
}
ProgressBar.prototype = Object.create(c.Container.prototype);
ProgressBar.constructor = ProgressBar;
ProgressBar.prototype._buildUI = function () {
    this.progressBG = new c.Shape();
    this.progressBG.graphics.beginFill("#a7a7a7").drawRect(0, 0, this.w, this.h);
    this.progressBG.x = w / 2 - this.w / 2;
    this.progressBG.y = h / 2 - this.h / 2;
    this.addChild(this.progressBG);

    var padding = 2;
    this.progressPercent = new c.Shape();
    this.progressPercent.graphics.beginFill("#5b970b").drawRect(0, 0, this.w - padding * 2, this.h - padding * 2);
    this.progressPercent.x = this.progressBG.x + padding;
    this.progressPercent.y = this.progressBG.y + padding;
    this.progressPercent.scaleX = 0.01;
    this.addChild(this.progressPercent);
};
ProgressBar.prototype.change = function (percent) {
    this.progressPercent.scaleX = percent;
    //console.log(percent);
};
ProgressBar.prototype.hide = function () {

};

module.exports = ProgressBar;