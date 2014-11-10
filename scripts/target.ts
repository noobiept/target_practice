class Target
{
shape: createjs.Shape;

constructor( x: Number, y: Number )
    {
    var _this = this;
    var shape = new createjs.Shape();

    var g = shape.graphics;

    g.beginFill( 'red' );
    g.drawRect( 0, 0, 10, 10 );
    g.endFill();


    shape.on( 'click', function( event )
        {
        _this.clear();
        });


    G.STAGE.addChild( shape );

    this.shape = shape;
    }


clear()
    {
    G.STAGE.removeChild( this.shape );
    }
}