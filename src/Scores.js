/**
 * Created by YTRX-CTO on 2016/1/15.
 */

var store = require("../node_modules/store2/dist/store2.min.js");
var GameInfo = require("./GameInfo.js");
var Assets = require("./Assets.js");
//console.log(store());
var margin_top = 10;
var margin_bottom = 0;
function Scores(w) {
    createjs.Container.call(this);

    var h = GameInfo.scoreBarHeight;
    var bg = new createjs.Shape();
    bg.graphics.beginFill("#aaaa9a");
    bg.graphics.drawRect(0, 0, 0, h + margin_top + margin_bottom);
    bg.graphics.drawRoundRect(0, margin_top, w, h, 0);
    bg.graphics.endFill();
    bg.cache(0, 0, w, h + margin_top + margin_bottom);
    this.addChild(bg);

    var c_y = 14;
    var nows = new createjs.Bitmap(Assets.loader.getResult("nowscore"));
    nows.x = 0;
    nows.y = c_y;
    this.addChild(nows);
    var bests = new createjs.Bitmap(Assets.loader.getResult("bestscore"));
    bests.x = 300;
    bests.y = c_y;
    this.addChild(bests);


    this.sessionScore = 0;
    this.sessionTxt = new createjs.BitmapText("0", Assets.loader.getResult("font2"));
    this.sessionTxt.x = nows.x + 110;
    this.sessionTxt.y = c_y;
    this.addChild(this.sessionTxt);

    this.bestTxt = new createjs.BitmapText("0", Assets.loader.getResult("font2"));
    this.bestTxt.x = bests.x + 110;
    this.bestTxt.y = c_y;
    this.addChild(this.bestTxt);

    if (!store(GameInfo.BEST_SCORE)) {
        store(GameInfo.BEST_SCORE, 0);
    }


    this.resetScore();

}

Scores.prototype = Object.create(createjs.Container.prototype);
Scores.prototype.constructor = Scores;
module.exports = Scores;

Scores.prototype.updateSessionScore = function (num) {
    this.sessionScore += num;
    this.sessionTxt.text = String(this.sessionScore);
};
Scores.prototype.setLocalScore = function () {
    if (this.getLocalScore() < this.sessionScore) {
        store(GameInfo.BEST_SCORE, this.sessionScore);
    }
};
Scores.prototype.getLocalScore = function () {
    return store(GameInfo.BEST_SCORE);
};
Scores.prototype.resetScore = function () {
    this.sessionScore = 0;
    this.sessionTxt.text = "0";
    //console.log(this.sessionScore);
    this.bestTxt.text = String(this.getLocalScore());
};