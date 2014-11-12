class CrossHair
{
shape: createjs.Shape;

constructor()
    {
    var radius = 3;

    var shape = new createjs.Shape();

    var g = shape.graphics;

    g.beginFill( 'black' );
    g.drawCircle( 0, 0, radius );
    g.endFill();

    G.STAGE.addChild( shape );

    this.shape = shape;
    }

moveTo( x, y )
    {
    this.shape.x = x;
    this.shape.y = y;
    }

clear()
    {
    G.STAGE.removeChild( this.shape );
    }
}