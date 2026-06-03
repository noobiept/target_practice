import { Circle, Container, addElement } from '@drk4/game-engine';

export class CrossHair
{
shape: Circle;

private static _container: Container;

static init()
    {
    CrossHair._container = new Container();

    addElement( CrossHair._container );
    }

constructor()
    {
    var radius = 3;

    var shape = new Circle({
        x: 0,
        y: 0,
        radius: radius,
        color: 'black'
    });

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
