/**
 * Created by YTRX-CTO on 2016/1/19.
 */
var Assets = require("./Assets.js");
var GameInfo = require('./GameInfo.js');
var endDialog = new createjs.Container();

endDialog.scores = null;

var bg = new createjs.Shape();
bg.graphics.beginFill("rgba(0,0,0,0.75)");
bg.graphics.drawRect(0, 0, GameInfo.getWidth(), GameInfo.getHeight());
bg.graphics.endFill();
bg.cache(0, 0, GameInfo.getWidth(), GameInfo.getHeight());
endDialog.addChild(bg);

var w = 340, h = 340, border = 5;


var box = new createjs.Container();
box.x = (GameInfo.getWidth() - w) / 2;
box.y = (GameInfo.getHeight() - h) / 2;
endDialog.addChild(box);


var box_bg = new createjs.Shape();
box_bg.graphics.beginFill("rgba(210,210,210,1)");
box_bg.graphics.beginStroke("#00a02d");
box_bg.graphics.setStrokeStyle(border);
box_bg.graphics.drawRoundRect(0, 0, w, h, 10);
box_bg.graphics.endFill();
box_bg.cache(0, 0, w, h);
box.addChild(box_bg);

var resultTxt = new createjs.Bitmap(Assets.loader.getResult("result"));
box.addChild(resultTxt);
resultTxt.x = w / 2 - resultTxt.getBounds().width / 2;
resultTxt.y = 30;

var btnRestart = new createjs.Bitmap(Assets.loader.getResult("restart"));
btnRestart.x = w / 2 - btnRestart.getBounds().width / 2;
btnRestart.y = 150;
box.addChild(btnRestart);
var btnShare = new createjs.Bitmap(Assets.loader.getResult("share"));
btnShare.x = w / 2 - btnShare.getBounds().width / 2;
btnShare.y = 220;
box.addChild(btnShare);


var thisTimeScore = new createjs.BitmapText("", Assets.loader.getResult("font2"));
thisTimeScore.x = 245;
thisTimeScore.y = 59;
var bestScore = new createjs.BitmapText("", Assets.loader.getResult("font2"));
bestScore.x = 135;
bestScore.y = 85;

box.addChild(thisTimeScore, bestScore);

btnRestart.addEventListener("click", function (e) {
    endDialog.dispatchEvent("game-restart");
});
btnShare.addEventListener("click", function () {
    var isWX = function () {
        var ua = window.navigator.userAgent.toLowerCase();
        return (ua.match(/MicroMessenger/i) == 'micromessenger');
    };
    if (isWX()) {
        alert("请点击右上角选项，发送给朋友或分享到朋友圈！");
    }else{
        alert("请将此网址发送给朋友吧！");
    }

});
endDialog.addEventListener('added', function (e) {
    thisTimeScore.text = endDialog.scores.sessionScore + "";
    bestScore.text = endDialog.scores.getLocalScore() + "";
    show();
});
function show() {
    box.y = (GameInfo.getHeight() - h) / 3;
    var end_y = (GameInfo.getHeight() - h) / 2;
    createjs.Tween.get(box).to({y: end_y}, 500, createjs.Ease.sineOut);
}

module.exports = endDialog;

