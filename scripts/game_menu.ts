module GameMenu
{
var HITS: HTMLElement = null;
var MISSES: HTMLElement = null;
var BULLETS_LEFT: HTMLElement = null;

export function init()
    {
    var container = document.querySelector( '#GameMenu' );

        // restart //
    var restart = <HTMLElement> container.querySelector( '#Restart' );

    restart.onclick = function()
        {
        Game.restart();
        };

        // target health //
    var targetHealth = <HTMLElement> container.querySelector( '#TargetHealth' );
    var targetInput = <HTMLInputElement> targetHealth.querySelector( 'input' );
    var targetValue = <HTMLSpanElement> targetHealth.querySelector( 'span' );

    var healthValue = Game.getTargetHealth();

    targetInput.value = healthValue.toString();
    targetValue.innerHTML = healthValue.toString();

    targetInput.onchange = function( event )
        {
        Game.setTargetHealth( parseInt( targetInput.value, 10 ) )
        };
    targetInput.oninput = function( event )
        {
        targetValue.innerHTML = targetInput.value;
        };


    HITS = <HTMLElement> container.querySelector( '#HitsValue' );
    MISSES = <HTMLElement> container.querySelector( '#MissesValue' );
    BULLETS_LEFT = <HTMLElement> container.querySelector( '#BulletsLeft' );
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