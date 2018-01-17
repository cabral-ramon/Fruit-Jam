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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(2);



document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("game-canvas");
  ctx = canvas.getContext("2d");
  game = new Game(ctx);
  window.requestAnimationFrame(game.draw);
});


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class Fruit {

  constructor(xpos, ypos, image){
    this.xpos = xpos;
    this.ypos = ypos;
    this.image = image;
  }


}

module.exports = Fruit;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Fruit = __webpack_require__(1);

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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map