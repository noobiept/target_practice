class Target
{
shape: createjs.Shape;

constructor( x: number, y: number )
    {
    var _this = this;
    var shape = new createjs.Shape();

    shape.x = x;
    shape.y = y;

    var g = shape.graphics;

    g.beginFill( 'red' );
    g.drawRect( 0, 0, 10, 10 );
    g.endFill();

    shape.on( 'click', function( event )
        {
        Game.removeTarget( _this );
        });


    G.STAGE.addChild( shape );

    this.shape = shape;
    }


clear()
    {
    G.STAGE.removeChild( this.shape );
    }
}