var GameMenu;
(function (GameMenu) {
    var HITS = null;
    var MISSES = null;
    var BULLETS_LEFT = null;
    function init() {
        var container = document.querySelector('#GameMenu');
        var restart = container.querySelector('#Restart');
        var hits = container.querySelector('#HitsValue');
        var misses = container.querySelector('#MissesValue');
        var bulletsLeft = container.querySelector('#BulletsLeft');
        restart.onclick = function () {
            Game.restart();
        };
        HITS = hits;
        MISSES = misses;
        BULLETS_LEFT = bulletsLeft;
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
