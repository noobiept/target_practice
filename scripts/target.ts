class Target
{
shape: createjs.Shape;
duration_count: number;     // remove the target after a certain time has passed (and count as a miss)
health: number;

static duration = 3000;
static side_length = 10;    // the width/height

private static _container: createjs.Container;   // all targets will be added to this container

static init( stage )
    {
    Target._container = new createjs.Container();

    stage.addChild( Target._container );
    }


constructor( x: number, y: number, health = 1 )
    {
    var shape = new createjs.Shape();
    var length = Target.side_length;

    shape.x = x;
    shape.y = y;

    var g = shape.graphics;

    g.beginFill( 'red' );
    g.drawRect( 0, 0, length, length );
    g.endFill();

    Target._container.addChild( shape );

    this.duration_count = 0;
    this.shape = shape;
    this.health = health;
    }


tookDamage( damage )
    {
    this.health -= damage;

    return this.health <= 0;
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
    Target._container.removeChild( this.shape );
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