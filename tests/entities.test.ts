import { Container } from '@drk4/game-engine';
import { describe, expect, it } from 'vitest';
import { Bullet } from '../source/bullet';
import { Target } from '../source/target';

describe('Bullet', () => {
    it('expires after its configured duration and can be cleared', () => {
        const container = new Container();
        const bullet = new Bullet(container, 20, 30);

        expect(container.getAllChildren()).toEqual([bullet.shape]);
        expect(bullet.getX()).toBe(20);
        expect(bullet.getY()).toBe(30);
        expect(bullet.tick(Bullet.duration - 1)).toBe(false);
        expect(bullet.tick(1)).toBe(true);

        bullet.clear();

        expect(container.getAllChildren()).toEqual([]);
    });
});

describe('Target', () => {
    it('reports when damage destroys it', () => {
        const target = new Target(new Container(), 10, 15, 2, 1000);

        expect(target.tookDamage(1)).toBe(false);
        expect(target.tookDamage(1)).toBe(true);
    });

    it('expires after its configured duration and can be cleared', () => {
        const container = new Container();
        const target = new Target(container, 10, 15, 1, 1000);

        expect(container.getAllChildren()).toEqual([target.shape]);
        expect(target.getX()).toBe(10);
        expect(target.getY()).toBe(15);
        expect(target.tick(999)).toBe(false);
        expect(target.tick(1)).toBe(true);

        target.clear();

        expect(container.getAllChildren()).toEqual([]);
    });
});
