var Target = (function () {
    function Target(x, y) {
        var _this = this;
        var shape = new createjs.Shape();

        shape.x = x;
        shape.y = y;

        var g = shape.graphics;

        g.beginFill('red');
        g.drawRect(0, 0, 10, 10);
        g.endFill();

        shape.on('click', function (event) {
            Game.removeTarget(_this);
        });

        G.STAGE.addChild(shape);

        this.shape = shape;
    }
    Target.prototype.clear = function () {
        G.STAGE.removeChild(this.shape);
    };
    return Target;
})();
