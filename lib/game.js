const Fruit = require('./fruit');

const DIM_Y = 800;
const DIM_X = 800;
const BACKGROUND_COLOR = "white";
const IMAGES = [
  {url: 'assets/images/apple2.png', type: 'apple'},
  {url: 'assets/images/banana2.png', type: 'banana'},
  {url: 'assets/images/cherry2.png', type: 'cherry'},
  {url: 'assets/images/lemon2.png', type: 'lemon'},
  {url: 'assets/images/orange2.png', type: 'orange'},
  {url: 'assets/images/pineapple2.png', type: 'pineapple'},
  {url: 'assets/images/watermelon2.png', type: 'watermelon'},
  {url: 'assets/images/strawberry2.png', type: 'strawberry'}
];
const NUM_ROW = 8;
const NUM_COL = 8;
const FRUIT_Y = DIM_Y / NUM_ROW;
const FRUIT_X = DIM_X / NUM_COL;

class Game {
  constructor(stage, queue){
    this.stage = stage;
    this.queue = queue;
    this.board = this.generateBoard();
    this.generateAllFruits();
    this.fruitSelected = null;

    this.generateAllFruits = this.generateAllFruits.bind(this);
    this.generateFruit = this.generateFruit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.swapFruits = this.swapFruits.bind(this);

    this.findMatches = this.findMatches.bind(this);
    this.findMatches();
  }

  generateAllFruits(){
    for ( let i = 0; i < NUM_COL; i++) {
      for ( let j = 0; j < NUM_ROW; j++) {
        //create a new fruit
        this.generateFruit(i, j);

      }
    }
  }

  generateFruit(row, col){
    //set the fruit to a random one
    const type = IMAGES[Math.floor(Math.random() * NUM_ROW)].type;
    const fruit = new Fruit(row, col, type, this.queue);
    this.stage.addChild(fruit.fruitItem);
    fruit.fruitItem.addEventListener('click', this.handleClick(fruit.fruitItem));
    this.board[fruit.row][fruit.col] = fruit;
    return fruit;
  }

  generateBoard(){
    let board = new Array(NUM_COL);
    for (let i = 0; i < NUM_ROW; i++) {
      board[i] = new Array(NUM_ROW);
    }
    return board;
  }

  handleClick(fruitItem){
    return (event) => {
      console.log(this.fruitSelected);
      if (this.fruitSelected != null) {
        event.currentTarget.shadow = new createjs.Shadow("#b22c1a", 0, 0, 30);
        this.swapFruits(this.fruitSelected, fruitItem);
        event.currentTarget.shadow = null;
      } else {
        this.fruitSelected = fruitItem;
        event.currentTarget.shadow = new createjs.Shadow("#b22c1a", 0, 0, 30);
      }
    };
  }

  findMatches(){
    //horizonantal matches
    // i is left to right
    for(let i = 0; i < this.board.length - 2; i++) {

      // j is top to bottom
      for(let j = 0; j < this.board[i].length; j++) {
        let currentFruit = this.board[i][j];
        let nextFruit = this.board[i + 1][j];
        let lastFruit = this.board[i + 2][j];
        if (currentFruit.type === nextFruit.type && currentFruit.type === lastFruit.type){
          // console.log(`match of ${currentFruit.type} found`);
          this.generateNewFruits([currentFruit, nextFruit, lastFruit]);
        }
      }
    }
  }

  generateNewFruits(fruits){
    fruits.forEach( (fruit) => {
      window.setTimeout(this.stage.removeChild(fruit.fruitItem), 500);
      console.log(`removed ${fruit.type}`);
    });
    fruits.forEach( (fruit) => {
      window.setTimeout(this.generateFruit(fruit.row, fruit.col), 1000);
      console.log('added a new fruit');
    });
  }

  swapFruits(fruitOne, fruitTwo){
    [fruitOne.x, fruitTwo.x] = [fruitTwo.x, fruitOne.x];
    [fruitOne.y, fruitTwo.y] = [fruitTwo.y, fruitOne.y];
    this.fruitSelected.shadow = null;
    this.fruitSelected = null;
  }

  validMove(){
    
  }

}

module.exports = Game;
