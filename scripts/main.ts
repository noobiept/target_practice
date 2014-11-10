/// <reference path="../typings/tsd.d.ts" />
/// <reference path="crosshair.ts" />
/// <reference path="target.ts" />
/// <reference path="game.ts" />

var G = {
    CANVAS: null,
    STAGE: null,
    PRELOAD: null
};


window.onload = function()
{
G.CANVAS = document.querySelector( '#MainCanvas' );
G.CANVAS.width = 600;
G.CANVAS.height = 400;
G.STAGE = new createjs.Stage( G.CANVAS );
G.STAGE.mouseMoveOutside = true;

Game.init();

createjs.Ticker.on( 'tick', function( event )
    {
    G.STAGE.update();
    });
};

