import { Container, Rectangle, Text } from '@drk4/game-engine';
import { Timeout } from '@drk4/utilities';
import type { MessageView } from './game_contracts';

export class GameMessage implements MessageView {
    private readonly text: Text;
    private readonly timeout = new Timeout();

    constructor(
        private readonly container: Container,
        canvasWidth: number,
        canvasHeight: number,
    ) {
        this.text = new Text({
            text: '',
            fontSize: 26,
            fontFamily: 'monospace',
            textAlign: 'center',
            textBaseline: 'middle',
            color: 'black',
            x: canvasWidth / 2,
            y: canvasHeight / 2 + 15,
        });

        const background = new Rectangle({
            x: canvasWidth / 2,
            y: canvasHeight / 2 + 15,
            width: canvasWidth,
            height: 30,
            color: 'rgb(161,170,227)',
        });

        this.container.addChild(background);
        this.container.addChild(this.text);

        this.container.visible = false;
    }

    show(text: string, timeout?: number, callback?: () => void): void {
        this.text.text = text;
        this.container.visible = true;

        if (timeout !== undefined) {
            this.timeout.start(() => {
                callback?.();

                this.container.visible = false;
            }, timeout);
        }
    }

    hide(): void {
        this.timeout.clear();
        this.container.visible = false;
    }
}
