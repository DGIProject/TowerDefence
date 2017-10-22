/**
 * Created by Guillaume on 26/02/2016.
 */

Round = function(mapPath)
{
    this.roundNumber = 0;
    this.quantity = 10;
    this.ballons = [];
    this.mapPath = mapPath;
    this.ballonsLevel = [1,2,3,4,5,6,7,8,9,10];

};

Round.prototype.generateRound = function()
{
    this.ballons = [];
    this.roundNumber++;
    this.quantity = 10*this.roundNumber;

    for ( i=0;i<this.quantity;i++)
    {
        //var level = Math.ceil((Math.random()*this.roundNumber) );
        var ball = new Ballon(this.ballonsLevel[i%10], i);
        ball.setColor(i%10);
        ball.setPath(this.mapPath);
        this.ballons.push(ball);
    }
    console.log(this)

};

Round.prototype.startRound = function () {
    var round = this;
    var i=0;
    this.sendBallonInterval = setInterval(function () {
        if (i<round.ballons.length)
        {
            round.setBallon(i);
            i++;
        }
        else
        {
            clearInterval(round.sendBallonInterval);
        }

    }, 500);
};

Round.prototype.setBallon = function (i) {

        this.ballons[i].startMove();
        console.log("ball "+ i + "life "+ this.ballons[i].life);
};

Round.prototype.removeBallon = function (i) {
  this.ballons.splice(i,1);
};
Round.prototype.pause = function()
{
  for ( i;i<this.ballons.length;i++)
  {
      this.ballons[i].stopMove();
  }
};

Round.prototype.play = function () {
    for ( i;i<this.ballons.length;i++)
    {
        this.ballons[i].startMove();
        //TODO : EDIT Curve to allow pause and play without restarting all ...
    }
};