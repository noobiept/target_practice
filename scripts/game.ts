module Game
{
var CROSS_HAIR = null;
var TARGETS = [];


export function init()
    {
    G.STAGE.on( 'stagemousemove', function( event )
    {
    CROSS_HAIR.moveTo( event.stageX, event.stageY );
    });

    CROSS_HAIR = new CrossHair();

    CROSS_HAIR.moveTo( 200, 200 );


    TARGETS.push( new Target( 100, 100 ) );
    }
}