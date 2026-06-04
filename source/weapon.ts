import { getRandomInt } from '@drk4/utilities';
import { Bullet } from './bullet';
import * as Game from './game';
import * as GameMenu from './game_menu';
import * as Message from './message';

interface RecoilInfo {
    bullet: number;
    xOffset: number;
    yOffset: number;
}

interface WeaponInfo {
    damage: number;
    magazine_capacity: number;
    reload_duration: number;
    bullet_interval: number;
    variance: number;
    recoil: RecoilInfo[];
}

export class Weapon {
    static readonly info = {
        machineGun: {
            damage: 1,
            magazine_capacity: 30,
            reload_duration: 2000,
            bullet_interval: 200, // time between bullets (when spraying)
            variance: 3, // variance of the x/y position (around the cross-hair)
            recoil: [
                // need to be in ascending 'bullet' order
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
    } satisfies Record<string, WeaponInfo>;

    readonly info: WeaponInfo;
    readonly bullets: Bullet[];
    reload_count: number;
    bullet_interval_count: number;
    is_reloading: boolean;
    bullets_fired: number; // off the current spray
    bullets_in_magazine: number;
    can_reload: boolean; // if we use bullets or not (just keep firing without ever need to reload)

    constructor(type: keyof typeof Weapon.info) {
        this.info = Weapon.info[type];
        this.bullets = [];
        this.reload_count = 0;
        this.bullet_interval_count = this.info.bullet_interval;
        this.is_reloading = false;
        this.bullets_fired = 0;
        this.bullets_in_magazine = this.info.magazine_capacity;
        this.can_reload = true;

        GameMenu.updateBulletsLeft(this.bullets_in_magazine);
    }

    fireBullet(): void {
        if (this.is_reloading) {
            return;
        }

        const weaponInfo = this.info;
        const variance = weaponInfo.variance;
        const recoil = weaponInfo.recoil;

        const bulletLength = Bullet.side_length;
        const halfBulletLength = bulletLength / 2;
        const centerX = Math.round(Game.MOUSE_X - halfBulletLength);
        const centerY = Math.round(Game.MOUSE_Y - halfBulletLength);

        let x = getRandomInt(centerX - variance, centerX + variance);
        let y = getRandomInt(centerY - variance, centerY + variance);

        // find the recoil info to be used for the current bullet (depends on the number of bullets fired in the current spray)
        let recoilInfo: RecoilInfo | null = null;

        for (const nextInfo of recoil) {
            if (this.bullets_fired < nextInfo.bullet) {
                break;
            }

            recoilInfo = nextInfo;
        }

        if (recoilInfo !== null) {
            x += recoilInfo.xOffset;
            y += recoilInfo.yOffset;
        }

        const bullet = new Bullet(x, y);
        this.bullets.push(bullet);

        // check if we hit any target
        Game.checkCollision(x, y, bulletLength);

        if (this.can_reload) {
            this.bullets_in_magazine--;
        }

        GameMenu.updateBulletsLeft(this.bullets_in_magazine);

        if (this.bullets_in_magazine <= 0) {
            this.reload();
        }
    }

    removeBullet(bullet: Bullet): void {
        const position = this.bullets.indexOf(bullet);

        this.bullets.splice(position, 1);

        bullet.clear();
    }

    reload(): void {
        this.is_reloading = true;

        Message.show('Reloading..');
    }

    /*
    Clears the shape elements associated (call this when you aren't using the object anymore, just to clear)
 */

    clear(): void {
        for (const bullet of this.bullets) {
            bullet.clear();
        }

        this.bullets.length = 0;
    }

    /*
    Resets the weapon, call this when you want to reuse the object.
 */

    reset(): void {
        this.clear();

        this.reload_count = 0;
        this.bullet_interval_count = this.info.bullet_interval;
        this.is_reloading = false;
        this.bullets_fired = 0;
        this.bullets_in_magazine = this.info.magazine_capacity;

        GameMenu.updateBulletsLeft(this.bullets_in_magazine);
    }

    stopFiring(): void {
        this.bullets_fired = 0;
    }

    getDamageValue(): number {
        return this.info.damage;
    }

    setCanReload(value: boolean): void {
        this.can_reload = value;
    }

    tick(deltaMs: number): void {
        this.bullet_interval_count += deltaMs;

        if (Game.MOUSE_HELD && !this.is_reloading) {
            if (this.bullet_interval_count >= this.info.bullet_interval) {
                this.bullet_interval_count = 0;
                this.bullets_fired++;

                this.fireBullet();
            }
        }

        // check if there are bullets that timed out (and thus need to be removed)
        const bullets = this.bullets;

        for (let index = bullets.length - 1; index >= 0; index--) {
            const bullet = bullets[index];

            if (bullet?.tick(deltaMs)) {
                this.removeBullet(bullet);
            }
        }

        // deal with the reloading of the weapon (if its currently going)
        if (this.is_reloading) {
            this.reload_count += deltaMs;

            // reload finished
            if (this.reload_count >= this.info.reload_duration) {
                this.reload_count = 0;
                this.is_reloading = false;
                this.bullets_in_magazine = this.info.magazine_capacity;

                Message.hide();
                GameMenu.updateBulletsLeft(this.bullets_in_magazine);
            }
        }
    }
}
