import gameObject from './object.js';
import Player from './player.js';
import { keyEvents, removeEvents } from './key_events.js';
import generateLevelOne from './level.js';
import render from './render.js';
import logic from './logic.js';

document.addEventListener("DOMContentLoaded", () => {
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
  let gameStatus = true;



  // Create Player
  const playerCreation = {
    img: "assets/grid-sprite.png",
    x: 220,
    y: 0,
    width: 46,
    height: 94
  }
  // height: 76 old height
  let player = new Player(playerCreation);

  //Create Level
  let level = generateLevelOne();

  function splashIntro() {
    gameCanvas.removeEventListener("click", splashIntro, true);
    graphics.clearRect( 0, 0, gameCanvas.width, gameCanvas.height);
    let base_image = new Image();
    base_image.src = 'assets/splash-crying-kim.jpg';
    base_image.onload = function(){
      graphics.drawImage(base_image, 0, 0);
    }
    setTimeout(mainLoop, 2000);
    // document.addEventListener("click", mainLoop, true);
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


  //Event Handler
  keyEvents(player);
  const welcome = () => {
    let base_image = new Image();
    base_image.src = 'assets/start-game.jpg';
    base_image.onload = function(){
      graphics.drawImage(base_image, 0, 0);
    }

    gameCanvas.addEventListener("click", splashControls, true);

  }

  const ending = () => {
    gameStatus = false;

    let base_image = new Image();
    base_image.src = 'assets/splash-ending.jpg';
    base_image.onload = function(){
      graphics.drawImage(base_image, 0, 0);
    }
    let credits_Y = 0;
    const rollCredits = () => {
      graphics.clearRect( 0, 0, gameCanvas.width, gameCanvas.height);
        graphics.drawImage(base_image, 0, credits_Y);
      // debugger
      credits_Y -= .6;
      setTimeout(rollCredits, 1000/60);
    }

    rollCredits();
    // removeEvents();
  }

  //end game temp object
  // const kanyeCreation = {
  //   img: "assets/nightmare-kanye.png",
  //   x: 600,
  //   y: 350,
  //   width: 49,
  //   height: 47
  // }
  // let kanye = new gameObject(kanyeCreation);

  const mainLoop = () => {
    document.removeEventListener("click", mainLoop, true);
    //Pre Variable Adjustments pan screen based on player
    // kanye.X += -player.velocity_X;
    level.blocks.forEach( block => {
      block.X += -player.velocity_X;
    });

    player.Y += player.velocity_Y;

    // if (player.isColliding(kanye)) {
    //   ending();
    // }



    // Game Logic
    logic(player, level, gameStatus,frames );

    //Post Variable Adjustments

    //render graphics
    graphics.clearRect( 0, 0, gameCanvas.width, gameCanvas.height);


    // graphics.drawImage(kanye.sprite, kanye.X, kanye.Y);

    render(graphics, level, player);

    // clear timeout
    var frames = setTimeout(mainLoop, 1000/60);

    if (player.Y > 500) {

      // level.clear();
      clearTimeout(frames);
      // debugger
      document.body.className = 'death';
      console.log("you lose");
      // graphics.setTransform()
      graphics.clearRect( 0, 0, gameCanvas.width, gameCanvas.height);
      player.velocity_X = 0;
      player.Y = 0;
      player.X = 220;
      // debugger
      level = generateLevelOne();
      for (var i = 0; i < level.numBlocks(); i++) {
        graphics.drawImage(level.blocks[i].sprite, level.blocks[i].X, level.blocks[i].Y);
      }
      mainLoop();
    }
  };
  welcome();
  // mainLoop();
  // start();


});
