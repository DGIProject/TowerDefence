/**
 * Created by Guillaume on 26/02/2016.
 */

Ballon = function (life, id) {
    this.pos = {x:0,y:0};
    this.maxPos = {x:0,y:0};
    this.curve = null;
    this.initialLife = this.life = life;
    this.color = null;
    this.radius = 15;
    this.atEnd = false;
    this.stoped = false;
    this.id = id;
    console.log("Id Set", id);

};

Ballon.prototype.setPath = function (path) {
    this.curve = new CurveAnimator(path);
    this.initialPos = this.pos = this.curve.pointAt(0);
    this.maxPos = this.curve.pointAt(1);

};


Ballon.prototype.setColor = function(life)
{
    switch (life)
    {
        case 1:
            this.color = "#F7370C";
            break;
        case 2:
            this.color = "#0CCCF7";
            break;
        case 3:
            this.color = "#C453ED";
            break;
        case 4:
            this.color = "#ED7753";
            break;
        case 5:
            this.color = "#1926E3";
            break;
        case 6:
            this.color = "#E3D619";
            break;
        case 7:
            this.color = "#BEFF33";
            break;
        case 8:
            this.color = "#7433FF";
            break;
        case 9:
            this.color = "#8A8060";
            break;
        case 10:
            this.color = "#000000";
            break;
    }
};

Ballon.prototype.startMove = function()
{
    var ballon = this;

    this.curve.animate(20, function(point, angle) {
        ballon.pos.x = point.x;
        ballon.pos.y = point.y;
        //console.log("updatePos");
    });

};

Ballon.prototype.isInRadius = function (tower) {

    var d2 = (this.pos.x-tower.pos.x)*(this.pos.x-tower.pos.x) + (this.pos.y-tower.pos.y)*(this.pos.y-tower.pos.y);
    if ((d2 < (this.radius + tower.radius+tower.towerRadius)*(this.radius + tower.radius+tower.towerRadius))){
        //console.log("ballon " + this.id + " = -" + tower.power + " life "+ this.life);
        tower.throwMissile(this);
    }

};

Ballon.prototype.isAtEnd = function () {

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

Ballon.prototype.touchThrowable = function (tower) {
  for (i;i<tower.missiles.length;i++)
  {
      //tower.missiles[i].updatePos();
      var missile = tower.missiles[i];
      if (!missile.touched)
      {
          var d = (this.pos.x-missile.pos.x)*(this.pos.x-missile.pos.x) + (this.pos.y-missile.pos.y)*(this.pos.y-missile.pos.y);
          if ( d <((this.radius + missile.radius)*(this.radius + missile.radius))){
              //console.log("ballon " + this.id + " = -" + tower.power + " life "+ this.life);
              missile.touched = true;
              console.log("ballon touch missile !" + this.id +" -- life ball ", this.life, " missile ", missile.life, " power ", tower.power );
              // this.life -= tower.power;
              //missile.life -= 1;
              // this.setColor(this.life);
          }
      }

  }
};

Ballon.prototype.getPriceGain = function () {
  return 10/this.initialLife;
};

Ballon.prototype.updatePos = function () {
  //this.pos = this.curve.getPos();
};

Ballon.prototype.stopMove = function() {
    this.curve.stop();
    this.stoped = true;
    console.log("stoped", this.id);
};
