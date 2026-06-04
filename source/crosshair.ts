import { Circle, Container } from '@drk4/game-engine';

export class CrossHair {
    readonly shape: Circle;

    constructor(private readonly container: Container) {
        const radius = 3;

        const shape = new Circle({
            x: 0,
            y: 0,
            radius: radius,
            color: 'black',
        });

        this.container.addChild(shape);

        this.shape = shape;
    }

    moveTo(x: number, y: number): void {
        this.shape.x = x;
        this.shape.y = y;
    }

    clear(): void {
        this.container.removeChild(this.shape);
    }
}
