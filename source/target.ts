import { Container, Rectangle } from '@drk4/game-engine';

export class Target {
    readonly shape: Rectangle;
    duration_count: number; // remove the target after a certain time has passed (and count as a miss)
    health: number;

    static readonly side_length = 10; // the width/height

    constructor(
        private readonly container: Container,
        x: number,
        y: number,
        health: number,
        private readonly duration: number,
    ) {
        const length = Target.side_length;

        const shape = new Rectangle({
            x: x + length / 2,
            y: y + length / 2,
            width: length,
            height: length,
            color: 'red',
        });

        this.container.addChild(shape);

        this.duration_count = 0;
        this.shape = shape;
        this.health = health;
    }

    tookDamage(damage: number): boolean {
        this.health -= damage;

        return this.health <= 0;
    }

    tick(deltaMs: number): boolean {
        this.duration_count += deltaMs;

        return this.duration_count >= this.duration;
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
