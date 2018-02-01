const Game = require("./game");
const Fruit = require("./fruit");
const Sound = require("./sound");

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
    const startButton = document.getElementById("start-button");
    startButton.addEventListener("click", () => {
      const game = new Game(stage, queue, sounds);
      const startGameMenu = document.getElementById("start-game-wrapper");
      startGameMenu.style.display = 'none';

      const playAgainButton = document.getElementById("play-button");
      playAgainButton.addEventListener("click", ()=> {
        game.reset();
        const gameOverMenu = document.getElementById("game-over-wrapper");
        gameOverMenu.style.display = 'none';
      });
    });
  });


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
