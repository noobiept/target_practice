import { Container, Rectangle, addElement } from '@drk4/game-engine';

export class Bullet
{
shape: Rectangle;
duration_count: number;     // remove the bullet after a certain time/duration has passed
static duration = 700;    // the duration of the bullets

static side_length = 10;     // the width/height (its the same value)

private static _container: Container;

static init()
    {
    Bullet._container = new Container();

    addElement( Bullet._container );
    }

constructor( x: number, y: number )
    {
    var shape = new Rectangle({
        x: x + Bullet.side_length / 2,
        y: y + Bullet.side_length / 2,
        width: Bullet.side_length,
        height: Bullet.side_length,
        color: 'blue'
    });

    Bullet._container.addChild( shape );

    this.duration_count = 0;
    this.shape = shape;
    }

tick( deltaMs: number )
    {
    this.duration_count += deltaMs;

    if ( this.duration_count >= Bullet.duration )
        {
        return true;
        }

    return false;
    }

clear()
    {
    Bullet._container.removeChild( this.shape );
    }

getX()
    {
    return this.shape.left;
    }

getY()
    {
    return this.shape.top;
    }
}
