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

  sounds = new Sound("../assets/sounds/effect1.mp3");

  //once the files have loaded, creates a new game
  queue.on('complete', () => {
    const game = new Game(stage, queue, sounds);
  }, this);

  //background music
  backgroundMusic = new Sound("../assets/sounds/background.wav");
  backgroundMusic.play();
  backgroundMusic.loop();


  const muteButton = document.getElementById("mute-btn");
  const soundButton = document.getElementById("sound-btn");

  muteButton.addEventListener("click", ()=> {
    backgroundMusic.stop();
  });

  soundButton.addEventListener("click", ()=> {
    backgroundMusic.play();
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
