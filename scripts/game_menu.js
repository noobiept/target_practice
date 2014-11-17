var GameMenu;
(function (GameMenu) {
    var HITS = null;
    var MISSES = null;
    var BULLETS_LEFT = null;
    function init() {
        var container = document.querySelector('#GameMenu');
        // restart //
        var restart = container.querySelector('#Restart');
        restart.onclick = function () {
            Game.restart();
        };
        // target health //
        var targetHealth = container.querySelector('#TargetHealth');
        var targetInput = targetHealth.querySelector('input');
        var targetValue = targetHealth.querySelector('span');
        var healthValue = Game.getTargetHealth().toString();
        targetInput.value = healthValue;
        targetValue.innerHTML = healthValue;
        targetInput.onchange = function (event) {
            Game.setTargetHealth(parseInt(targetInput.value, 10));
        };
        targetInput.oninput = function (event) {
            targetValue.innerHTML = targetInput.value;
        };
        // target spawn interval //
        var spawnInterval = container.querySelector('#TargetSpawnInterval');
        var spawnInput = spawnInterval.querySelector('input');
        var spawnValue = spawnInterval.querySelector('span');
        var intervalValue = (Game.getTargetSpawnInterval() / 1000).toFixed(1);
        spawnInput.value = intervalValue;
        spawnValue.innerHTML = intervalValue + 's';
        spawnInput.onchange = function (event) {
            Game.setTargetSpawnInterval(parseInt(spawnInput.value, 10) * 1000);
        };
        spawnInput.oninput = function (event) {
            spawnValue.innerHTML = parseFloat(spawnInput.value).toFixed(1) + 's';
        };
        // target duration //
        var targetDuration = container.querySelector('#TargetDuration');
        var durationInput = targetDuration.querySelector('input');
        var durationValue = targetDuration.querySelector('span');
        var currentDurationValue = Game.getTargetDuration().toString();
        durationInput.value = currentDurationValue;
        durationValue.innerHTML = currentDurationValue;
        durationInput.onchange = function (event) {
            Game.setTargetDuration(parseInt(durationInput.value, 10));
        };
        durationInput.oninput = function (event) {
            durationValue.innerHTML = durationInput.value;
        };
        // reloading //
        var canReload = container.querySelector('#CanReload');
        canReload.checked = Game.getCanReload();
        canReload.onchange = function (event) {
            Game.setCanReload(canReload.checked);
        };
        // other //
        HITS = container.querySelector('#HitsValue');
        MISSES = container.querySelector('#MissesValue');
        BULLETS_LEFT = container.querySelector('#BulletsLeft');
    }
    GameMenu.init = init;
    function updateHits(count) {
        HITS.innerHTML = count;
    }
    GameMenu.updateHits = updateHits;
    function updateMisses(count) {
        MISSES.innerHTML = count;
    }
    GameMenu.updateMisses = updateMisses;
    function updateBulletsLeft(count) {
        BULLETS_LEFT.innerHTML = count;
    }
    GameMenu.updateBulletsLeft = updateBulletsLeft;
    function clear() {
        HITS.innerHTML = MISSES.innerHTML = '0';
    }
    GameMenu.clear = clear;
})(GameMenu || (GameMenu = {}));
