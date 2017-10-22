/**
 * Created by Guillaume on 27/02/2016.
 */

Throwable = function (path)
{
    this.pos = {x:0, y:0};
    this.curve = new CurveAnimator(path);
    this.maxPos = this.curve.pointAt(1);
    this.life = 1;
    this.radius = 10;
    this.atEnd = false;
    this.touched = false;
};

Throwable.prototype.startMove = function(time)
{
    var throwable = this;

    this.curve.animate(time, function(point, angle) {
        throwable.pos.x = point.x;
        throwable.pos.y = point.y;
    });
};

Throwable.prototype.updatePos = function () {
    //this.pos = this.curve.getPos();
};

Throwable.prototype.stopMove = function () {
    this.curve.stop();
    this.stoped = true;
};
Throwable.prototype.isAtEnd = function () {
    if (!this.atEnd)
    {
        if (this.maxPos.x == this.pos.x && this.maxPos.y == this.pos.y)
        {
            this.atEnd = true;
            return true;
        }
        else
        {
            return false;
        }
    }


    return true;
};