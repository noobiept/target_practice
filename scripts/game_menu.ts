module GameMenu
{
var HITS: HTMLElement = null;
var MISSES: HTMLElement = null;

export function init()
    {
    var container = document.querySelector( '#GameMenu' );

    var restart = <HTMLElement> container.querySelector( '#Restart' );
    var hits = <HTMLElement> container.querySelector( '#HitsValue' );
    var misses = <HTMLElement> container.querySelector( '#MissesValue' );

    restart.onclick = function()
        {
        Game.restart();
        };

    HITS = hits;
    MISSES = misses;
    }

export function updateHits( count )
    {
    HITS.innerHTML = count;
    }

export function updateMisses( count )
    {
    MISSES.innerHTML = count;
    }

export function clear()
    {
    HITS.innerHTML = MISSES.innerHTML = '0';
    }
}