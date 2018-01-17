const Fruit = require('./fruit');

const DIM_Y = 700;
const DIM_X = 800;
const BACKGROUND_COLOR = "white";

class Game {
  constructor(ctx){
    this.fruits = [];
    this.generateFruits();
    this.draw = this.draw.bind(this);
    this.ctx = ctx;
  }

  generateFruits(){
    this.fruits.push( new Fruit(50,50, "assets/images/apple.png"));
  }

  draw() {
    this.ctx.clearRect(0, 0, DIM_X, DIM_Y);
    this.ctx.fillStyle = BACKGROUND_COLOR;
    this.ctx.fillRect(0, 0, DIM_X, DIM_Y);

    this.fruits.forEach( (fruit) => {
      var img = new Image();
      img.onload = () => {
        this.ctx.drawImage(img, 50, 50);
      };

      ctx.drawImage(img, 0, 0);
    });
    requestAnimationFrame(this.draw);
  }
}

module.exports = Game;
