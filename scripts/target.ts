class Target
{
shape: createjs.Shape;
length: number;  // the width/height

constructor( x: number, y: number )
    {
    var _this = this;
    var shape = new createjs.Shape();
    var length = 10;

    shape.x = x;
    shape.y = y;

    var g = shape.graphics;

    g.beginFill( 'red' );
    g.drawRect( 0, 0, length, length );
    g.endFill();

    G.STAGE.addChild( shape );

    this.shape = shape;
    this.length = length;
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