var Game;
(function (Game) {
    var CROSS_HAIR = null;
    var TARGETS = [];
    var BULLETS = [];

    var NEW_TARGET_INTERVAL = 1500;
    var NEW_TARGET_COUNT = 0;

    var MOUSE_HELD = false;
    var BULLET_INTERVAL = 200;
    var BULLET_COUNT = BULLET_INTERVAL;

    var BULLETS_FIRED = 0;

    var MOUSE_X = 0;
    var MOUSE_Y = 0;

    function start() {
        G.STAGE.on('stagemousemove', function (event) {
            CROSS_HAIR.moveTo(event.stageX, event.stageY);

            MOUSE_X = event.stageX;
            MOUSE_Y = event.stageY;
        });

        CROSS_HAIR = new CrossHair();

        G.CANVAS.addEventListener('mousedown', function (event) {
            MOUSE_HELD = true;
        });

        G.CANVAS.addEventListener('mouseup', function (event) {
            BULLETS_FIRED = 0;
            BULLET_COUNT = BULLET_INTERVAL;
            MOUSE_HELD = false;
        });

        createjs.Ticker.on('tick', tick);
    }
    Game.start = start;

    function tick(event) {
        // targets
        NEW_TARGET_COUNT += event.delta;

        if (NEW_TARGET_COUNT >= NEW_TARGET_INTERVAL) {
            NEW_TARGET_COUNT = 0;

            Game.newTarget();
        }

        // bullets
        BULLET_COUNT += event.delta;

        if (MOUSE_HELD && BULLET_COUNT >= BULLET_INTERVAL) {
            BULLET_COUNT = 0;
            BULLETS_FIRED++;

            Game.newBullet();
        }

        for (var a = BULLETS.length - 1; a >= 0; a--) {
            if (BULLETS[a].tick(event)) {
                Game.removeBullet(BULLETS[a]);
            }
        }
    }

    function newTarget() {
        var x = Utilities.getRandomInt(0, G.CANVAS.width);
        var y = Utilities.getRandomInt(0, G.CANVAS.height);

        TARGETS.push(new Target(x, y));
    }
    Game.newTarget = newTarget;

    function removeTarget(target) {
        var position = TARGETS.indexOf(target);

        TARGETS.splice(position, 1);

        target.clear();
    }
    Game.removeTarget = removeTarget;

    function newBullet() {
        var currentWeapon = Weapon.machineGun;
        var variance = currentWeapon.variance;
        var recoil = currentWeapon.recoil;

        var x = Utilities.getRandomInt(MOUSE_X - variance, MOUSE_X + variance);
        var y = Utilities.getRandomInt(MOUSE_Y - variance, MOUSE_Y + variance);

        // find the recoil info to be used for the current bullet (depends on the number of bullets fired in the current spray)
        var recoilInfo = null;
        var nextInfo = null;

        for (var a = 0; a < recoil.length; a++) {
            nextInfo = recoil[a];

            if (BULLETS_FIRED < nextInfo.bullet) {
                break;
            }

            recoilInfo = nextInfo;
        }

        if (recoilInfo !== null) {
            x += recoilInfo.xOffset;
            y += recoilInfo.yOffset;
        }

        var bullet = new Bullet(x, y);
        BULLETS.push(bullet);

        var bulletX = bullet.getX();
        var bulletY = bullet.getY();
        var bulletLength = bullet.length;

        for (var a = TARGETS.length - 1; a >= 0; a--) {
            var target = TARGETS[a];

            if (Utilities.boxBoxCollision(bulletX, bulletY, bulletLength, bulletLength, target.getX(), target.getY(), target.length, target.length)) {
                Game.removeTarget(target);
                break;
            }
        }
    }
    Game.newBullet = newBullet;

    function removeBullet(bullet) {
        var position = BULLETS.indexOf(bullet);

        BULLETS.splice(position, 1);

        bullet.clear();
    }
    Game.removeBullet = removeBullet;
})(Game || (Game = {}));
