module Game
{
var CROSS_HAIR = null;
var TARGETS = [];
var BULLETS = [];

var NEW_TARGET_INTERVAL = 1500;
var NEW_TARGET_COUNT = 0;

var MOUSE_HELD = false;
var BULLET_INTERVAL = 300;
var BULLET_COUNT = BULLET_INTERVAL; // so that it fires a bullet from the start

var MOUSE_X = 0;
var MOUSE_Y = 0;

export function start()
    {
    G.STAGE.on( 'stagemousemove', function( event )
        {
        CROSS_HAIR.moveTo( event.stageX, event.stageY );

        MOUSE_X = event.stageX;
        MOUSE_Y = event.stageY;
        });

    CROSS_HAIR = new CrossHair();

    G.CANVAS.addEventListener( 'mousedown', function( event )
        {
        MOUSE_HELD = true;
        });

    G.CANVAS.addEventListener( 'mouseup', function( event )
        {
        BULLET_COUNT = BULLET_INTERVAL;
        MOUSE_HELD = false;
        });

    createjs.Ticker.on( 'tick', tick );
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

        // bullets
    BULLET_COUNT += event.delta;

    if ( MOUSE_HELD && BULLET_COUNT >= BULLET_INTERVAL )
        {
        BULLET_COUNT = 0;

        Game.newBullet();
        }

        // other ticks
    for (var a = BULLETS.length - 1 ; a >= 0 ; a--)
        {
        if ( BULLETS[ a ].tick( event ) )
            {
            Game.removeBullet( BULLETS[ a ] );
            }
        }
    }

export function newTarget()
    {
    var x = Utilities.getRandomInt( 0, G.CANVAS.width );
    var y = Utilities.getRandomInt( 0, G.CANVAS.height );

    TARGETS.push( new Target( x, y ) );
    }

export function removeTarget( target: Target )
    {
    var position = TARGETS.indexOf( target );

    TARGETS.splice( position, 1 );

    target.clear();
    }

export function newBullet()
    {
    var range = 30;

    var x = Utilities.getRandomInt( MOUSE_X - range, MOUSE_X + range );
    var y = Utilities.getRandomInt( MOUSE_Y - range, MOUSE_Y + range );

    var bullet = new Bullet( x, y );
    BULLETS.push( bullet );

    var bulletX = bullet.getX();
    var bulletY = bullet.getY();
    var bulletLength = bullet.length;

        // check if we hit any target
    for (var a = TARGETS.length - 1 ; a >= 0 ; a--)
        {
        var target = TARGETS[ a ];

        if ( Utilities.boxBoxCollision( bulletX, bulletY, bulletLength, bulletLength, target.getX(), target.getY(), target.length, target.length ) )
            {
            Game.removeTarget( target );
            break;
            }
        }
    }

export function removeBullet( bullet )
    {
    var position = BULLETS.indexOf( bullet );

    BULLETS.splice( position, 1 );

    bullet.clear();
    }
}


