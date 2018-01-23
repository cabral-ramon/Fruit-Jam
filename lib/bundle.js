/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

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

}

module.exports = Fruit;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(2);
const Fruit = __webpack_require__(0);
const Sound = __webpack_require__(3);

document.addEventListener("DOMContentLoaded", () => {
  //preloads content (images)
  const queue = new createjs.LoadQueue(true);

  //canvas
  const stage = new createjs.Stage("game-canvas");

  //load images
  loadImages(queue);

  createjs.Ticker.setFPS(30);
  createjs.Ticker.addEventListener("tick", stage);

  sounds = new Sound("../assets/sounds/effect1.mp3");

  //once the files have loaded, creates a new game
  queue.on('complete', () => {
    const game = new Game(stage, queue, sounds);
  }, this);

});

function loadImages(queue) {
  queue.loadFile({id: 'apple', src: './assets/images/apple2.png'});
  queue.loadFile({id: 'banana', src: './assets/images/banana2.png'});
  queue.loadFile({id: 'cherry', src: './assets/images/cherry2.png'});
  queue.loadFile({id: 'lemon', src: './assets/images/lemon2.png'});
  queue.loadFile({id: 'orange', src: './assets/images/orange2.png'});
  queue.loadFile({id: 'pineapple', src: './assets/images/pineapple2.png'});
  queue.loadFile({id: 'strawberry', src: './assets/images/strawberry2.png'});
  queue.loadFile({id: 'watermelon', src: './assets/images/watermelon2.png'});
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Fruit = __webpack_require__(0);

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


/***/ }),
/* 3 */
/***/ (function(module, exports) {

function Sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    };
    this.stop = function(){
        this.sound.pause();
    };
}

module.exports = Sound;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map