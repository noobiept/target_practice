var Target = (function () {
    function Target(x, y) {
        var shape = new createjs.Shape();
        var length = Target.side_length;
        shape.x = x;
        shape.y = y;
        var g = shape.graphics;
        g.beginFill('red');
        g.drawRect(0, 0, length, length);
        g.endFill();
        Target._container.addChild(shape);
        this.duration_count = 0;
        this.shape = shape;
    }
    Target.init = function (stage) {
        Target._container = new createjs.Container();
        stage.addChild(Target._container);
    };
    Target.prototype.tick = function (event) {
        this.duration_count += event.delta;
        if (this.duration_count >= Target.duration) {
            return true;
        }
        return false;
    };
    Target.prototype.clear = function () {
        Target._container.removeChild(this.shape);
    };
    Target.prototype.getX = function () {
        return this.shape.x;
    };
    Target.prototype.getY = function () {
        return this.shape.y;
    };
    Target.duration = 3000;
    Target.side_length = 10; // the width/height
    return Target;
})();
