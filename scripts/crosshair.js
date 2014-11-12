var CrossHair = (function () {
    function CrossHair() {
        var radius = 3;
        var shape = new createjs.Shape();
        var g = shape.graphics;
        g.beginFill('black');
        g.drawCircle(0, 0, radius);
        g.endFill();
        G.STAGE.addChild(shape);
        this.shape = shape;
    }
    CrossHair.prototype.moveTo = function (x, y) {
        this.shape.x = x;
        this.shape.y = y;
    };
    CrossHair.prototype.clear = function () {
        G.STAGE.removeChild(this.shape);
    };
    return CrossHair;
})();
