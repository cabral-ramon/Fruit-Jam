function Sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";

    var main = document.getElementById("main");
    document.body.insertBefore(this.sound, main);
    
    this.play = function(){
        this.sound.play();
    };
    this.stop = function(){
        this.sound.pause();
    };
    this.loop = function(){
        this.sound.loop = true;
    };
}

module.exports = Sound;
