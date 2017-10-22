/**
 * Created by Guillaume on 26/02/2016.
 */

Map = function (mapName) {
    this.mapName = mapName;
    this.towerList = [];
    this.currentLoad = 0;
};

Map.prototype.load = function (callback) {

    var xhr =  (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");


    xhr.open("GET", 'map/' + this.mapName + '/map.json', false);
    xhr.send(null);
    if(xhr.readyState != 4 || (xhr.status != 200 && xhr.status != 0)){
        this.isLoaded = false;
        throw new Error("Impossible de charger le fichier  \"" + this.mapName + " (code HTTP : " + xhr.status + ").");
    } // Code == 0 en local

    this.mapProperties = JSON.parse(xhr.responseText);

    console.log(this.mapProperties);
    console.log(this.mapProperties.files);

    this.mapPropertiesKeys = Object.keys(this.mapProperties.files);
    this.getFiles(callback);


    console.log(this.mapProperties.files);

};

Map.prototype.getFiles = function (readyCallback) {
    var that = this;
    var callback = readyCallback;
    console.log(this.currentLoad);
    if (this.mapPropertiesKeys.length != this.currentLoad)
    {
        this.loadFile(this.mapProperties.files[this.mapPropertiesKeys[this.currentLoad]], this.currentLoad ,function() {
            that.getFiles(callback);
        });

        this.currentLoad++;
    }
    else
    {
        console.log(this.mapProperties);
        callback();
    }



};

Map.prototype.loadFile = function(url, currentload , onloadCallback)
{
    console.log("load :"+currentload);
    var that = this;
    var image = new Image();
    image.onload = function() {
        that.mapProperties.files[that.mapPropertiesKeys[currentload]] = image;
        onloadCallback();
    };
    image.src = "map/"+this.mapName+"/"+url;
};



