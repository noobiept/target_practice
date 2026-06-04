import { Container, Rectangle, addElement } from '@drk4/game-engine';

export class Target {
    readonly shape: Rectangle;
    duration_count: number; // remove the target after a certain time has passed (and count as a miss)
    health: number;

    private static _duration = 3000;
    static readonly side_length = 10; // the width/height

    private static _container: Container; // all targets will be added to this container

    static init(): void {
        Target._container = new Container();

        addElement(Target._container);
    }

    static setDuration(duration: number): void {
        Target._duration = duration;
    }

    static getDuration(): number {
        return Target._duration;
    }

    constructor(x: number, y: number, health = 1) {
        const length = Target.side_length;

        const shape = new Rectangle({
            x: x + length / 2,
            y: y + length / 2,
            width: length,
            height: length,
            color: 'red',
        });

        Target._container.addChild(shape);

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

        return this.duration_count >= Target._duration;
    }

    clear(): void {
        Target._container.removeChild(this.shape);
    }

    getX(): number {
        return this.shape.left;
    }

    getY(): number {
        return this.shape.top;
    }
}
