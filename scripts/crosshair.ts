class CrossHair
{
shape: createjs.Shape;

private static _container: createjs.Container;

static init( stage )
    {
    CrossHair._container = new createjs.Container();

    stage.addChild( CrossHair._container );
    }

constructor()
    {
    var radius = 3;

    var shape = new createjs.Shape();

    var g = shape.graphics;

    g.beginFill( 'black' );
    g.drawCircle( 0, 0, radius );
    g.endFill();

    CrossHair._container.addChild( shape );

    this.shape = shape;
    }

moveTo( x, y )
    {
    this.shape.x = x;
    this.shape.y = y;
    }

clear()
    {
    CrossHair._container.removeChild( this.shape );
    }
}