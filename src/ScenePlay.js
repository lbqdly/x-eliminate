/**
 * Created by YTRX-CTO on 2015/9/9.
 */
var GameInfo = require('./GameInfo.js');
var Assets = require('./Assets.js');
var Grid = require('./Grid.js');
var Util = require('./Util.js');
var Elem = require(('./Elem.js'));
var TimerBar = require('./TimerBar.js');
var Point = require("./Point.js");
var Scores = require("./Scores.js");

/*所有格子的数据*/
var gridsData = {};
var grids = [];//
var gridsContainer;
var elems = [];//所有的元素
var elemsContainer;
var pointContainer;//这个容器用了装分数特效
var timerBar;
var scoresContainer;//记分层
var beginDialog;//会话层
var endDialog;

var keepClick = 1;//连击次数
var keepClickTimer = 0;


var col;
var row;
var marginLeft;

var ScenePlay = function () {
    createjs.Container.call(this);

    col = Math.floor(GameInfo.getWidth() / GameInfo.size);
    row = Math.floor((GameInfo.getHeight() - GameInfo.timerBarHeight - GameInfo.scoreBarHeight - 30) / GameInfo.size);
    marginLeft = (GameInfo.getWidth() - col * GameInfo.size) / 2;


    /*记分系统*/

    scoresContainer = new Scores(col * GameInfo.size);
    scoresContainer.x = marginLeft;

    pointContainer = new createjs.Container();
    this.createTimerBar();
    timerBar.x = marginLeft;
    timerBar.y = scoresContainer.y + scoresContainer.getBounds().height;
    timerBar.addEventListener("time-over", this._onTimeOver.bind(this));

    /*创建格子图*/
    this.createGrids();
    gridsContainer.x = marginLeft;
    gridsContainer.y = timerBar.y + timerBar.getBounds().height;
    this.createElems();
    this.resetElems();

    beginDialog = require("./beginDialog.js");
    beginDialog.addEventListener("game-start", function (e) {
        this.removeChild(beginDialog);
        this.gameRestart();
    }.bind(this));

    endDialog = require("./endDialog.js");
    endDialog.scores = scoresContainer;
    endDialog.addEventListener("game-restart", function (e) {
        this.removeChild(endDialog);
        this.addChild(beginDialog);
    }.bind(this));

    this.addChild(timerBar, gridsContainer, elemsContainer, scoresContainer, pointContainer, beginDialog);

};
ScenePlay.prototype = Object.create(createjs.Container.prototype);
ScenePlay.prototype.constructor = ScenePlay;

ScenePlay.prototype.createGrids = function () {
    grids = [];
    gridsContainer = new createjs.Container();
    for (var c = 0; c < col; c++) {
        for (var r = 0; r < row; r++) {
            var gridType = (c + r) % 2 == 0;
            var gird = new Grid(c + '-' + r, gridType);//返回一个
            gird.x = GameInfo.size * c;
            gird.y = GameInfo.size * r;
            gridsContainer.addChild(gird);
            grids.push(gird);
            gridsData[c + '-' + r] = gird;
            gird.on('click', function (e) {
                this.response(e.currentTarget);
            }.bind(this));
        }
    }
    gridsContainer.cache(0, 0, GameInfo.getWidth(), GameInfo.getHeight());
    //console.log("格子创建完成");
    gridsContainer.mouseChildren = false;
};
ScenePlay.prototype._onTimeOver = function (e) {
    this.gameOver();
};
ScenePlay.prototype.createElems = function () {
    /*创建元素*/
    elems = [];
    elemsContainer = new createjs.Container();
    for (var i = 0, len = Math.floor(col * row * GameInfo.dense); i < len; i++) {
        /*创建一个糖果*/
        var elem = new Elem('el' + i % GameInfo.totalEl);
        elem.regX = elem.getBounds().width / 2;
        elem.regY = elem.getBounds().height / 2;
        elems.push(elem);
        elemsContainer.addChild(elem);
    }
    //console.log("元素创建完成");
};

ScenePlay.prototype.createTimerBar = function () {
    timerBar = new TimerBar(col * GameInfo.size);
};

ScenePlay.prototype.gameOver = function () {
    //over
    //console.log("game over !");
    timerBar.timerPause(true);
    gridsContainer.mouseChildren = false;
    scoresContainer.setLocalScore();
    this.addChild(endDialog);
    createjs.Sound.play("mp3_end");
};

ScenePlay.prototype.gameRestart = function () {
    this.resetElems();
    timerBar.timeRestart();
    gridsContainer.mouseChildren = true;
    scoresContainer.resetScore();
};
ScenePlay.prototype.resetElems = function () {
    /*重新布局*/
    grids = Util.randomize(grids);//打乱了顺序
    for (var i = 0, len = grids.length; i < len; i++) {
        if (i < elems.length) {
            grids[i].elem = elems[i];
            var p = gridsContainer.localToGlobal(grids[i].x, grids[i].y);
            elems[i].x = p.x + GameInfo.size / 2;
            elems[i].y = p.y + GameInfo.size / 2;
            elems[i].id = grids[i].id;
            elems[i].reset();//复位
        } else {
            grids[i].elem = null;
        }
    }
};
/*根据一个格子，查找符合游戏规则的其他格子，将返回一个数组*/
ScenePlay.prototype.find = function (grid) {
    var accepts = [];
    //var pass = [];
    var id = grid.id;
    var t_col = parseInt(id.split('-')[0]);
    var t_row = parseInt(id.split('-')[1]);
    var target, i;

    //console.log(id);
    /*up*/
    if (t_row > 0) {
        for (i = t_row - 1; i >= 0; i--) {
            target = gridsData[t_col + "-" + i];
            if (target.elem && target.elem.alpha == 1) {
                //console.log('up');
                accepts.push(target.elem);
                break;
            }
        }
    }


    /*right*/
    if (t_col < col - 1) {
        for (i = t_col + 1; i < col; i++) {
            target = gridsData[i + "-" + t_row];
            if (target.elem && target.elem.alpha == 1) {
                //console.log('right');
                accepts.push(target.elem);
                break;
            }
        }
    }


    /*down*/
    if (t_row < row - 1) {
        for (i = t_row + 1; i < row; i++) {
            target = gridsData[t_col + "-" + i];
            if (target.elem && target.elem.alpha == 1) {
                //console.log('down');
                accepts.push(target.elem);
                break;
            }
        }
    }


    /*left*/
    if (t_col > 0) {
        for (i = t_col - 1; i >= 0; i--) {
            target = gridsData[i + "-" + t_row];
            if (target.elem && target.elem.alpha == 1) {
                //console.log('left');
                accepts.push(target.elem);
                break;
            }
        }
    }

    return accepts;
};
ScenePlay.prototype.check = function () {
    var result = {grid: null, elems: null};
    for (var i = 0, len = grids.length; i < len; i++) {
        var g = grids[i];
        var re = null;
        if (!g.elem || g.elem.alpha < 1) {
            //
            re = this.getSameByColor(this.find(g));
            if (re.length > 0) {
                result.grid = g;
                result.elems = re;
                break;
            }
        }
    }

    if (!result.grid) {
        //console.log("没有找到合格品，游戏已结束。");
        this.gameOver();
    }
};
/*将一个数组中的元素进行颜色匹配，规则是至少有两个相同的颜色元素*/
ScenePlay.prototype.getSameByColor = function (arr) {
    var accepts = [];//成果
    var len = arr.length;
    for (var i = 0; i < len; i++) {
        for (var j = 0; j < len; j++) {
            if (i != j && arr[i].color == arr[j].color) {/**/
                if (accepts.indexOf(arr[i]) < 0) {
                    accepts.push(arr[i])
                }
                if (accepts.indexOf(arr[j]) < 0) {
                    accepts.push(arr[j])
                }
            }
        }
    }
    return accepts;
};
ScenePlay.prototype.reject = function (arr) {
    for (var i = 0, len = arr.length; i < len; i++) {
        elemsContainer.setChildIndex(arr[i], elemsContainer.numChildren - 1);
        arr[i].dispelEffcet();
    }
};
ScenePlay.prototype.getBetween = function (arr) {
    //var accepts = [];
};
/*根据gird响应*/
ScenePlay.prototype.response = function (gird) {
    if (!gird.elem || gird.elem.alpha < 1) {
        var result = this.getSameByColor(this.find(gird));
        if (result.length > 0) {
            //console.log('点对');
            this.reject(result);//消除掉
            this.addScores(result);//记分
            createjs.Sound.play("mp3_work");

            this.check();

        } else {
            //console.log('点错');
            /*点错后扣掉一点时间*/
            timerBar.minusTime();
            createjs.Sound.play("mp3_fail");
        }
    }
};
ScenePlay.prototype.showPoint = function (eles, keepClick) {
    //显示分数

    var score = keepClick * GameInfo.scoreScale;
    for (var i = 0, len = eles.length; i < len; i++) {
        var po = new Point(score, "font2");
        po.x = eles[i].x;
        po.y = eles[i].y;
        pointContainer.addChild(po);
        var end_y = po.y - 30;
        var end_x = po.x + Math.random() * 20 - 10;
        createjs.Tween.get(po).to({alpha: 0, y: end_y, x: end_x}, 800, createjs.Ease.backIn).call(function (p) {
            pointContainer.removeChild(p);
        }, [po]);
    }

    //添加连击效果
    if (keepClick > 1) {
        var keepPo = new Point(keepClick + "连击!", "font3");
        keepPo.x = GameInfo.getWidth() / 2 - 100;
        keepPo.y = GameInfo.getHeight() / 2;
        pointContainer.addChild(keepPo);
        createjs.Tween.get(keepPo).to({
            alpha: 0,
            y: GameInfo.getHeight() / 2 - 30
        }, 1500, createjs.Ease.backIn).call(function (p) {
            pointContainer.removeChild(p);
        }, [keepPo]);
    }
};


ScenePlay.prototype.addScores = function (eles) {
    var date = new Date();
    //console.log(date.getTime() - keepClickTimer);
    if (date.getTime() - keepClickTimer < GameInfo.keepClickGap) {
        keepClick += 1;
    } else {
        keepClick = 1;
    }
    scoresContainer.updateSessionScore(keepClick * GameInfo.scoreScale * eles.length);
    keepClickTimer = date.getTime();

    this.showPoint(eles, keepClick);
};
ScenePlay.prototype.removeScores = function () {

};
/*---------------------*/
module.exports = ScenePlay;