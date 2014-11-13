module GameMenu
{
var HITS: HTMLElement = null;
var MISSES: HTMLElement = null;
var BULLETS_LEFT: HTMLElement = null;

export function init()
    {
    var container = document.querySelector( '#GameMenu' );

    var restart = <HTMLElement> container.querySelector( '#Restart' );
    var hits = <HTMLElement> container.querySelector( '#HitsValue' );
    var misses = <HTMLElement> container.querySelector( '#MissesValue' );
    var bulletsLeft = <HTMLElement> container.querySelector( '#BulletsLeft' );

    restart.onclick = function()
        {
        Game.restart();
        };

    HITS = hits;
    MISSES = misses;
    BULLETS_LEFT = bulletsLeft;
    }

export function updateHits( count )
    {
    HITS.innerHTML = count;
    }

export function updateMisses( count )
    {
    MISSES.innerHTML = count;
    }

export function updateBulletsLeft( count )
    {
    BULLETS_LEFT.innerHTML = count;
    }

export function clear()
    {
    HITS.innerHTML = MISSES.innerHTML = '0';
    }
}