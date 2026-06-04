import { Container } from '@drk4/game-engine';
import { describe, expect, it, vi } from 'vitest';
import type { MessageView, RandomInt } from '../source/game_contracts';
import { Weapon } from '../source/weapon';

const centeredRandom: RandomInt = (min, max) => Math.round((min + max) / 2);

function createWeapon() {
    const showMessage = vi.fn();
    const hideMessage = vi.fn();
    const onCollision = vi.fn();
    const onBulletsChanged = vi.fn();
    const message: MessageView = {
        show: showMessage,
        hide: hideMessage,
    };
    const weapon = new Weapon({
        type: 'machineGun',
        bulletContainer: new Container(),
        message,
        onCollision,
        onBulletsChanged,
        randomInt: centeredRandom,
    });

    return {
        weapon,
        showMessage,
        hideMessage,
        onCollision,
        onBulletsChanged,
    };
}

describe('Weapon', () => {
    it('fires only while held and respects its firing interval', () => {
        const { weapon, onCollision, onBulletsChanged } = createWeapon();
        const pointer = { held: true, x: 100, y: 100 };

        expect(onBulletsChanged).toHaveBeenCalledWith(30);

        weapon.tick(0, pointer);
        weapon.tick(199, pointer);

        expect(onCollision).toHaveBeenCalledTimes(1);

        weapon.tick(1, pointer);
        weapon.tick(1000, { ...pointer, held: false });

        expect(onCollision).toHaveBeenCalledTimes(2);
        expect(onBulletsChanged).toHaveBeenLastCalledWith(28);
    });

    it('resets recoil when firing stops', () => {
        const { weapon, onCollision } = createWeapon();
        const pointer = { held: true, x: 100, y: 100 };

        weapon.tick(0, pointer);
        weapon.tick(200, pointer);
        weapon.tick(200, pointer);
        weapon.stopFiring();
        weapon.tick(200, pointer);

        expect(onCollision.mock.calls).toEqual([
            [95, 95, 10],
            [95, 95, 10],
            [95, 80, 10],
            [95, 95, 10],
        ]);
    });

    it('reloads after the magazine is empty', () => {
        const {
            weapon,
            showMessage,
            hideMessage,
            onCollision,
            onBulletsChanged,
        } = createWeapon();
        const pointer = { held: true, x: 100, y: 100 };

        for (let index = 0; index < 30; index++) {
            weapon.tick(index === 0 ? 0 : 200, pointer);
        }

        expect(onCollision).toHaveBeenCalledTimes(30);
        expect(onBulletsChanged).toHaveBeenLastCalledWith(0);
        expect(showMessage).toHaveBeenCalledWith('Reloading..');

        weapon.tick(1799, pointer);

        expect(onCollision).toHaveBeenCalledTimes(30);
        expect(hideMessage).not.toHaveBeenCalled();

        weapon.tick(1, pointer);

        expect(hideMessage).toHaveBeenCalledOnce();
        expect(onBulletsChanged).toHaveBeenLastCalledWith(30);
    });
});
