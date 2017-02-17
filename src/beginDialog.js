/**
 * Created by YTRX-CTO on 2016/1/19.
 */

import Assets from "./Assets.js";
import GameInfo from './GameInfo.js';

class BeginDialog extends createjs.Container {
    constructor() {
        super();


        var t=this;

        var bg = new createjs.Shape();
        bg.graphics.beginFill("rgba(0,0,0,0.75)");
        bg.graphics.drawRect(0, 0, GameInfo.getWidth(), GameInfo.getHeight());
        bg.graphics.endFill();
        bg.cache(0, 0, GameInfo.getWidth(), GameInfo.getHeight());
        this.addChild(bg);


        var w = 340, h = 340, border = 5;
        var box = new createjs.Container();
        box.x = (GameInfo.getWidth() - w) / 2;
        box.y = (GameInfo.getHeight() - h) / 2;

        var box_bg = new createjs.Shape();
        box_bg.graphics.beginFill("rgba(210,210,210,1)");
        box_bg.graphics.beginStroke("#00a02d");
        box_bg.graphics.setStrokeStyle(border);
        box_bg.graphics.drawRoundRect(0, 0, w, h, 10);
        box_bg.graphics.endFill();
        box_bg.cache(0, 0, w, h);
        box.addChild(box_bg);


        var text = new createjs.Bitmap(Assets.loader.getResult("text"));
        box.addChild(text);
        text.x = (w - text.getBounds().width) / 2;
        text.y = 20;

        var howtoplay = new createjs.Sprite(Assets.loader.getResult("howtoplay"));
        howtoplay.play();
        howtoplay.framerate = 1;
        box.addChild(howtoplay);
        howtoplay.x = 165;
        howtoplay.y = 185;

        var startbtn = new createjs.Bitmap(Assets.loader.getResult("start"));
        box.addChild(startbtn);
        startbtn.x = (w - startbtn.getBounds().width) / 2;
        startbtn.y = 250;


        this.addChild(box);

        this.addEventListener("added", function () {

            box.y = (GameInfo.getHeight() - h) / 3;
            var end_y = (GameInfo.getHeight() - h) / 2;
            createjs.Tween.get(box).to({y: end_y}, 500, createjs.Ease.backOut);
        });

        startbtn.addEventListener("click", function (e) {
            t.dispatchEvent("game-start");
        });

    }
}


export default BeginDialog;