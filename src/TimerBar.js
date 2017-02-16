/**
 * Created by YTRX-CTO on 2016/1/11.
 */
var GameInfo = require("./GameInfo.js");
var margin = 10;
var TimerBar = function (w) {
    this.w = w;
    createjs.Container.call(this);
    //createjs.EventDispatcher.initialize(TimerBar.prototype);
    this.h = GameInfo.timerBarHeight;
    this.round = this.h / 2;
    var bg = new createjs.Shape();
    bg.graphics.beginFill("#ffffff");
    bg.graphics.drawRect(0, 0, 0, this.h + margin * 2);
    bg.graphics.beginFill("#9a9a9a");
    bg.graphics.drawRoundRect(0, margin, this.w, this.h, this.round);
    bg.graphics.endFill();
    bg.cache(0, 0, this.w, this.h + margin * 2);
    this.addChild(bg);

    this.bar = new createjs.Shape();
    this.addChild(this.bar);
    //this.drawBar(0.01);
};
TimerBar.prototype = Object.create(createjs.Container.prototype);
TimerBar.prototype.constructor = TimerBar;


Object.defineProperty(TimerBar.prototype, "progress", {
    set: function (ms) {
        if (ms >= 0 && ms <= GameInfo.countTime) {
            this._progress = ms / GameInfo.countTime;
            this.bar.graphics.clear();
            this.bar.graphics.beginFill("#8fd632");
            this.bar.graphics.drawRoundRect(0, margin, this.w * this._progress, this.h, this.round);
            this.bar.graphics.endFill();
            this.bar.cache(0, margin, this.w, this.h);
        } else {
            throw new Error("value between 0-1");
        }
    },
    get: function () {
        return GameInfo.countTime * this._progress;
    }
});
TimerBar.prototype.residualTime = function () {
    //return this.w*this.progress;
};
TimerBar.prototype.timeRestart = function (ms) {

    this.progress = ms || GameInfo.countTime;
    var duration = ms || GameInfo.countTime;

    if (this.tween) {
        createjs.Tween.removeTweens(this);
    }
    this.tween = createjs.Tween.get(this, {override: true}).to({progress: 0}, duration).call(function () {
        this.dispatchEvent("time-over");
        //console.log("time-over");
    }.bind(this));
};
TimerBar.prototype.minusTime = function () {
    //点错一次，总剩余时间将减少
    var ms = this.progress - GameInfo.timePunish;
    if (ms > 0) {
        this.timeRestart(ms, ms);
    } else {
        this.timeRestart(1, 1);
    }
};
TimerBar.prototype.timerPause = function (p) {
    this.tween.setPaused(p);
};
module.exports = TimerBar;