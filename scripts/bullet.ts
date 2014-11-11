class Bullet
{
shape: createjs.Shape;
duration_count: number;     // remove the bullet after a certain time/duration has passed
static duration = 700;    // the duration of the bullets

length: number;     // the width/height (its the same value)

constructor( x: number, y: number )
    {
    var length = 10;
    var shape = new createjs.Shape();

    shape.x = x;
    shape.y = y;

    var g = shape.graphics;

    g.beginFill( 'blue' );
    g.drawRect( 0, 0, length, length );
    g.endFill();

    G.STAGE.addChild( shape );

    this.duration_count = 0;
    this.length = length;
    this.shape = shape;
    }

tick( event )
    {
    this.duration_count += event.delta;

    if ( this.duration_count >= Bullet.duration )
        {
        return true;
        }

    return false;
    }

clear()
    {
    G.STAGE.removeChild( this.shape );
    }

getX()
    {
    return this.shape.x;
    }

getY()
    {
    return this.shape.y;
    }
}