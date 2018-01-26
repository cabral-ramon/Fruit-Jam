class Timer {
  constructor(){
    this.value = null;
  }

  changeTime(){
    let currentTime = parseInt(document.getElementById("timer").innerHTML);
    if (currentTime <= 0) {
      clearInterval(this.value);
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
}

module.exports = Timer;
