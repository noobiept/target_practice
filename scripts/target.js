var Target = (function () {
    function Target(x, y) {
        var shape = new createjs.Shape();
        var length = 10;
        shape.x = x;
        shape.y = y;
        var g = shape.graphics;
        g.beginFill('red');
        g.drawRect(0, 0, length, length);
        g.endFill();
        G.STAGE.addChild(shape);
        this.duration_count = 0;
        this.shape = shape;
        this.side_length = length;
    }
    Target.prototype.tick = function (event) {
        this.duration_count += event.delta;
        if (this.duration_count >= Target.duration) {
            return true;
        }
        return false;
    };
    Target.prototype.clear = function () {
        G.STAGE.removeChild(this.shape);
    };
    Target.prototype.getX = function () {
        return this.shape.x;
    };
    Target.prototype.getY = function () {
        return this.shape.y;
    };
    Target.duration = 3000;
    return Target;
})();
