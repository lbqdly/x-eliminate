/**
 * Created by YTRX-CTO on 2016/1/14.
 */


import Assets from './Assets';

class Point extends createjs.Container {
    constructor(str, font) {
        super();
        if (Assets.loader) {
            var ss = Assets.loader.getResult(String(font));
            var txt = new createjs.BitmapText(str + "", ss);

            this.addChild(txt);
        }

    }
}

export default Point;