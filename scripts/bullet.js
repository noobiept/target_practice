var Bullet = (function () {
    function Bullet(x, y) {
        var length = 10;
        var shape = new createjs.Shape();

        shape.x = x;
        shape.y = y;

        var g = shape.graphics;

        g.beginFill('blue');
        g.drawRect(0, 0, length, length);
        g.endFill();

        G.STAGE.addChild(shape);

        this.duration_count = 0;
        this.length = length;
        this.shape = shape;
    }
    Bullet.prototype.tick = function (event) {
        this.duration_count += event.delta;

        if (this.duration_count >= Bullet.duration) {
            return true;
        }

        return false;
    };

    Bullet.prototype.clear = function () {
        G.STAGE.removeChild(this.shape);
    };

    Bullet.prototype.getX = function () {
        return this.shape.x;
    };

    Bullet.prototype.getY = function () {
        return this.shape.y;
    };
    Bullet.duration = 700;
    return Bullet;
})();
