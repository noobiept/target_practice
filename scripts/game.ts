module Game
{
var CROSS_HAIR = null;
var TARGETS = [];
var BULLETS = [];

var NEW_TARGET_INTERVAL = 1500;
var NEW_TARGET_COUNT = 0;

var MOUSE_HELD = false;
var BULLET_INTERVAL = 200;
var BULLET_COUNT = BULLET_INTERVAL; // so that it fires a bullet from the start

var BULLETS_FIRED = 0;

var MOUSE_X = 0;
var MOUSE_Y = 0;

var HITS_COUNT = 0;
var MISSES_COUNT = 0;

export function init()
    {
    CROSS_HAIR = new CrossHair();

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
        BULLETS_FIRED = 0;
        BULLET_COUNT = BULLET_INTERVAL;
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

    for (a = 0 ; a < BULLETS.length ; a++)
        {
        BULLETS[ a ].clear();
        }

    BULLETS.length = 0;

    NEW_TARGET_COUNT = 0;
    BULLET_COUNT = BULLET_INTERVAL;
    BULLETS_FIRED = 0;

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

        // bullets
    BULLET_COUNT += event.delta;

    if ( MOUSE_HELD && BULLET_COUNT >= BULLET_INTERVAL )
        {
        BULLET_COUNT = 0;
        BULLETS_FIRED++;

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
    var currentWeapon = Weapon.machineGun;  //HERE
    var variance = currentWeapon.variance;
    var recoil = currentWeapon.recoil;

    var x = Utilities.getRandomInt( MOUSE_X - variance, MOUSE_X + variance );
    var y = Utilities.getRandomInt( MOUSE_Y - variance, MOUSE_Y + variance );


        // find the recoil info to be used for the current bullet (depends on the number of bullets fired in the current spray)
    var recoilInfo = null;
    var nextInfo = null;

    for (var a = 0 ; a < recoil.length ; a++)
        {
        nextInfo = recoil[ a ];

        if ( BULLETS_FIRED < nextInfo.bullet )
            {
            break;
            }

        recoilInfo = nextInfo;
        }

    if ( recoilInfo !== null )
        {
        x += recoilInfo.xOffset;
        y += recoilInfo.yOffset;
        }


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
            HITS_COUNT++;
            GameMenu.updateHits( HITS_COUNT );

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


