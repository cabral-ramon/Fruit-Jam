// const COORDS = [15, 75, 135, 195, 255, 315, 375, 435];
// const X_POS = [0, 50, 100, 150, 200, 250, 300, 350];
// const Y_POS = [0, 50, 100, 150, 200, 250, 300, 350];
const X_POS = [0, 100, 200, 300, 400, 500, 600, 700];
const Y_POS = [0, 100, 200, 300, 400, 500, 600, 700];

class Fruit {

  constructor(row, col, type, queue){
    this.row = row;
    this.col = col;
    this.type = type;

    this.x = X_POS[this.row];
    this.y = Y_POS[this.col];
    const fruitItem = new createjs.Bitmap(queue.getResult(type));

    fruitItem.x = this.x;
    fruitItem.y = this.y;

    this.queue = queue;
    this.fruitItem = fruitItem;
  }

}

module.exports = Fruit;
