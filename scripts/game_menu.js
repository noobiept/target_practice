var GameMenu;
(function (GameMenu) {
    var HITS = null;
    var MISSES = null;
    function init() {
        var container = document.querySelector('#GameMenu');
        var restart = container.querySelector('#Restart');
        var hits = container.querySelector('#HitsValue');
        var misses = container.querySelector('#MissesValue');
        restart.onclick = function () {
            Game.restart();
        };
        HITS = hits;
        MISSES = misses;
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
    function clear() {
        HITS.innerHTML = MISSES.innerHTML = '0';
    }
    GameMenu.clear = clear;
})(GameMenu || (GameMenu = {}));
