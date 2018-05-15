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

    this.updatePos = this.updatePos.bind(this);
    this.fadeOut = this.fadeOut.bind(this);

  }

  updatePos(otherFruit) {
    this.row = otherFruit.row;
    this.col = otherFruit.col;
    this.x = otherFruit.x;
    this.y = otherFruit.y;
    this.fruitItem.x = this.x;
    this.fruitItem.y = this.y;
    return this;
  }

  fadeOut() {
    createjs.Tween.get(this.fruitItem)
    .wait(500)
    .to({alpha: 0});
  }

}

module.exports = Fruit;
