var Game;
(function (Game) {
    var CROSS_HAIR = null;
    var TARGETS = [];
    var NEW_TARGET_INTERVAL = 1500;
    var NEW_TARGET_COUNT = 0;
    Game.MOUSE_HELD = false;
    Game.MOUSE_X = 0;
    Game.MOUSE_Y = 0;
    var HITS_COUNT = 0;
    var MISSES_COUNT = 0;
    var CURRENT_WEAPON = null;
    function init() {
        CROSS_HAIR = new CrossHair();
        CURRENT_WEAPON = new Weapon('machineGun');
        G.STAGE.on('stagemousemove', function (event) {
            CROSS_HAIR.moveTo(event.stageX, event.stageY);
            Game.MOUSE_X = event.stageX;
            Game.MOUSE_Y = event.stageY;
        });
        document.body.addEventListener('mousedown', function (event) {
            Game.MOUSE_HELD = true;
        });
        document.body.addEventListener('mouseup', function (event) {
            CURRENT_WEAPON.stopFiring();
            Game.MOUSE_HELD = false;
        });
        createjs.Ticker.on('tick', tick);
    }
    Game.init = init;
    function start() {
        GameMenu.updateHits(HITS_COUNT);
        GameMenu.updateMisses(MISSES_COUNT);
    }
    Game.start = start;
    function clear() {
        var a;
        for (a = 0; a < TARGETS.length; a++) {
            TARGETS[a].clear();
        }
        TARGETS.length = 0;
        NEW_TARGET_COUNT = 0;
        HITS_COUNT = 0;
        MISSES_COUNT = 0;
    }
    Game.clear = clear;
    function restart() {
        Game.clear();
        CURRENT_WEAPON.reset();
        Game.start();
    }
    Game.restart = restart;
    function tick(event) {
        // targets
        NEW_TARGET_COUNT += event.delta;
        if (NEW_TARGET_COUNT >= NEW_TARGET_INTERVAL) {
            NEW_TARGET_COUNT = 0;
            Game.newTarget();
        }
        // weapons
        CURRENT_WEAPON.tick(event);
        // check if there are targets that timed out (and thus need to be removed)
        var a;
        for (a = TARGETS.length - 1; a >= 0; a--) {
            if (TARGETS[a].tick(event)) {
                Game.oneMoreMiss();
                Game.removeTarget(TARGETS[a]);
            }
        }
    }
    function newTarget() {
        var x = Utilities.getRandomInt(0, G.CANVAS.width - Target.side_length);
        var y = Utilities.getRandomInt(0, G.CANVAS.height - Target.side_length);
        TARGETS.push(new Target(x, y, 2));
    }
    Game.newTarget = newTarget;
    function removeTarget(target) {
        var position = TARGETS.indexOf(target);
        TARGETS.splice(position, 1);
        target.clear();
    }
    Game.removeTarget = removeTarget;
    function oneMoreHit() {
        HITS_COUNT++;
        GameMenu.updateHits(HITS_COUNT);
    }
    Game.oneMoreHit = oneMoreHit;
    function oneMoreMiss() {
        MISSES_COUNT++;
        GameMenu.updateMisses(MISSES_COUNT);
    }
    Game.oneMoreMiss = oneMoreMiss;
    function checkCollision(bulletX, bulletY, bulletLength) {
        var targetLength = Target.side_length;
        for (var a = TARGETS.length - 1; a >= 0; a--) {
            var target = TARGETS[a];
            if (Utilities.boxBoxCollision(bulletX, bulletY, bulletLength, bulletLength, target.getX(), target.getY(), targetLength, targetLength)) {
                if (target.tookDamage(CURRENT_WEAPON.getDamageValue())) {
                    Game.oneMoreHit();
                    Game.removeTarget(target);
                }
                break;
            }
        }
    }
    Game.checkCollision = checkCollision;
})(Game || (Game = {}));
