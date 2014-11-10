var Game;
(function (Game) {
    var CROSS_HAIR = null;
    var TARGETS = [];

    var NEW_TARGET_INTERVAL = 2000;
    var NEW_TARGET_COUNT = 0;

    function init() {
        G.STAGE.on('stagemousemove', function (event) {
            CROSS_HAIR.moveTo(event.stageX, event.stageY);
        });

        CROSS_HAIR = new CrossHair();

        CROSS_HAIR.moveTo(200, 200);

        createjs.Ticker.on('tick', tick);
    }
    Game.init = init;

    function tick(event) {
        NEW_TARGET_COUNT += event.delta;

        if (NEW_TARGET_COUNT >= NEW_TARGET_INTERVAL) {
            NEW_TARGET_COUNT = 0;

            Game.newTarget();
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
})(Game || (Game = {}));
