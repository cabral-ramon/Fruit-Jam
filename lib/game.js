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
  constructor(stage, queue, sounds){
    this.stage = stage;
    this.queue = queue;
    this.sounds = sounds;
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
    fruit.fruitItem.addEventListener('click', this.handleClick(fruit));
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
      if (this.fruitSelected != null) {
        event.currentTarget.shadow = new createjs.Shadow("#b22c1a", 0, 0, 40);
        this.swapFruits(this.fruitSelected, fruitItem);
        event.currentTarget.shadow = null;
        this.findMatches();
      } else {
        this.fruitSelected = fruitItem;
        event.currentTarget.shadow = new createjs.Shadow("#b22c1a", 0, 0, 40);
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
          this.generateNewFruits([currentFruit, nextFruit, lastFruit]);
          this.findMatches();
        }
      }
    }
    //vertical matches
    // i is top to bottom
    for(let i = 0; i < this.board.length; i++) {

      // j is left to right
      for(let j = 0; j < this.board[i].length - 2; j++) {
        let currentFruit = this.board[i][j];
        let nextFruit = this.board[i][j + 1];
        let lastFruit = this.board[i][j + 2];
        if (currentFruit.type === nextFruit.type && currentFruit.type === lastFruit.type){
          this.generateNewFruits([currentFruit, nextFruit, lastFruit]);
          this.findMatches();
        }
      }
    }

  }

  generateNewFruits(fruits){
    fruits.forEach( (fruit) => {
      fruit.fadeOut();
      window.setTimeout(this.stage.removeChild(fruit.fruitItem), 500);
    });
    this.sounds.play();
    fruits.forEach( (fruit) => {
      window.setTimeout(this.generateFruit(fruit.row, fruit.col), 1000);
    });
  }

  swapFruits(fruitOne, fruitTwo){
    if (this.validMove(fruitOne, fruitTwo)) {

      let holder = {
        row: fruitOne.row,
        col: fruitOne.col,
        x: fruitOne.x,
        y: fruitOne.y,
      };

      let newfruitOne = fruitOne.updatePos(fruitTwo);
      let newfruitTwo = fruitTwo.updatePos(holder);

      this.fruitSelected.fruitItem.shadow = null;
      //update board
      this.board[fruitOne.row][fruitOne.col] = newfruitOne;
      this.board[fruitTwo.row][fruitTwo.col] = newfruitTwo;
      this.fruitSelected = null;
      this.updateScore();
    } else {
      window.alert("invalid move");
      this.fruitSelected.fruitItem.shadow = null;
      this.fruitSelected = null;
    }
  }

  validMove(fruitOne, fruitTwo){
    if (Math.abs(fruitOne.x - fruitTwo.x) <= 100) {
      if (Math.abs(fruitOne.y - fruitTwo.y) <= 100) {
        return true;
      }
    }
    return false;
  }

  updateScore(scored = 100){
    let points = document.getElementById("score-points");
    points.innerHTML = (parseInt(points.innerHTML) + scored).toString();
  }



}

module.exports = Game;
