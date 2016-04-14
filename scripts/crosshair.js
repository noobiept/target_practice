var CrossHair = (function () {
    function CrossHair() {
        var radius = 3;
        var shape = new createjs.Shape();
        var g = shape.graphics;
        g.beginFill('black');
        g.drawCircle(0, 0, radius);
        g.endFill();
        CrossHair._container.addChild(shape);
        this.shape = shape;
    }
    CrossHair.init = function (stage) {
        CrossHair._container = new createjs.Container();
        stage.addChild(CrossHair._container);
    };
    CrossHair.prototype.moveTo = function (x, y) {
        this.shape.x = x;
        this.shape.y = y;
    };
    CrossHair.prototype.clear = function () {
        CrossHair._container.removeChild(this.shape);
    };
    return CrossHair;
}());
