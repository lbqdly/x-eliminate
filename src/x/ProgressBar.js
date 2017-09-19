/**
 * Created by YTRX-CTO on 2015/8/14.
 */
/*进度条*/
import GameInfo from './GameInfo.js';
var w = GameInfo.getWidth();
var h = GameInfo.getHeight();

class ProgressBar extends createjs.Container {

    constructor() {
        super();
        this.w = w / 3;
        this.h = 20;
        this._buildUI();
    }

    _buildUI() {
        this.progressBG = new createjs.Shape();
        this.progressBG.graphics.beginFill("#a7a7a7").drawRect(0, 0, this.w, this.h);
        this.progressBG.x = w / 2 - this.w / 2;
        this.progressBG.y = h / 2 - this.h / 2;
        this.addChild(this.progressBG);

        var padding = 2;
        this.progressPercent = new createjs.Shape();
        this.progressPercent.graphics.beginFill("#5b970b").drawRect(0, 0, this.w - padding * 2, this.h - padding * 2);
        this.progressPercent.x = this.progressBG.x + padding;
        this.progressPercent.y = this.progressBG.y + padding;
        this.progressPercent.scaleX = 0.01;
        this.addChild(this.progressPercent);
    };

    change(percent) {
        this.progressPercent.scaleX = percent;
        //console.log(percent);
    };

    hide() {

    };
}


export default ProgressBar;