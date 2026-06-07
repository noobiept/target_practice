import { type Container } from '@drk4/game-engine';
import { getRandomInt } from '@drk4/utilities';
import { Bullet } from './bullet';
import type { MessageView, RandomInt } from './game_contracts';

interface RecoilInfo {
    readonly bullet: number;
    readonly xOffset: number;
    readonly yOffset: number;
}

interface WeaponInfo {
    readonly damage: number;
    readonly magazineCapacity: number;
    readonly reloadDuration: number;
    readonly bulletInterval: number;
    readonly recoilRecoveryInterval: number;
    readonly variance: number;
    readonly recoil: readonly RecoilInfo[];
}

interface WeaponInput {
    held: boolean;
    x: number;
    y: number;
}

const WEAPON_INFO = {
    machineGun: {
        damage: 1,
        magazineCapacity: 30,
        reloadDuration: 2000,
        bulletInterval: 200,
        recoilRecoveryInterval: 400,
        variance: 3,
        recoil: [
            {
                bullet: 3,
                xOffset: 0,
                yOffset: -15,
            },
            {
                bullet: 6,
                xOffset: 0,
                yOffset: -30,
            },
            {
                bullet: 9,
                xOffset: 5,
                yOffset: -35,
            },
            {
                bullet: 12,
                xOffset: -5,
                yOffset: -40,
            },
            {
                bullet: 15,
                xOffset: 0,
                yOffset: -45,
            },
        ],
    },
} as const satisfies Record<string, WeaponInfo>;

type WeaponType = keyof typeof WEAPON_INFO;

interface WeaponArgs {
    type: WeaponType;
    bulletContainer: Container;
    message: MessageView;
    onCollision: (x: number, y: number, bulletLength: number) => void;
    onBulletsChanged: (count: number) => void;
    randomInt?: RandomInt;
}

export class Weapon {
    private readonly info: WeaponInfo;
    private readonly bullets: Bullet[] = [];
    private readonly bulletContainer: Container;
    private readonly message: MessageView;
    private readonly onCollision: WeaponArgs['onCollision'];
    private readonly onBulletsChanged: WeaponArgs['onBulletsChanged'];
    private readonly randomInt: RandomInt;

    private reloadCount = 0;
    private bulletIntervalCount: number;
    private recoilRecoveryCount = 0;
    private isReloading = false;
    private bulletsFired = 0;
    private bulletsInMagazine: number;
    private canReload = true;

    constructor({
        type,
        bulletContainer,
        message,
        onCollision,
        onBulletsChanged,
        randomInt = getRandomInt,
    }: WeaponArgs) {
        this.info = WEAPON_INFO[type];
        this.bulletContainer = bulletContainer;
        this.message = message;
        this.onCollision = onCollision;
        this.onBulletsChanged = onBulletsChanged;
        this.randomInt = randomInt;
        this.bulletIntervalCount = this.info.bulletInterval;
        this.bulletsInMagazine = this.info.magazineCapacity;

        this.onBulletsChanged(this.bulletsInMagazine);
    }

    tick(deltaMs: number, input: WeaponInput): void {
        this.bulletIntervalCount += deltaMs;

        if (input.held && !this.isReloading) {
            this.recoilRecoveryCount = 0;

            if (this.bulletIntervalCount >= this.info.bulletInterval) {
                this.bulletIntervalCount = 0;
                this.bulletsFired++;

                this.fireBullet(input.x, input.y);
            }
        } else if (this.bulletsFired > 0) {
            this.recoilRecoveryCount += deltaMs;

            while (
                this.bulletsFired > 0 &&
                this.recoilRecoveryCount >= this.info.recoilRecoveryInterval
            ) {
                this.recoilRecoveryCount -= this.info.recoilRecoveryInterval;
                this.bulletsFired--;
            }
        }

        for (let index = this.bullets.length - 1; index >= 0; index--) {
            const bullet = this.bullets[index];

            if (bullet?.tick(deltaMs)) {
                this.removeBullet(bullet);
            }
        }

        if (this.isReloading) {
            this.reloadCount += deltaMs;

            if (this.reloadCount >= this.info.reloadDuration) {
                this.reloadCount = 0;
                this.isReloading = false;
                this.bulletsFired = 0;
                this.bulletsInMagazine = this.info.magazineCapacity;

                this.message.hide();
                this.onBulletsChanged(this.bulletsInMagazine);
            }
        }
    }

    reset(): void {
        this.clear();

        this.reloadCount = 0;
        this.bulletIntervalCount = this.info.bulletInterval;
        this.recoilRecoveryCount = 0;
        this.isReloading = false;
        this.bulletsFired = 0;
        this.bulletsInMagazine = this.info.magazineCapacity;

        this.onBulletsChanged(this.bulletsInMagazine);
    }

    getDamageValue(): number {
        return this.info.damage;
    }

    setCanReload(value: boolean): void {
        this.canReload = value;
    }

    private fireBullet(pointerX: number, pointerY: number): void {
        const bulletLength = Bullet.side_length;
        const halfBulletLength = bulletLength / 2;
        const centerX = Math.round(pointerX - halfBulletLength);
        const centerY = Math.round(pointerY - halfBulletLength);

        let x = this.randomInt(
            centerX - this.info.variance,
            centerX + this.info.variance,
        );
        let y = this.randomInt(
            centerY - this.info.variance,
            centerY + this.info.variance,
        );

        let recoilInfo: RecoilInfo | null = null;

        for (const nextInfo of this.info.recoil) {
            if (this.bulletsFired < nextInfo.bullet) {
                break;
            }

            recoilInfo = nextInfo;
        }

        if (recoilInfo !== null) {
            x += recoilInfo.xOffset;
            y += recoilInfo.yOffset;
        }

        const bullet = new Bullet(this.bulletContainer, x, y);
        this.bullets.push(bullet);

        this.onCollision(x, y, bulletLength);

        if (this.canReload) {
            this.bulletsInMagazine--;
        }

        this.onBulletsChanged(this.bulletsInMagazine);

        if (this.bulletsInMagazine <= 0) {
            this.reload();
        }
    }

    private removeBullet(bullet: Bullet): void {
        const position = this.bullets.indexOf(bullet);

        if (position === -1) {
            return;
        }

        this.bullets.splice(position, 1);
        bullet.clear();
    }

    private reload(): void {
        this.isReloading = true;
        this.message.show('Reloading..');
    }

    private clear(): void {
        for (const bullet of this.bullets) {
            bullet.clear();
        }

        this.bullets.length = 0;
    }
}
