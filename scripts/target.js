var Target = (function () {
    function Target(x, y) {
        var _this = this;
        var shape = new createjs.Shape();
        var length = 10;
        shape.x = x;
        shape.y = y;
        var g = shape.graphics;
        g.beginFill('red');
        g.drawRect(0, 0, length, length);
        g.endFill();
        G.STAGE.addChild(shape);
        this.shape = shape;
        this.length = length;
    }
    Target.prototype.clear = function () {
        G.STAGE.removeChild(this.shape);
    };
    Target.prototype.getX = function () {
        return this.shape.x;
    };
    Target.prototype.getY = function () {
        return this.shape.y;
    };
    return Target;
})();
