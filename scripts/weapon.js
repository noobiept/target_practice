var Weapon = (function () {
    function Weapon(type) {
        this.info = Weapon.info[type];
        this.bullets = [];
        this.reload_count = 0;
        this.bullet_interval_count = this.info.bullet_interval;
        this.is_reloading = false;
        this.bullets_fired = 0;
        this.bullets_in_magazine = this.info.magazine_capacity;
        GameMenu.updateBulletsLeft(this.bullets_in_magazine);
    }
    Weapon.prototype.fireBullet = function () {
        if (this.is_reloading) {
            return;
        }
        var weaponInfo = this.info;
        var variance = weaponInfo.variance;
        var recoil = weaponInfo.recoil;
        var bulletLength = Bullet.side_length;
        var targetLength = Target.side_length;
        var halfBulletLength = bulletLength / 2;
        var centerX = Game.MOUSE_X - halfBulletLength;
        var centerY = Game.MOUSE_Y - halfBulletLength;
        var x = Utilities.getRandomInt(centerX - variance, centerX + variance);
        var y = Utilities.getRandomInt(centerY - variance, centerY + variance);
        // find the recoil info to be used for the current bullet (depends on the number of bullets fired in the current spray)
        var recoilInfo = null;
        var nextInfo = null;
        for (var a = 0; a < recoil.length; a++) {
            nextInfo = recoil[a];
            if (this.bullets_fired < nextInfo.bullet) {
                break;
            }
            recoilInfo = nextInfo;
        }
        if (recoilInfo !== null) {
            x += recoilInfo.xOffset;
            y += recoilInfo.yOffset;
        }
        var bullet = new Bullet(x, y);
        this.bullets.push(bullet);
        for (var a = Game.TARGETS.length - 1; a >= 0; a--) {
            var target = Game.TARGETS[a];
            if (Utilities.boxBoxCollision(x, y, bulletLength, bulletLength, target.getX(), target.getY(), targetLength, targetLength)) {
                Game.oneMoreHit();
                Game.removeTarget(target);
                break;
            }
        }
        this.bullets_in_magazine--;
        GameMenu.updateBulletsLeft(this.bullets_in_magazine);
        if (this.bullets_in_magazine <= 0) {
            this.reload();
        }
    };
    Weapon.prototype.removeBullet = function (bullet) {
        var position = this.bullets.indexOf(bullet);
        this.bullets.splice(position, 1);
        bullet.clear();
    };
    Weapon.prototype.reload = function () {
        this.is_reloading = true;
        console.log('Reloading..');
    };
    Weapon.prototype.clear = function () {
        var bullets = this.bullets;
        for (var a = 0; a < bullets.length; a++) {
            bullets[a].clear();
        }
        bullets.length = 0;
    };
    Weapon.prototype.stopFiring = function () {
        this.bullets_fired = 0;
    };
    Weapon.prototype.tick = function (event) {
        this.bullet_interval_count += event.delta;
        if (Game.MOUSE_HELD && !this.is_reloading) {
            if (this.bullet_interval_count >= this.info.bullet_interval) {
                this.bullet_interval_count = 0;
                this.bullets_fired++;
                this.fireBullet();
            }
        }
        // check if there are bullets that timed out (and thus need to be removed)
        var bullets = this.bullets;
        for (var a = bullets.length - 1; a >= 0; a--) {
            if (bullets[a].tick(event)) {
                this.removeBullet(bullets[a]);
            }
        }
        // deal with the reloading of the weapon (if its currently going)
        if (this.is_reloading) {
            this.reload_count += event.delta;
            if (this.reload_count >= this.info.reload_duration) {
                this.reload_count = 0;
                this.is_reloading = false;
                this.bullets_in_magazine = this.info.magazine_capacity;
                GameMenu.updateBulletsLeft(this.bullets_in_magazine);
            }
        }
    };
    Weapon.info = {
        machineGun: {
            magazine_capacity: 30,
            reload_duration: 2000,
            bullet_interval: 200,
            variance: 3,
            recoil: [
                {
                    bullet: 3,
                    xOffset: 0,
                    yOffset: -15
                },
                {
                    bullet: 6,
                    xOffset: 0,
                    yOffset: -30
                },
                {
                    bullet: 9,
                    xOffset: 5,
                    yOffset: -35
                },
                {
                    bullet: 12,
                    xOffset: -5,
                    yOffset: -40
                },
                {
                    bullet: 15,
                    xOffset: 0,
                    yOffset: -45
                }
            ]
        }
    };
    return Weapon;
})();
