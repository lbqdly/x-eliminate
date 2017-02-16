var GameInfo = require('./GameInfo.js');
/**
 * Created by YTRX-CTO on 2015/9/8.
 */
var Grid = function (girdID, bgtype) {
    createjs.Container.call(this);

    this.id = girdID;

    this.bg = new createjs.Shape();
    var round = GameInfo.round, size = GameInfo.size, girdType0 = GameInfo.girdType0, girdType1 = GameInfo.girdType1, gap = GameInfo.gap;
    this.bg.graphics.append(new createjs.Graphics.RoundRect(gap, gap, size - gap, size - gap, round, round, round, round), false);
    this.bg.graphics.append(new createjs.Graphics.Fill(bgtype ? girdType0 : girdType1), false);
    this.addChild(this.bg);
    this.bg.cache(0, 0, size, size);


    var num = new createjs.Text();
    num.text = girdID;
    num.font = "16px";
    //this.addChild(num);

    /*this.flag = new createjs.Shape();
     this.flag.graphics.append(new createjs.Graphics.Circle(size / 2, size / 2, size / 10), false);
     this.flag.graphics.append(new createjs.Graphics.Fill(GameInfo.flagColor), false);
     //this.flag.visible=false;
     this.flag.cache(0, 0, 60, 60);
     this.addChild(this.flag);
     this.flag.visible = false;*/
};

Grid.prototype = Object.create(createjs.Container.prototype);
Grid.prototype.constructor = Grid;
module.exports = Grid;
Grid.prototype.id = "";

Grid.prototype.elem = null;//元素
Grid.prototype.flag = null;

Grid.prototype.dispelEl = function () {
    /* if (this.empty) {
     this.empty = false;
     //this.el.visible = false;
     this.addEventListener('tick', _onTick.bind(this));
     }
     var vx = Math.random() * 10 - 5,//初始速度
     vy = -13,
     g = 2;//加速度
     function _onTick(e) {
     vy += g;
     this.el.x += vx;
     this.el.y += vy;
     if (this.el.alpha <= 0) {
     this.el.visible = false;
     this.el.x = 0;
     this.el.y = 0;
     console.log('remove');
     this.removeAllEventListeners('tick');
     } else {
     this.el.alpha -= 0.04;
     }
     //console.log('ing');
     }*/
};
