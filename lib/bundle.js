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

  const sounds = {
    effect1: new Sound("./assets/sounds/effect1.mp3"),
    backgroundMusic: new Sound("./assets/sounds/background.wav"),
    gameOver: new Sound("./assets/sounds/gameover.wav")
  };

  queue.on('complete', () => {
    const game = new Game(stage, queue, sounds);
    const playButton = document.getElementById("play-button");
    playButton.addEventListener("click", ()=> {
      game.reset();
      let gameOverMenu = document.getElementById("game-over-wrapper");
      gameOverMenu.style.display = 'none';
    });
  }, this);

  const muteButton = document.getElementById("mute-btn");
  const soundButton = document.getElementById("sound-btn");

  muteButton.addEventListener("click", ()=> {
    sounds.backgroundMusic.stop();
  });

  soundButton.addEventListener("click", ()=> {
    sounds.backgroundMusic.play();
  });


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
const Score = __webpack_require__(4);
const Board = __webpack_require__(5);
const Timer = __webpack_require__(6);

const DIM_Y = 600;
const DIM_X = 600;
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
const NUM_ROW = 6;
const NUM_COL = 6;
const FRUIT_Y = DIM_Y / NUM_ROW;
const FRUIT_X = DIM_X / NUM_COL;

class Game {
  constructor(stage, queue, sounds){
    this.stage = stage;
    this.queue = queue;
    this.sounds = sounds;
    this.score = new Score();
    this.board = new Board(NUM_COL, NUM_ROW);
    this.time = new Timer(sounds);
    this.time.updateTimer();
    this.gameStarted = false;
    this.generateAllFruits();
    this.fruitSelected = null;
    this.sounds.backgroundMusic.play();
    this.sounds.backgroundMusic.loop();

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
        this.generateFruit(i, j);
      }
    }
  }

  generateFruit(row, col){
    const type = IMAGES[Math.floor(Math.random() * NUM_ROW)].type;
    const fruit = new Fruit(row, col, type, this.queue);
    this.stage.addChild(fruit.fruitItem);
    fruit.fruitItem.addEventListener('click', this.handleClick(fruit));
    this.board[fruit.row][fruit.col] = fruit;
    return fruit;
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
          if (this.gameStarted) this.score.updateScore();
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
          if (this.gameStarted) this.score.updateScore();
          this.findMatches();
        }
      }
    }
  }

  generateNewFruits(fruits){
    fruits.forEach( (fruit) => {
      fruit.fadeOut();
      this.stage.removeChild(fruit.fruitItem);
    });
    this.sounds.effect1.play();
    fruits.forEach( (fruit) => {
      this.generateFruit(fruit.row, fruit.col);
    });
    if (this.isGameOver()) {
      window.alert("GAME OVER!");
    }
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
      this.gameStarted = true;
    } else {
      // window.alert("invalid move");
      //display an error somehow...
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

  isGameOver(){
    for (let i = 0; i < this.board.length; i++) {
      if (i === 0 || i === NUM_COL) continue;
      for(let j = 0; j < this.board.length; j++) {
        if (j === 0 || j === NUM_COL) continue;

        let arr = [
          this.board[i - 1][j - 1], this.board[i][j - 1], this.board[i + 1][j - 1],
          this.board[i - 1][j], this.board[i][j], this.board[i + 1][j],
          this.board[i - 1][j + 1], this.board[i][j + 1], this.board[i + 1][j + 1]
        ];

        let fruits = {};

        arr.forEach( (fruit) => {
          if (fruit) {
            fruits[fruit.type] = fruits[fruit.type] ? fruits[fruit.type] + 1 : 1;
          }
        });

        let values = Object.values(fruits);
        if (values.some( (val) => val >= 3)) {
          return false;
        }

      }
    }
    return true;
  }

  reset(){
    this.stage.removeAllChildren();
    this.score = this.score.reset();
    this.board = new Board(NUM_COL, NUM_ROW);
    this.time = new Timer(this.sounds);
    this.time.reset();
    this.time.updateTimer();
    this.gameStarted = false;
    this.generateAllFruits();
    this.fruitSelected = null;
    this.sounds.backgroundMusic.play();
    this.sounds.backgroundMusic.loop();
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
    this.loop = function(){
        this.sound.loop = true;
    };
}

module.exports = Sound;


/***/ }),
/* 4 */
/***/ (function(module, exports) {


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


/***/ }),
/* 5 */
/***/ (function(module, exports) {

class Board {

  constructor(NUM_COL, NUM_ROW){
    let board = new Array(NUM_COL);
    for (let i = 0; i < NUM_ROW; i++) {
      board[i] = new Array(NUM_ROW);
    }
    return board;
  }
}

module.exports = Board;


/***/ }),
/* 6 */
/***/ (function(module, exports) {

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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map