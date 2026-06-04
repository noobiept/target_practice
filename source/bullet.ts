import { Container, Rectangle } from '@drk4/game-engine';

export class Bullet {
    readonly shape: Rectangle;
    duration_count: number; // remove the bullet after a certain time/duration has passed
    static readonly duration = 700; // the duration of the bullets

    static readonly side_length = 10; // the width/height (its the same value)

    constructor(
        private readonly container: Container,
        x: number,
        y: number,
    ) {
        const shape = new Rectangle({
            x: x + Bullet.side_length / 2,
            y: y + Bullet.side_length / 2,
            width: Bullet.side_length,
            height: Bullet.side_length,
            color: 'blue',
        });

        this.container.addChild(shape);

        this.duration_count = 0;
        this.shape = shape;
    }

    tick(deltaMs: number): boolean {
        this.duration_count += deltaMs;

        return this.duration_count >= Bullet.duration;
    }

    clear(): void {
        this.container.removeChild(this.shape);
    }

    getX(): number {
        return this.shape.left;
    }

    getY(): number {
        return this.shape.top;
    }
}
