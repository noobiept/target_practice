/// <reference path="../typings/tsd.d.ts" />
/// <reference path="crosshair.ts" />
/// <reference path="target.ts" />
/// <reference path="bullet.ts" />
/// <reference path="game.ts" />
/// <reference path="weapon.ts" />
/// <reference path="game_menu.ts" />
/// <reference path="message.ts" />
var G = {
    CANVAS: null,
    STAGE: null,
    PRELOAD: null
};
window.onload = function () {
    G.CANVAS = document.querySelector('#MainCanvas');
    G.CANVAS.width = 600;
    G.CANVAS.height = 400;
    G.STAGE = new createjs.Stage(G.CANVAS);
    G.STAGE.mouseMoveOutside = true;
    GameMenu.init();
    // the order here sets the z-index of the elements
    // for example, right now the bullets will always be on top of the targets
    Target.init(G.STAGE);
    Bullet.init(G.STAGE);
    CrossHair.init(G.STAGE);
    Message.init(G.STAGE);
    Game.init();
    Game.start();
    createjs.Ticker.on('tick', function (event) {
        G.STAGE.update();
    });
};
