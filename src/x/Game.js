/**
 * Created by YTRX-CTO on 2015/9/8.
 */
import ProgressBar from './ProgressBar.js';
import GameInfo from './GameInfo.js';
import Assets from './Assets.js';
import ScenePlay from './ScenePlay.js';
import Point from "./Point.js";

let stage, canvas, progressBar, loader;//

function start(_canvas) {
    canvas = _canvas;
    //console.log('game start');
    document.getElementById('game').setAttribute('width', GameInfo.getWidth() + '');
    document.getElementById('game').setAttribute('height', GameInfo.getHeight() + '');

    stage = new createjs.Stage(canvas);
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    //stage.enableDOMEvents(true);
    //createjs.Touch.enable(stage);//启用舞台
    createjs.Ticker.addEventListener("tick", function (e) {
        stage.update(e);
    });

    progressBar = new ProgressBar();
    stage.addChild(progressBar);

    loader = new createjs.LoadQueue();
    loader.installPlugin(createjs.Sound);
    loader.loadManifest(Assets.mainfest);
    loader.on('progress', function (e) {
        //console.log(e.progress);
        progressBar.change(e.progress);
    });
    loader.on('complete', function (e) {
        Assets.loader = loader;
        createjs.Tween.get(progressBar).to({alpha: 0, y: "20"}, 500, createjs.Ease.backIn).call(function () {
            stage.removeChild(progressBar);
            let scenePlay = new ScenePlay();
            stage.addChild(scenePlay);
        });
    });
    loader.load();
}
export {start};
