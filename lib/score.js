
class Score {
  constructor(score = 0, increments = 100){
    this.score = score;
    this.increments = 100;
  }

  updateScore(scored = this.increments){
    let points = document.getElementById("score-points");
    points.innerHTML = (parseInt(points.innerHTML) + scored).toString();
    this.score += scored;
  }
}

module.exports = Score;
