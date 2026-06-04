import { getCanvas, init as initEngine } from '@drk4/game-engine';
import { Bullet } from './bullet';
import { CrossHair } from './crosshair';
import { G } from './globals';
import * as Game from './game';
import * as GameMenu from './game_menu';
import * as Message from './message';
import { Target } from './target';

window.addEventListener('load', function () {
    var container = document.querySelector('#GameCanvas') as HTMLElement;

    initEngine({
        container: container,
        width: 600,
        height: 400,
    });

    G.CANVAS = getCanvas();

    GameMenu.init();

    // the order here sets the z-index of the elements
    // for example, right now the bullets will always be on top of the targets
    Target.init();
    Bullet.init();
    CrossHair.init();
    Message.init();

    Game.init();
    Game.start();
});
