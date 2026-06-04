import { addToGameLoop } from '@drk4/game-engine';
import { boxBoxCollision, getRandomInt } from '@drk4/utilities';
import { CrossHair } from './crosshair';
import { G } from './globals';
import * as GameMenu from './game_menu';
import * as Message from './message';
import { Target } from './target';
import { Weapon } from './weapon';

let CROSS_HAIR: CrossHair;
const TARGETS: Target[] = [];

export let MOUSE_HELD = false;

export let MOUSE_X = 0;
export let MOUSE_Y = 0;

let HITS_COUNT = 0;
let MISSES_COUNT = 0;

// game options
let TARGET_HEALTH = 1;
let TARGET_SPAWN_INTERVAL = 1500; // in milliseconds

let NEW_TARGET_COUNT = TARGET_SPAWN_INTERVAL; // so that it adds a target from the start

let CURRENT_WEAPON: Weapon;

export function init(): void {
    CROSS_HAIR = new CrossHair();
    CURRENT_WEAPON = new Weapon('machineGun');

    const canvas = G.CANVAS.getHtmlCanvasElement();

    canvas.addEventListener('mousemove', function (event) {
        const bounds = canvas.getBoundingClientRect();
        const x = event.clientX - bounds.left;
        const y = event.clientY - bounds.top;

        CROSS_HAIR.moveTo(x, y);

        MOUSE_X = x;
        MOUSE_Y = y;
    });

    document.body.addEventListener('mousedown', function () {
        MOUSE_HELD = true;
    });

    document.body.addEventListener('mouseup', function () {
        CURRENT_WEAPON.stopFiring();
        MOUSE_HELD = false;
    });

    addToGameLoop(function (deltaTime) {
        tick(deltaTime * 1000);
    });
}

export function start(): void {
    GameMenu.updateHits(HITS_COUNT);
    GameMenu.updateMisses(MISSES_COUNT);
}

export function clear(): void {
    for (const target of TARGETS) {
        target.clear();
    }

    TARGETS.length = 0;

    NEW_TARGET_COUNT = TARGET_SPAWN_INTERVAL;

    HITS_COUNT = 0;
    MISSES_COUNT = 0;

    CURRENT_WEAPON.reset();
    Message.hide();
}

export function restart(): void {
    clear();
    start();
}

function tick(deltaMs: number): void {
    // targets
    NEW_TARGET_COUNT += deltaMs;

    if (NEW_TARGET_COUNT >= TARGET_SPAWN_INTERVAL) {
        NEW_TARGET_COUNT = 0;

        newTarget();
    }

    // weapons
    CURRENT_WEAPON.tick(deltaMs);

    // check if there are targets that timed out (and thus need to be removed)
    for (let index = TARGETS.length - 1; index >= 0; index--) {
        const target = TARGETS[index];

        if (target?.tick(deltaMs)) {
            oneMoreMiss();

            removeTarget(target);
        }
    }
}

export function newTarget(): void {
    const x = getRandomInt(0, G.CANVAS.width - Target.side_length);
    const y = getRandomInt(0, G.CANVAS.height - Target.side_length);

    TARGETS.push(new Target(x, y, TARGET_HEALTH));
}

export function removeTarget(target: Target): void {
    const position = TARGETS.indexOf(target);

    TARGETS.splice(position, 1);

    target.clear();
}

export function oneMoreHit(): void {
    HITS_COUNT++;

    GameMenu.updateHits(HITS_COUNT);
}

export function oneMoreMiss(): void {
    MISSES_COUNT++;

    GameMenu.updateMisses(MISSES_COUNT);
}

export function checkCollision(
    bulletX: number,
    bulletY: number,
    bulletLength: number,
): void {
    const targetLength = Target.side_length;

    for (let index = TARGETS.length - 1; index >= 0; index--) {
        const target = TARGETS[index];

        if (!target) {
            continue;
        }

        if (
            boxBoxCollision(
                bulletX,
                bulletY,
                bulletLength,
                bulletLength,
                target.getX(),
                target.getY(),
                targetLength,
                targetLength,
            )
        ) {
            if (target.tookDamage(CURRENT_WEAPON.getDamageValue())) {
                oneMoreHit();

                removeTarget(target);
            }

            break;
        }
    }
}

export function setTargetHealth(health: number): void {
    TARGET_HEALTH = health;

    restart();
}

export function getTargetHealth(): number {
    return TARGET_HEALTH;
}

export function setTargetSpawnInterval(interval: number): void {
    TARGET_SPAWN_INTERVAL = interval;

    restart();
}

export function getTargetSpawnInterval(): number {
    return TARGET_SPAWN_INTERVAL;
}

export function setCanReload(value: boolean): void {
    CURRENT_WEAPON.setCanReload(value);

    restart();
}
