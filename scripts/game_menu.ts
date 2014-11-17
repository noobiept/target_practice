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

    var healthValue = Game.getTargetHealth().toString();

    targetInput.value = healthValue;
    targetValue.innerHTML = healthValue;

    targetInput.onchange = function( event )
        {
        Game.setTargetHealth( parseInt( targetInput.value, 10 ) )
        };
    targetInput.oninput = function( event )
        {
        targetValue.innerHTML = targetInput.value;
        };


        // target spawn interval //

    var spawnInterval = <HTMLElement> container.querySelector( '#TargetSpawnInterval' );
    var spawnInput = <HTMLInputElement> spawnInterval.querySelector( 'input' );
    var spawnValue = <HTMLSpanElement> spawnInterval.querySelector( 'span' );

    var intervalValue = ( Game.getTargetSpawnInterval() / 1000 ).toFixed( 1 );

    spawnInput.value = intervalValue;
    spawnValue.innerHTML = intervalValue + 's';

    spawnInput.onchange = function( event )
        {
        Game.setTargetSpawnInterval( parseInt( spawnInput.value, 10 ) * 1000 );
        };
    spawnInput.oninput = function( event )
        {
        spawnValue.innerHTML = parseFloat( spawnInput.value ).toFixed( 1 ) + 's';
        };


        // target duration //

    var targetDuration = <HTMLElement> container.querySelector( '#TargetDuration' );
    var durationInput = <HTMLInputElement> targetDuration.querySelector( 'input' );
    var durationValue = <HTMLSpanElement> targetDuration.querySelector( 'span' );

    var currentDurationValue = Game.getTargetDuration().toString();

    durationInput.value = currentDurationValue;
    durationValue.innerHTML = currentDurationValue;

    durationInput.onchange = function( event )
        {
        Game.setTargetDuration( parseInt( durationInput.value, 10 ) );
        };
    durationInput.oninput = function( event )
        {
        durationValue.innerHTML = durationInput.value;
        };

        // reloading //

    var canReload = <HTMLInputElement> container.querySelector( '#CanReload' );

    canReload.checked = Game.getCanReload();
    canReload.onchange = function( event )
        {
        Game.setCanReload( canReload.checked );
        };


        // other //

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