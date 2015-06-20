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
    targetValue.innerHTML = healthValue + 'hp';

    targetInput.onchange = function( event )
        {
        Game.setTargetHealth( parseInt( targetInput.value, 10 ) );
        targetValue.innerHTML = targetInput.value + 'hp';
        };
    targetInput.oninput = function( event )
        {
        targetValue.innerHTML = targetInput.value + 'hp';
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
        Game.setTargetSpawnInterval( parseFloat( spawnInput.value ) * 1000 );
        spawnValue.innerHTML = parseFloat( spawnInput.value ).toFixed( 1 ) + 's';
        };
    spawnInput.oninput = function( event )
        {
        spawnValue.innerHTML = parseFloat( spawnInput.value ).toFixed( 1 ) + 's';
        };


        // target duration //

    var targetDuration = <HTMLElement> container.querySelector( '#TargetDuration' );
    var durationInput = <HTMLInputElement> targetDuration.querySelector( 'input' );
    var durationValue = <HTMLSpanElement> targetDuration.querySelector( 'span' );

    var currentDurationValue = ( Target.getDuration() / 1000 ).toFixed( 1 );

    durationInput.value = currentDurationValue;
    durationValue.innerHTML = currentDurationValue + 's';

    durationInput.onchange = function( event )
        {
        Target.setDuration( parseFloat( durationInput.value ) * 1000 );
        durationValue.innerHTML = parseFloat( durationInput.value ).toFixed( 1 ) + 's';

        Game.restart();
        };
    durationInput.oninput = function( event )
        {
        durationValue.innerHTML = parseFloat( durationInput.value ).toFixed( 1 ) + 's';
        };

        // reloading //

    var canReload = <HTMLInputElement> container.querySelector( '#CanReload' );

    canReload.checked = true;
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