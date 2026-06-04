import { Circle, Container, addElement } from '@drk4/game-engine';

export class CrossHair {
    readonly shape: Circle;

    private static _container: Container;

    static init(): void {
        CrossHair._container = new Container();

        addElement(CrossHair._container);
    }

    constructor() {
        const radius = 3;

        const shape = new Circle({
            x: 0,
            y: 0,
            radius: radius,
            color: 'black',
        });

        CrossHair._container.addChild(shape);

        this.shape = shape;
    }

    moveTo(x: number, y: number): void {
        this.shape.x = x;
        this.shape.y = y;
    }

    clear(): void {
        CrossHair._container.removeChild(this.shape);
    }
}
