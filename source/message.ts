import { Container, Rectangle, Text, addElement } from '@drk4/game-engine';
import { Timeout } from '@drk4/utilities';
import { G } from './globals';

let CONTAINER: Container;
let TEXT: Text;
let TIMEOUT: Timeout;

export function init(): void {
    const canvasWidth = G.CANVAS.width;
    const canvasHeight = G.CANVAS.height;

    // container
    CONTAINER = new Container();

    addElement(CONTAINER);

    // text element
    TEXT = new Text({
        text: '',
        fontSize: 26,
        fontFamily: 'monospace',
        textAlign: 'center',
        textBaseline: 'middle',
        color: 'black',
        x: canvasWidth / 2,
        y: canvasHeight / 2 + 15,
    });

    // background element
    const background = new Rectangle({
        x: canvasWidth / 2,
        y: canvasHeight / 2 + 15,
        width: canvasWidth,
        height: 30,
        color: 'rgb(161,170,227)',
    });

    CONTAINER.addChild(background);
    CONTAINER.addChild(TEXT);

    CONTAINER.visible = false;

    // timeout
    TIMEOUT = new Timeout();
}

export function show(
    text: string,
    timeout?: number,
    callback?: () => void,
): void {
    TEXT.text = text;
    CONTAINER.visible = true;

    if (timeout !== undefined) {
        TIMEOUT.start(function () {
            callback?.();

            CONTAINER.visible = false;
        }, timeout);
    }
}

export function hide(): void {
    TIMEOUT.clear();
    CONTAINER.visible = false;
}
