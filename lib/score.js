
class Score {
  constructor(score = 0, increments = 100){
    this.score = score;
    this.increments = 100;

    this.reset = this.reset.bind(this);
  }

  updateScore(scored = this.increments){
    let points = document.getElementById("score-points");
    points.innerHTML = (parseInt(points.innerHTML) + scored).toString();
    this.score += scored;
  }

  reset(){
    this.score = 0;
    let points = document.getElementById("score-points").innerHTML = 0;
    return this;
  }
}

module.exports = Score;
