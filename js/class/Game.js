/**
 * Created by Guillaume on 26/02/2016.
 */

Game = function (gameName, dificulty, mapName, context) {

    this.Modes = {add: 0, select: 1};
    this.currentMode = this.Modes.add;

    this.context = context;
    this.gameName = gameName;
    this.dificulty = dificulty;

    this.map = new Map(mapName);
    var that = this;
    this.towers = this.loadTowers();
    this.map.load(function () {
        that.mapReady();
    });
    this.currentRound = null;

};

Game.prototype.mapReady = function () {
    console.log("called");
    console.log(this);
    var that = this;

    this.currentRound = new Round(this.map.mapProperties.path);
    this.currentRound.generateRound();

    this.frameInterval = setInterval(function () {
        that.drawFrame();
    }, 1/40*1000);
    console.log("delay :"+ 1/50);

    this.currentRound.startRound();



};

Game.prototype.drawFrame = function () {
    //var start = new Date().getMilliseconds();
    //var round=this.currentRound;
   // console.log("f1");
    this.context.drawImage(this.map.mapProperties.files.bg, 0, 0);

    for (i = 0; i < this.currentRound.ballons.length; i++) {
        var ball = this.currentRound.ballons[i];

        for (y = 0; y < this.map.towerList.length; y++) {
            var tower = this.map.towerList[y];

            ball.isInRadius(tower);
            ball.touchThrowable(tower);

        }

        this.context.beginPath();
        this.context.fillStyle = 'rgba(120, 120, 120, 0.5)';
        this.context.arc(ball.pos.x, ball.pos.y, ball.radius, 0, 2 * Math.PI, false);
        this.context.fill();
        this.context.lineWidth = 2;
        this.context.strokeStyle = '#003300';
        this.context.stroke();
        this.context.closePath();

        this.context.fillStyle = ball.color;
        this.context.fillRect(ball.pos.x - 10, ball.pos.y - 10, 20, 20);

        if (!ball.stoped){
            if (ball.life <= 0 && !ball.isAtEnd()) {
                console.log("Good you earn", ball.getPriceGain());
                ball.stopMove();
                // this.currentRound.removeBallon(i);
            }
            else if (ball.isAtEnd() && ball.life > 0) {
                console.log("You Loose ", ball.life, "lives");
                ball.stopMove();
                //this.currentRound.removeBallon(i);
            }
        }



    }


    /*  for (i=0;i<this.currentRound.ballons.length;i++)
     {
     var ballPos = this.currentRound.ballons[i].pos;

     this.context.beginPath();
     this.context.fillStyle = 'rgba(120, 120, 120, 0.5)';
     this.context.arc(ballPos.x, ballPos.y, this.currentRound.ballons[i].radius, 0, 2 * Math.PI, false);
     this.context.fill();
     this.context.lineWidth = 2;
     this.context.strokeStyle = '#003300';
     this.context.stroke();
     this.context.closePath();

     this.context.fillStyle=this.currentRound.ballons[i].color;
     this.context.fillRect(ballPos.x-10, ballPos.y-10, 20, 20);

     if (this.currentRound.ballons[i].life <= 0  && !this.currentRound.ballons[i].isAtEnd())
     {
     console.log("Good you earn", this.currentRound.ballons[i].getPriceGain());
     this.currentRound.ballons[i].stopMove();
     this.currentRound.removeBallon(i);
     }
     else if(this.currentRound.ballons[i].isAtEnd() && this.currentRound.ballons[i].life > 0)
     {
     console.log("You Loose ", this.currentRound.ballons[i].life, "lives");
     this.currentRound.ballons[i].stopMove();
     this.currentRound.removeBallon(i);
     }
     }
     */

    for (i = 0; i < this.map.towerList.length; i++) {
        var tower = this.map.towerList[i];

        if (tower.selected) {
            this.context.beginPath();
            this.context.fillStyle = 'rgba(120, 120, 120, 0.5)';
            this.context.arc(tower.pos.x, tower.pos.y, tower.radius + tower.towerRadius, 0, 2 * Math.PI, false);
            this.context.fill();
            this.context.lineWidth = 2;
            this.context.strokeStyle = '#003300';
            this.context.stroke();
            this.context.closePath();
        }

        this.context.beginPath();
        this.context.fillStyle = "#FC4305";
        this.context.arc(tower.pos.x, tower.pos.y, 20, 0, 2 * Math.PI, false);
        this.context.fill();
        this.context.lineWidth = 3;
        this.context.strokeStyle = '#003300';
        this.context.stroke();
        this.context.closePath();


        for (y = 0; y < tower.missiles.length; y++) {
            var missile = tower.missiles[y];

            if (missile.isAtEnd() || missile.life <= 0) {
                tower.removeMissile(y);
            }
            else {
                this.context.beginPath();
                this.context.fillStyle = 'rgba(120, 0, 120, 1)';
                this.context.arc(missile.pos.x, missile.pos.y, missile.radius, 0, 2 * Math.PI, false);
                this.context.fill();
                this.context.lineWidth = 1;
                this.context.strokeStyle = '#003300';
                this.context.stroke();
                this.context.closePath();
            }


        }


    }

   // var ac = new Date().getMilliseconds();

    //console.log("Time to draw" + (ac - start));


};

Game.prototype.isLoading = function () {

};

Game.prototype.onClick = function (event, x, y) {
    console.log(event, x, y);
    switch (this.currentMode) {
        case this.Modes.add:
            var tower = new Towers("gun1", 2, 50);
            tower.setPos(x, y);
            this.map.towerList.push(tower);
            break;
        case this.Modes.select:
        default :
    }
};

Game.prototype.loadTowers = function () {
    var xhr = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");

    xhr.open("GET", 'assets/Towers.json', false);
    xhr.send(null);
    if (xhr.readyState != 4 || (xhr.status != 200 && xhr.status != 0))
        throw new Error("Impossible de charger le fichier  (code HTTP : " + xhr.status + ").");

    return JSON.parse(xhr.responseText);
};