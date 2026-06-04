import { addToGameLoop } from '@drk4/game-engine';
import { boxBoxCollision, getRandomInt } from '@drk4/utilities';
import { Bullet } from './bullet';
import { CrossHair } from './crosshair';
import { G } from './globals';
import * as GameMenu from './game_menu';
import * as Message from './message';
import { Target } from './target';
import { Weapon } from './weapon';

var CROSS_HAIR = null;
var TARGETS: Target[] = [];

export var MOUSE_HELD = false;

export var MOUSE_X = 0;
export var MOUSE_Y = 0;

var HITS_COUNT = 0;
var MISSES_COUNT = 0;

    // game options
var TARGET_HEALTH = 1;
var TARGET_SPAWN_INTERVAL = 1500;   // in milliseconds

var NEW_TARGET_COUNT = TARGET_SPAWN_INTERVAL;   // so that it adds a target from the start

var CURRENT_WEAPON: Weapon = null;

export function init()
    {
    CROSS_HAIR = new CrossHair();
    CURRENT_WEAPON = new Weapon( 'machineGun' );

    var canvas = G.CANVAS.getHtmlCanvasElement();

    canvas.addEventListener( 'mousemove', function( event )
        {
        var bounds = canvas.getBoundingClientRect();
        var x = event.clientX - bounds.left;
        var y = event.clientY - bounds.top;

        CROSS_HAIR.moveTo( x, y );

        MOUSE_X = x;
        MOUSE_Y = y;
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

    addToGameLoop( function( deltaTime )
        {
        tick( deltaTime * 1000 );
        });
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

    NEW_TARGET_COUNT = TARGET_SPAWN_INTERVAL;

    HITS_COUNT = 0;
    MISSES_COUNT = 0;

    CURRENT_WEAPON.reset();
    Message.hide();
    }

export function restart()
    {
    clear();
    start();
    }

function tick( deltaMs: number )
    {
        // targets
    NEW_TARGET_COUNT += deltaMs;

    if ( NEW_TARGET_COUNT >= TARGET_SPAWN_INTERVAL )
        {
        NEW_TARGET_COUNT = 0;

        newTarget();
        }

        // weapons
    CURRENT_WEAPON.tick( deltaMs );

        // check if there are targets that timed out (and thus need to be removed)
    var a;

    for (a = TARGETS.length - 1 ; a >= 0 ; a--)
        {
        if ( TARGETS[ a ].tick( deltaMs ) )
            {
            oneMoreMiss();

            removeTarget( TARGETS[ a ] );
            }
        }
    }

export function newTarget()
    {
    var x = getRandomInt( 0, G.CANVAS.width - Target.side_length );
    var y = getRandomInt( 0, G.CANVAS.height - Target.side_length );

    TARGETS.push( new Target( x, y, TARGET_HEALTH ) );
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

export function checkCollision( bulletX, bulletY, bulletLength )
    {
    var targetLength = Target.side_length;

    for (var a = TARGETS.length - 1 ; a >= 0 ; a--)
        {
        var target = TARGETS[ a ];

        if ( boxBoxCollision( bulletX, bulletY, bulletLength, bulletLength, target.getX(), target.getY(), targetLength, targetLength ) )
            {
            if ( target.tookDamage( CURRENT_WEAPON.getDamageValue() ) )
                {
                oneMoreHit();

                removeTarget( target );
                }

            break;
            }
        }
    }


export function setTargetHealth( health )
    {
    TARGET_HEALTH = health;

    restart();
    }


export function getTargetHealth()
    {
    return TARGET_HEALTH;
    }


export function setTargetSpawnInterval( interval )
    {
    TARGET_SPAWN_INTERVAL = interval;

    restart();
    }


export function getTargetSpawnInterval()
    {
    return TARGET_SPAWN_INTERVAL;
    }


export function setCanReload( value )
    {
    CURRENT_WEAPON.setCanReload( value );

    restart();
    }


