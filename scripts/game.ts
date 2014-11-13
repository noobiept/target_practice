module Game
{
var CROSS_HAIR = null;
export var TARGETS = [];    //HERE

var NEW_TARGET_INTERVAL = 1500;
var NEW_TARGET_COUNT = 0;

export var MOUSE_HELD = false;

export var MOUSE_X = 0;
export var MOUSE_Y = 0;

var HITS_COUNT = 0;
var MISSES_COUNT = 0;

var CURRENT_WEAPON: Weapon = null;

export function init()
    {
    CROSS_HAIR = new CrossHair();
    CURRENT_WEAPON = new Weapon( 'machineGun' );

    G.STAGE.on( 'stagemousemove', function( event )
        {
        CROSS_HAIR.moveTo( event.stageX, event.stageY );

        MOUSE_X = event.stageX;
        MOUSE_Y = event.stageY;
        });

    document.body.addEventListener( 'mousedown', function( event )
        {
        MOUSE_HELD = true;
        });

    document.body.addEventListener( 'mouseup', function( event )
        {
        CURRENT_WEAPON.stopFiring();
        MOUSE_HELD = false;
        });

    createjs.Ticker.on( 'tick', tick );
    }

export function start()
    {
    GameMenu.updateHits( HITS_COUNT );
    GameMenu.updateMisses( MISSES_COUNT );
    }


export function clear()
    {
    var a;

    for (a = 0 ; a < TARGETS.length ; a++)
        {
        TARGETS[ a ].clear();
        }

    TARGETS.length = 0;

    NEW_TARGET_COUNT = 0;

    HITS_COUNT = 0;
    MISSES_COUNT = 0;
    }

export function restart()
    {
    Game.clear();
    Game.start();
    }

function tick( event )
    {
        // targets
    NEW_TARGET_COUNT += event.delta;

    if ( NEW_TARGET_COUNT >= NEW_TARGET_INTERVAL )
        {
        NEW_TARGET_COUNT = 0;

        Game.newTarget();
        }

        // weapons
    CURRENT_WEAPON.tick( event );

        // check if there are targets that timed out (and thus need to be removed)
    var a;

    for (a = TARGETS.length - 1 ; a >= 0 ; a--)
        {
        if ( TARGETS[ a ].tick( event ) )
            {
            Game.oneMoreMiss();

            Game.removeTarget( TARGETS[ a ] );
            }
        }
    }

export function newTarget()
    {
    var x = Utilities.getRandomInt( 0, G.CANVAS.width - Target.side_length );
    var y = Utilities.getRandomInt( 0, G.CANVAS.height - Target.side_length );

    TARGETS.push( new Target( x, y ) );
    }

export function removeTarget( target: Target )
    {
    var position = TARGETS.indexOf( target );

    TARGETS.splice( position, 1 );

    target.clear();
    }


export function oneMoreHit()
    {
    HITS_COUNT++;

    GameMenu.updateHits( HITS_COUNT );
    }

export function oneMoreMiss()
    {
    MISSES_COUNT++;

    GameMenu.updateMisses( MISSES_COUNT );
    }
}


