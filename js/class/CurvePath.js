function CurveAnimator(svgPath) {
    this.path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

    this.path.setAttribute('d', svgPath);
    this.updatePath();
    this.ready = false;
    CurveAnimator.lastCreated = this;
}


CurveAnimator.prototype.animate = function(duration, callback, delay) {
    var curveAnim = this;
    this.duration = duration;
    if (!delay) delay = 1 / 30;
    //console.log(delay);
   // clearInterval(curveAnim.animTimer);
    var startTime = new Date;
    this.startTime = startTime;
   curveAnim.animTimer = setInterval(function() {
        var now = new Date;
        var elapsed = (now - startTime) / 1000;
        curveAnim.elapsed = elapsed;
        var percent = elapsed / duration;
        if (percent >= 1) {
            percent = 1;
            clearInterval(curveAnim.animTimer);
        }
        var p1 = curveAnim.pointAt(percent - 0.01),
            p2 = curveAnim.pointAt(percent + 0.01);
       callback(curveAnim.pointAt(percent), Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI);
        //console.log("-----", curveAnim.pointAt(percent));
    }, delay * 1000);
    this.ready = true;
};

CurveAnimator.prototype.getPos = function () {

    if (this.ready)
    {
        var now = new Date;
        var elapsed = (now - this.startTime) / 1000;
        var percent = elapsed / this.duration;
        if (percent >= 1) {
            percent = 1;
        }
        // var p1 = curveAnim.pointAt(percent - 0.01),
        //     p2 = curveAnim.pointAt(percent + 0.01);
        // angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;

        //console.log("+++++", this.pointAt(percent), percent);
        return this.pointAt(percent);
    }
    else {
        return this.pointAt(0);
    }

};

CurveAnimator.prototype.stop = function() {
    clearInterval(this.animTimer);
};
CurveAnimator.prototype.pointAt = function(percent) {
    //console.log(this.len ,this.len * percent);
    return this.path.getPointAtLength(this.len * percent);
};

CurveAnimator.prototype.pointAtDuration = function (duration) {
    var durationS = duration/1000;

    if ( durationS <= this.duration)
    {
        var percent = durationS/this.duration;
        return this.pointAt(percent);
    }
    else {
        return this.pointAt(1);
    }
};

CurveAnimator.prototype.elapsedTime = function () {
    var now = new Date;
    return  (now - this.startTime);

};
CurveAnimator.prototype.updatePath = function() {
    this.len = this.path.getTotalLength();
};