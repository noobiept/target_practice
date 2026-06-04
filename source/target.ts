import { Container, Rectangle, addElement } from '@drk4/game-engine';

export class Target {
    shape: Rectangle;
    duration_count: number; // remove the target after a certain time has passed (and count as a miss)
    health: number;

    static _duration = 3000;
    static side_length = 10; // the width/height

    private static _container: Container; // all targets will be added to this container

    static init() {
        Target._container = new Container();

        addElement(Target._container);
    }

    static setDuration(duration) {
        Target._duration = duration;
    }

    static getDuration() {
        return Target._duration;
    }

    constructor(x: number, y: number, health = 1) {
        var length = Target.side_length;

        var shape = new Rectangle({
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

    tookDamage(damage) {
        this.health -= damage;

        return this.health <= 0;
    }

    tick(deltaMs: number) {
        this.duration_count += deltaMs;

        if (this.duration_count >= Target._duration) {
            return true;
        }

        return false;
    }

    clear() {
        Target._container.removeChild(this.shape);
    }

    getX() {
        return this.shape.left;
    }

    getY() {
        return this.shape.top;
    }
}
