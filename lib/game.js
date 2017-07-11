import gameObject from './objects/gameObject.js';
import Player from './objects/player.js';
import { keyEvents, removeEvents } from './key_events.js';
import generateLevelOne from './objects/level.js';
import render from './render.js';
import logic from './logic.js';

document.addEventListener("DOMContentLoaded", () => {
  // sound
  // const thanksWill = new Audio('assets/runaway.mp3');
  // thanksWill.volume = .5;
  // if (typeof thanksWill.loop == 'boolean')
  // {
  //     thanksWill.loop = true;
  // }
  // else
  // {
  //     thanksWill.addEventListener('ended', function() {
  //         this.currentTime = 0;
  //         this.play();
  //     }, false);
  // }
  // thanksWill.play();

  const gameCanvas = document.getElementById('canvas');
  const graphics = gameCanvas.getContext('2d');

  // Create Player
  const playerCreation = {
    img: "assets/grid-sprite.png",
    x: 220,
    y: 0,
    width: 46,
    height: 94
  }

  let player = new Player(playerCreation);

  //Create Level
  let level = generateLevelOne();

  function retry() {
    gameCanvas.removeEventListener("click", retry, true);
    player.velocity_X = 0;
    player.Y = 0;
    player.X = 220;
    level = generateLevelOne();
    for (var i = 0; i < level.numBlocks(); i++) {
      graphics.drawImage(level.blocks[i].sprite, level.blocks[i].X, level.blocks[i].Y);
    }
    document.body.classList.toggle('death');
    mainLoop();
  }

  const welcome = () => {
    let base_image = new Image();
    base_image.src = 'assets/start-game.jpg';
    base_image.onload = function(){
      graphics.drawImage(base_image, 0, 0);
    }

    gameCanvas.addEventListener("click", splashControls, true);

  }

  function splashControls() {
    gameCanvas.removeEventListener("click", splashControls, true);
    graphics.clearRect( 0, 0, gameCanvas.width, gameCanvas.height);
    let base_image = new Image();
    base_image.src = 'assets/splash-controls.jpg';
    base_image.onload = function(){
      graphics.drawImage(base_image, 0, 0);
    }

    gameCanvas.addEventListener("click", splashIntro, true);
  }

  function splashIntro() {
    gameCanvas.removeEventListener("click", splashIntro, true);
    graphics.clearRect( 0, 0, gameCanvas.width, gameCanvas.height);
    let base_image = new Image();
    base_image.src = 'assets/splash-crying-kim.png';
    base_image.onload = function(){
      graphics.drawImage(base_image, 0, 0);
    }
    setTimeout(mainLoop, 2000);
  }

  function splashRetry() {
    document.body.classList.toggle('death');
    graphics.clearRect( 0, 0, gameCanvas.width, gameCanvas.height);
    let base_image = new Image();
    base_image.src = 'assets/splash-retry.jpg';
    base_image.onload = function(){
      graphics.drawImage(base_image, 0, 0);
    }
    gameCanvas.addEventListener("click", retry, true);
  }

  function ending() {

    let base_image = new Image();
    base_image.src = 'assets/splash-ending.jpg';
    base_image.onload = function(){
      graphics.drawImage(base_image, 0, 0);
    }
    let credits_Y = 0;
    function rollCredits() {
      graphics.clearRect( 0, 0, gameCanvas.width, gameCanvas.height);
        graphics.drawImage(base_image, 0, credits_Y);
      credits_Y -= .6;
      setTimeout(rollCredits, 1000/60);
    }

    rollCredits();
  }

  //TEMP kim end game object
  const kimCreation = {
    img: "assets/kim.png",
    x: 600,
    y: 280,
    width: 48,
    height: 121
  }
  let kim = new gameObject(kimCreation);

  //Event Handler
  keyEvents(player);

  const mainLoop = () => {
    gameCanvas.removeEventListener("click", mainLoop, true);
    //TEMP KIM
    // kim.X += -player.velocity_X;
    // Move objects in relation to Player
    level.blocks.forEach( block => {
      block.X += -player.velocity_X;
    });

    player.Y += player.velocity_Y;

    // Game Logic
    logic(player, level, frames);

    // Render graphics
    graphics.clearRect( 0, 0, gameCanvas.width, gameCanvas.height);

    // TEMP render kim
    // graphics.drawImage(kim.sprite, kim.X, kim.Y);

    render(graphics, level, player);

    var frames = setTimeout(mainLoop, 1000/60);

    if (player.isColliding(kim)) {
      clearTimeout(frames);
      ending();
    }

    // Player Death
    if (player.Y > 500) {
      clearTimeout(frames);
      splashRetry();
    }
  };
  welcome();

});
