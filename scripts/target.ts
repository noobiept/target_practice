class Target
{
shape: createjs.Shape;
side_length: number;             // the width/height
duration_count: number;     // remove the target after a certain time has passed (and count as a miss)
static duration = 3000;

constructor( x: number, y: number )
    {
    var shape = new createjs.Shape();
    var length = 10;

    shape.x = x;
    shape.y = y;

    var g = shape.graphics;

    g.beginFill( 'red' );
    g.drawRect( 0, 0, length, length );
    g.endFill();

    G.STAGE.addChild( shape );

    this.duration_count = 0;
    this.shape = shape;
    this.side_length = length;
    }

tick( event )
    {
    this.duration_count += event.delta;

    if ( this.duration_count >= Target.duration )
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