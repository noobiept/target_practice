import { Container, Rectangle, Text, addElement } from '@drk4/game-engine';
import { Timeout } from '@drk4/utilities';
import { G } from './globals';

var CONTAINER: Container;
var TEXT: Text;
var BACKGROUND: Rectangle;
var TIMEOUT: Timeout;

export function init() {
    var canvasWidth = G.CANVAS.width;
    var canvasHeight = G.CANVAS.height;

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
    BACKGROUND = new Rectangle({
        x: canvasWidth / 2,
        y: canvasHeight / 2 + 15,
        width: canvasWidth,
        height: 30,
        color: 'rgb(161,170,227)',
    });

    CONTAINER.addChild(BACKGROUND);
    CONTAINER.addChild(TEXT);

    CONTAINER.visible = false;

    // timeout
    TIMEOUT = new Timeout();
}

export function show(text, timeout?, callback?) {
    TEXT.text = text;
    CONTAINER.visible = true;

    if (typeof timeout !== 'undefined') {
        TIMEOUT.start(function () {
            if (typeof callback !== 'undefined') {
                callback();
            }

            CONTAINER.visible = false;
        }, timeout);
    }
}

export function hide() {
    TIMEOUT.clear();
    CONTAINER.visible = false;
}
