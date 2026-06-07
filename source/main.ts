import {
    Container,
    addElement,
    addToGameLoop,
    getCanvas,
    init as initEngine,
} from '@drk4/game-engine';
import { Game, type GameLayers } from './game';
import { GameMenu } from './game_menu';
import { GameMessage } from './message';

window.addEventListener('load', function () {
    console.info(`target practice v${__APP_VERSION__}`);

    const container = document.querySelector<HTMLElement>('#GameCanvas');

    if (!container) {
        throw new Error('Missing required element: #GameCanvas');
    }

    initEngine({
        container,
        width: 600,
        height: 400,
    });

    const canvas = getCanvas();
    const canvasElement = canvas.getHtmlCanvasElement();
    const gameMenu = new GameMenu(document);
    const layers: GameLayers = {
        targets: new Container(),
        bullets: new Container(),
        crosshair: new Container(),
    };
    const messageContainer = new Container();

    addElement(layers.targets);
    addElement(layers.bullets);
    addElement(layers.crosshair);
    addElement(messageContainer);

    const message = new GameMessage(
        messageContainer,
        canvas.width,
        canvas.height,
    );
    const game = new Game({
        width: canvas.width,
        height: canvas.height,
        layers,
        hud: gameMenu,
        message,
    });

    gameMenu.bind(game);

    canvasElement.addEventListener('mousemove', function (event) {
        const bounds = canvasElement.getBoundingClientRect();

        game.movePointer(
            event.clientX - bounds.left,
            event.clientY - bounds.top,
        );
    });

    document.body.addEventListener('mousedown', function (event) {
        if (event.button !== 0) {
            return;
        }

        game.startFiring();
    });

    window.addEventListener('mouseup', function (event) {
        if (event.button !== 0) {
            return;
        }

        game.stopFiring();
    });

    window.addEventListener('blur', function () {
        game.stopFiring();
    });

    addToGameLoop(function (deltaTime) {
        game.tick(deltaTime * 1000);
    });

    game.start();
});
