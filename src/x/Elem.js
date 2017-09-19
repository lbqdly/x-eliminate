/**
 * Created by lly on 2015/9/13.
 */
import Assets from './Assets.js';

class Elem extends createjs.Container {
    id = '';
    gird = null;

    constructor(color) {
        super();
        this.color = color;
        this.el = new createjs.Bitmap(Assets.loader&&Assets.loader.getResult(this.color));
        this.addChild(this.el);
        this.mouseEnabled = false;
        this.mouseChildren = false;
    }


    dispelEffcet() {
        this.alpha = 0.95;//及时作出改变，因为外部依据alpha<1做判断
        var endY = this.y + 100,
            endR = Math.random() * 360 - 180,
            endX = this.x + ( Math.random() * 50 - 25);
        createjs.Tween.get(this).to({alpha: 0, rotation: endR, x: endX}, 500, createjs.Ease.linear);
        createjs.Tween.get(this).to({y: endY}, 500, createjs.Ease.backIn);
    };

    reset() {
        this.alpha = 1;
        this.rotation = 0;
    };

}

//
//var Elem = function (color) {
//    createjs.Container.call(this);
//    this.color = color;
//    this.el = new createjs.Bitmap(Assets.loader.getResult(this.color));
//    this.addChild(this.el);
//    this.mouseEnabled = false;
//    this.mouseChildren = false;
//};
//Elem.prototype = Object.create(createjs.Container.prototype);
//Elem.prototype.constructor = Elem;
//Elem.prototype.id = "";
//Elem.prototype.gird = null;
//
//Elem.prototype.dispelEffcet = function () {
//    this.alpha = 0.95;//及时作出改变，因为外部依据alpha<1做判断
//    var endY = this.y + 100,
//        endR = Math.random() * 360 - 180,
//        endX = this.x + ( Math.random() * 50 - 25);
//    createjs.Tween.get(this).to({alpha: 0, rotation: endR, x: endX}, 500, createjs.Ease.linear);
//    createjs.Tween.get(this).to({y: endY}, 500, createjs.Ease.backIn);
//};
//Elem.prototype.reset = function () {
//    this.alpha = 1;
//    this.rotation = 0;
//};
/*
 Elem.prototype.dispel = function () {
 var el = this;
 /!*var vx = Math.random() * 10 - 5,//初始速度
 vy = -13,
 g = 2;//加速度*!/
 createjs.Tween.get(el)
 //.wait(500)
 .to({alpha: 0, visible: false}, 1000)
 .call(handleComplete);
 function handleComplete() {
 //Tween complete
 }
 };
 */
export default Elem;


