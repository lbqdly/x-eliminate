/**
 * Created by YTRX-CTO on 2015/9/8.
 */
import GameInfo from './GameInfo';

class Grid extends createjs.Container{
    constructor(girdID, bgtype){
        super();

        this.id=girdID;
        this.elem=null;
        this.flag=null;

        this.bg = new createjs.Shape();
        var round = GameInfo.round, size = GameInfo.size, girdType0 = GameInfo.girdType0, girdType1 = GameInfo.girdType1, gap = GameInfo.gap;
        this.bg.graphics.append(new createjs.Graphics.RoundRect(gap, gap, size - gap, size - gap, round, round, round, round), false);
        this.bg.graphics.append(new createjs.Graphics.Fill(bgtype ? girdType0 : girdType1), false);
        this.addChild(this.bg);
        this.bg.cache(0, 0, size, size);


        var num = new createjs.Text();
        num.text = girdID;
        num.font = "16px";
    }

    dispelEl(){

    }

}

export default Grid;

