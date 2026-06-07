import { type Container } from '@drk4/game-engine';
import { boxBoxCollision, getRandomInt } from '@drk4/utilities';
import { CrossHair } from './crosshair';
import type {
    GameController,
    GameHud,
    MessageView,
    RandomInt,
} from './game_contracts';
import { Target } from './target';
import { Weapon } from './weapon';

export interface GameLayers {
    targets: Container;
    bullets: Container;
    crosshair: Container;
}

export interface GameArgs {
    width: number;
    height: number;
    layers: GameLayers;
    hud: GameHud;
    message: MessageView;
    randomInt?: RandomInt;
}

export class Game implements GameController {
    private readonly width: number;
    private readonly height: number;
    private readonly targetContainer: Container;
    private readonly hud: GameHud;
    private readonly message: MessageView;
    private readonly randomInt: RandomInt;

    private readonly targets: Target[] = [];
    private readonly crosshair: CrossHair;
    private readonly weapon: Weapon;

    private pointerHeld = false;
    private pointerX = 0;
    private pointerY = 0;
    private hitsCount = 0;
    private missesCount = 0;
    private targetHealth = 1;
    private targetSpawnInterval = 1500;
    private targetDuration = 3000;
    private newTargetCount = this.targetSpawnInterval;

    constructor({
        width,
        height,
        layers,
        hud,
        message,
        randomInt = getRandomInt,
    }: GameArgs) {
        this.width = width;
        this.height = height;
        this.targetContainer = layers.targets;
        this.hud = hud;
        this.message = message;
        this.randomInt = randomInt;

        this.crosshair = new CrossHair(layers.crosshair);
        this.weapon = new Weapon({
            type: 'machineGun',
            bulletContainer: layers.bullets,
            message: this.message,
            randomInt,
            onCollision: (x, y, bulletLength) => {
                this.checkCollision(x, y, bulletLength);
            },
            onBulletsChanged: (count) => {
                this.hud.updateBulletsLeft(count);
            },
        });
    }

    start(): void {
        this.hud.updateHits(this.hitsCount);
        this.hud.updateMisses(this.missesCount);
    }

    tick(deltaMs: number): void {
        this.newTargetCount += deltaMs;

        if (this.newTargetCount >= this.targetSpawnInterval) {
            this.newTargetCount = 0;
            this.newTarget();
        }

        this.weapon.tick(deltaMs, {
            held: this.pointerHeld,
            x: this.pointerX,
            y: this.pointerY,
        });

        for (let index = this.targets.length - 1; index >= 0; index--) {
            const target = this.targets[index];

            if (target?.tick(deltaMs)) {
                this.oneMoreMiss();
                this.removeTarget(target);
            }
        }
    }

    movePointer(x: number, y: number): void {
        this.crosshair.moveTo(x, y);
        this.pointerX = x;
        this.pointerY = y;
    }

    startFiring(): void {
        this.pointerHeld = true;
    }

    stopFiring(): void {
        this.pointerHeld = false;
    }

    restart(): void {
        this.clear();
        this.start();
    }

    newTarget(): void {
        const x = this.randomInt(0, this.width - Target.side_length);
        const y = this.randomInt(0, this.height - Target.side_length);

        this.targets.push(
            new Target(
                this.targetContainer,
                x,
                y,
                this.targetHealth,
                this.targetDuration,
            ),
        );
    }

    getTargetHealth(): number {
        return this.targetHealth;
    }

    setTargetHealth(health: number): void {
        this.targetHealth = health;
        this.restart();
    }

    getTargetSpawnInterval(): number {
        return this.targetSpawnInterval;
    }

    setTargetSpawnInterval(interval: number): void {
        this.targetSpawnInterval = interval;
        this.restart();
    }

    getTargetDuration(): number {
        return this.targetDuration;
    }

    setTargetDuration(duration: number): void {
        this.targetDuration = duration;
        this.restart();
    }

    setCanReload(value: boolean): void {
        this.weapon.setCanReload(value);
        this.restart();
    }

    setHasRecoil(value: boolean): void {
        this.weapon.setHasRecoil(value);
        this.restart();
    }

    getHitCount(): number {
        return this.hitsCount;
    }

    getMissCount(): number {
        return this.missesCount;
    }

    getTargetCount(): number {
        return this.targets.length;
    }

    private clear(): void {
        for (const target of this.targets) {
            target.clear();
        }

        this.targets.length = 0;
        this.newTargetCount = this.targetSpawnInterval;
        this.hitsCount = 0;
        this.missesCount = 0;

        this.weapon.reset();
        this.message.hide();
    }

    private removeTarget(target: Target): void {
        const position = this.targets.indexOf(target);

        if (position === -1) {
            return;
        }

        this.targets.splice(position, 1);
        target.clear();
    }

    private oneMoreHit(): void {
        this.hitsCount++;
        this.hud.updateHits(this.hitsCount);
    }

    private oneMoreMiss(): void {
        this.missesCount++;
        this.hud.updateMisses(this.missesCount);
    }

    private checkCollision(
        bulletX: number,
        bulletY: number,
        bulletLength: number,
    ): void {
        const targetLength = Target.side_length;

        for (let index = this.targets.length - 1; index >= 0; index--) {
            const target = this.targets[index];

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
                if (target.tookDamage(this.weapon.getDamageValue())) {
                    this.oneMoreHit();
                    this.removeTarget(target);
                }

                break;
            }
        }
    }
}
