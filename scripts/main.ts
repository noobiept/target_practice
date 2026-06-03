import { Bullet } from './bullet';
import { CrossHair } from './crosshair';
import { G } from './globals';
import * as Game from './game';
import * as GameMenu from './game_menu';
import * as Message from './message';
import { Target } from './target';

const easelUrl = import.meta.env.BASE_URL + 'libraries/easeljs-0.8.2.min.js';
const utilitiesUrl = import.meta.env.BASE_URL + 'libraries/utilities-1.2-min.js';

function loadScript( src: string )
    {
    return new Promise<void>( function( resolve, reject )
        {
        var script = document.createElement( 'script' );

        script.src = src;
        script.onload = function()
            {
            resolve();
            };
        script.onerror = function()
            {
            reject( new Error( 'Failed to load script: ' + src ) );
            };

        document.head.appendChild( script );
        });
    }

await loadScript( easelUrl );
await loadScript( utilitiesUrl );

window.addEventListener( 'load', function()
{
G.CANVAS = document.querySelector( '#MainCanvas' );
G.CANVAS.width = 600;
G.CANVAS.height = 400;
G.STAGE = new createjs.Stage( G.CANVAS );
G.STAGE.mouseMoveOutside = true;

createjs.Ticker.timingMode = createjs.Ticker.RAF;

GameMenu.init();

    // the order here sets the z-index of the elements
    // for example, right now the bullets will always be on top of the targets
Target.init( G.STAGE );
Bullet.init( G.STAGE );
CrossHair.init( G.STAGE );
Message.init( G.STAGE );

Game.init();
Game.start();

createjs.Ticker.on( 'tick', function( event )
    {
    G.STAGE.update();
    });
});
