/**
 * Created by YTRX-CTO on 2015/10/12.
 */
/*

 var Timer = function (repeat, gap) {
 this.repeat = repeat || Number.MAX_VALUE;
 this.gap = gap || 1000;

 createjs.EventDispatcher.initialize(Timer.prototype);
 this._paused = false;
 this.running = false;
 };
 Timer.prototype._tick = function () {
 window.setTimeout(function () {
 if (!this._paused) {
 this.repeat--;
 if (this.repeat <= 0) {
 this.running = false;
 this.dispatchEvent("timer-complete");
 } else {
 this.dispatchEvent("timer-change");
 this._tick();
 }
 }
 }.bind(this), this.gap);
 };
 Timer.prototype.pause = function () {
 this._paused = true;
 this.running = false;
 };
 Timer.prototype.play = function () {
 if (!this.running) {
 this._paused = false;
 this._tick();
 this.running = true;
 }
 };
 module.exports = Timer;
 */


import GameInfo from "./GameInfo.js";


function timeStart(bar, value) {
    var timer = {time: 1};
    createjs.Tween.get(timer).to({time: 0}, GameInfo.countTime * 1000).addEventListener("change", function (e) {
        bar[value] = timer.time;
    })
}

export {timeStart}

