/**
 * Created by Guillaume on 26/02/2016.
 */
Towers  = function (name, power, radius) {
    this.name = name;
    this.power = power;
    this.radius = radius;
    this.towerRadius = 20;
    this.coolDown = 100; //in ms
    this.canShoot = true;
    this.pos = {x:0, y:0};
    this.price = 0;
    this.sellPrice = 90/100*this.price;
    this.selected = true;
    this.missiles = [];
};



Towers.prototype.throwMissile = function (target) {
    if (this.canShoot && !target.atEnd)
    {
        var tower = this;
        setTimeout(function () {
            tower.canShoot = true;
        }, this.coolDown);

        var newPos = target.curve.pointAtDuration(target.curve.elapsedTime()+400);
       // var newPos = target.pos;
        var path = "M"+this.pos.x+" "+this.pos.y+" L"+newPos.x+" "+newPos.y;
        var throwable = new Throwable(path);
        throwable.startMove(0.4);

        this.canShoot=false;
        this.missiles.push(throwable)
    }

};

Towers.prototype.removeMissile = function (i) {
    this.missiles[i].stopMove();
    this.missiles.splice(i,1);
};

Towers.prototype.levelUp = function()
{
    this.level++;
    this.price = 1;
    this.sellPrice = 90/100*this.price;
};

Towers.prototype.setPos = function (x,y) {
  this.pos.x = x;
    this.pos.y = y;
};