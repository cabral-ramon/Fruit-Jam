class Timer {
  constructor(sounds){
    this.sounds = sounds;
    this.value = null;
    this.gameOver = this.gameOver.bind(this);
    this.changeTime = this.changeTime.bind(this);
  }

  gameOver(){
    let gameOverMenu = document.getElementById("game-over-wrapper");
    let score = document.getElementById("score-points").innerHTML;
    document.getElementById("final-score").innerHTML = score;
    gameOverMenu.style.display = 'block';
    this.sounds.backgroundMusic.stop();
    this.sounds.gameOver.play();
  }

  changeTime(){
    let currentTime = parseInt(document.getElementById("timer").innerHTML);
    if (currentTime <= 0) {
      clearInterval(this.value);
      this.gameOver();
    } else if (currentTime < 11) {
      document.getElementById("timer").classList.add("count-down");
      document.getElementById("timer").innerHTML -= 1;
    } else {
      document.getElementById("timer").innerHTML -= 1;
    }
  }

  updateTimer(startTime = 120){
    let value = setInterval(this.changeTime, 1000);
    this.value = value;
  }

  stopTimer(){
    clearInterval(this.value);
  }

  reset(){
    document.getElementById("timer").innerHTML = 60;
  }

}

module.exports = Timer;
