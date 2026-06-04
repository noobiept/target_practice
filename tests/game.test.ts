import { Container } from '@drk4/game-engine';
import { describe, expect, it, vi } from 'vitest';
import { Game, type GameLayers } from '../source/game';
import type { GameHud, MessageView, RandomInt } from '../source/game_contracts';

const minimumRandom: RandomInt = (min) => min;

function createGame() {
    const updateHits = vi.fn();
    const updateMisses = vi.fn();
    const updateBulletsLeft = vi.fn();
    const showMessage = vi.fn();
    const hideMessage = vi.fn();
    const hud: GameHud = {
        updateHits,
        updateMisses,
        updateBulletsLeft,
    };
    const message: MessageView = {
        show: showMessage,
        hide: hideMessage,
    };
    const layers: GameLayers = {
        targets: new Container(),
        bullets: new Container(),
        crosshair: new Container(),
    };
    const game = new Game({
        width: 600,
        height: 400,
        layers,
        hud,
        message,
        randomInt: minimumRandom,
    });

    return {
        game,
        layers,
        updateHits,
        updateMisses,
        updateBulletsLeft,
        hideMessage,
    };
}

describe('Game', () => {
    it('publishes its initial HUD state', () => {
        const { game, updateHits, updateMisses, updateBulletsLeft } =
            createGame();

        game.start();

        expect(updateHits).toHaveBeenCalledWith(0);
        expect(updateMisses).toHaveBeenCalledWith(0);
        expect(updateBulletsLeft).toHaveBeenCalledWith(30);
    });

    it('counts a destroyed target as a hit', () => {
        const { game, updateHits } = createGame();

        game.tick(0);
        game.movePointer(8, 8);
        game.startFiring();
        game.tick(0);

        expect(game.getHitCount()).toBe(1);
        expect(game.getTargetCount()).toBe(0);
        expect(updateHits).toHaveBeenLastCalledWith(1);
    });

    it('counts an expired target as a miss', () => {
        const { game, updateMisses } = createGame();

        game.setTargetDuration(100);
        game.tick(0);
        game.tick(99);

        expect(game.getTargetCount()).toBe(1);
        expect(game.getMissCount()).toBe(0);

        game.tick(1);

        expect(game.getTargetCount()).toBe(0);
        expect(game.getMissCount()).toBe(1);
        expect(updateMisses).toHaveBeenLastCalledWith(1);
    });

    it('clears gameplay state when restarted', () => {
        const {
            game,
            layers,
            updateHits,
            updateMisses,
            updateBulletsLeft,
            hideMessage,
        } = createGame();

        game.tick(0);
        game.movePointer(8, 8);
        game.startFiring();
        game.tick(0);
        game.newTarget();

        expect(game.getHitCount()).toBe(1);
        expect(layers.targets.getAllChildren()).toHaveLength(1);
        expect(layers.bullets.getAllChildren()).toHaveLength(1);

        game.restart();

        expect(game.getHitCount()).toBe(0);
        expect(game.getMissCount()).toBe(0);
        expect(game.getTargetCount()).toBe(0);
        expect(layers.targets.getAllChildren()).toEqual([]);
        expect(layers.bullets.getAllChildren()).toEqual([]);
        expect(updateHits).toHaveBeenLastCalledWith(0);
        expect(updateMisses).toHaveBeenLastCalledWith(0);
        expect(updateBulletsLeft).toHaveBeenLastCalledWith(30);
        expect(hideMessage).toHaveBeenCalledOnce();
    });
});
