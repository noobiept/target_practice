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
        var healthValue = Game.getTargetHealth();
        targetInput.value = healthValue.toString();
        targetValue.innerHTML = healthValue.toString();
        targetInput.onchange = function (event) {
            Game.setTargetHealth(parseInt(targetInput.value, 10));
        };
        targetInput.oninput = function (event) {
            targetValue.innerHTML = targetInput.value;
        };
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
