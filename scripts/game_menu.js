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
        targetValue.innerHTML = healthValue + 'hp';
        targetInput.onchange = function (event) {
            Game.setTargetHealth(parseInt(targetInput.value, 10));
            targetValue.innerHTML = targetInput.value + 'hp';
        };
        targetInput.oninput = function (event) {
            targetValue.innerHTML = targetInput.value + 'hp';
        };
        // target spawn interval //
        var spawnInterval = container.querySelector('#TargetSpawnInterval');
        var spawnInput = spawnInterval.querySelector('input');
        var spawnValue = spawnInterval.querySelector('span');
        var intervalValue = (Game.getTargetSpawnInterval() / 1000).toFixed(1);
        spawnInput.value = intervalValue;
        spawnValue.innerHTML = intervalValue + 's';
        spawnInput.onchange = function (event) {
            Game.setTargetSpawnInterval(parseFloat(spawnInput.value) * 1000);
            spawnValue.innerHTML = parseFloat(spawnInput.value).toFixed(1) + 's';
        };
        spawnInput.oninput = function (event) {
            spawnValue.innerHTML = parseFloat(spawnInput.value).toFixed(1) + 's';
        };
        // target duration //
        var targetDuration = container.querySelector('#TargetDuration');
        var durationInput = targetDuration.querySelector('input');
        var durationValue = targetDuration.querySelector('span');
        var currentDurationValue = (Target.getDuration() / 1000).toFixed(1);
        durationInput.value = currentDurationValue;
        durationValue.innerHTML = currentDurationValue + 's';
        durationInput.onchange = function (event) {
            Target.setDuration(parseFloat(durationInput.value) * 1000);
            durationValue.innerHTML = parseFloat(durationInput.value).toFixed(1) + 's';
            Game.restart();
        };
        durationInput.oninput = function (event) {
            durationValue.innerHTML = parseFloat(durationInput.value).toFixed(1) + 's';
        };
        // reloading //
        var canReload = container.querySelector('#CanReload');
        canReload.checked = true;
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
