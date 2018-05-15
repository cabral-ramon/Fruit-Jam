const Game = require("./game");
const Fruit = require("./fruit");
const Sound = require("./sound");
var $ = require("jquery");

document.addEventListener("DOMContentLoaded", () => {
  //preloads content (images)
  let queue = new createjs.LoadQueue(true);

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
    let startButton = document.getElementById("start-button");
    startButton.addEventListener("click", () => {
      const game = new Game(stage, queue, sounds);
      let startGameMenu = document.getElementById("start-game-wrapper");
      startGameMenu.style.display = 'none';

      const playAgainButton = document.getElementById("play-button");
      playAgainButton.addEventListener("click", ()=> {
        game.reset();
        const gameOverMenu = document.getElementById("game-over-wrapper");
        gameOverMenu.style.display = 'none';
      });
    });
  });

  $('#mute-btn').click( () => {
    $('#mute-btn').toggle('display');
    $('#sound-btn').toggle('display');
    sounds.backgroundMusic.play();
  });
  $('#sound-btn').click( () => {
    $('#mute-btn').toggle('display');
    $('#sound-btn').toggle('display');
    sounds.backgroundMusic.stop();
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
