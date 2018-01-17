const Game = require("./game");



document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("game-canvas");
  ctx = canvas.getContext("2d");
  game = new Game(ctx);
  window.requestAnimationFrame(game.draw);
});
