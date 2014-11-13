module Message
{
var CONTAINER: createjs.Container;
var TEXT: createjs.Text;
var BACKGROUND: createjs.Shape;
var TIMEOUT: Utilities.Timeout;

export function init( stage )
    {
    var canvasWidth = G.CANVAS.width;
    var canvasHeight = G.CANVAS.height;

        // container
    CONTAINER = new createjs.Container();

    stage.addChild( CONTAINER );

        // text element
    TEXT = new createjs.Text( '', '26px monospace' );
    TEXT.textAlign = 'center';
    TEXT.x = canvasWidth / 2;
    TEXT.y = canvasHeight / 2;

        // background element
    BACKGROUND = new createjs.Shape();

    var g = BACKGROUND.graphics;

    g.beginFill( 'rgb(161,170,227)' );
    g.drawRect( 0, 0, canvasWidth, 30 );
    g.endFill();

    BACKGROUND.x = 0;
    BACKGROUND.y = canvasHeight / 2;

    CONTAINER.addChild( BACKGROUND );
    CONTAINER.addChild( TEXT );

    CONTAINER.visible = false;

        // timeout
    TIMEOUT = new Utilities.Timeout();
    }


export function show( text, timeout?, callback? )
    {
    TEXT.text = text;
    CONTAINER.visible = true;

    if ( typeof timeout !== 'undefined' )
        {
        TIMEOUT.start( function()
            {
            if ( typeof callback !== 'undefined' )
                {
                callback();
                }

            CONTAINER.visible = false;

            }, timeout );
        }
    }

export function hide()
    {
    TIMEOUT.clear();
    CONTAINER.visible = false;
    }
}