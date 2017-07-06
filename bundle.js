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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/***/ (function(module, exports) {

// import Game from './game.js'

document.addEventListener("DOMContentLoaded", () => {
  // const gameCanvas = document.getElementById('canvas');
  // gameCanvas.width = Game.DIM_X;
  // gameCanvas.height = Game.DIM_Y;
  //
  // const ctx = gameCanvas.getContext('2d');
  // const game = new Game();
  // new GameView(game, ctx).start();
  // ctx.fillStyle = 'green';
  // ctx.fillRect(10, 350, 20, 40);
  class Object {
    constructor(img, x, y, width, height) {
      this.Sprite = new Image();
      this.Sprite.src = img;
      this.X = x;
      this.Y = y;

      this.width = width;
      this.height = height;
      this.Previous_X;
      this.Previous_Y;

      this.Velocity_X = 0;
      this.Velocity_Y = 0;

      this.gravity = 0;
      this.weight = 0;

    }

    isColliding(obj) {
      if (this.X > obj.X + obj.width) return false;
      if (this.X + this.width < obj.X) return false;
      if (this.Y > obj.Y + obj.height) return false;
      if (this.Y + this.height < obj.Y) return false;
      return true;
    }
  }

  const gameCanvas = document.getElementById('canvas');
  let graphics = gameCanvas.getContext('2d');
  let player = new Object("assets/mario2.png", 450 - 52, 0, 46, 78);

  //create blocks
  let maxBlock = 5;
  const block = new Array ();
  for (var i = 0; i < 4; i++) {
    block[i] = new Object("assets/platform.png", i * 96, 400, 96, 11);
  }

  //far block
  block[4] = new Object("assets/platform.png", 600, 300, 96, 11);

  //Events
  let isLeft = false;
  let isRight = false;
  let isJump = false;
  player.gravity = 20;
  player.weight = 0.1;


  document.addEventListener("keydown", (e) => {
    switch (e.keyCode) {
    case 32:
     case 38:
     case 87:
      //  up
      isJump = true;
       break
     case 37:
     case 65:
        // left
        isLeft = true;
       break
     case 40:
     case 83:
      //  down
       break
     case 39:
     case 68:
      //  right
       isRight = true;
       break
     default:
       console.log('wrong key')
    }
  });

  document.addEventListener("keyup", (e) => {
    switch (e.keyCode) {
      case 32:
     case 38:
     case 87:
      //  up
      isJump = false;
       break
     case 37:
     case 65:
        // left
        isLeft = false;
       break
     case 40:
     case 83:
      //  down
       break
     case 39:
     case 68:
      //  right
       isRight = false;
       break
     default:
       console.log('wrong key')
    }
  });


  const mainLoop = () => {
    //Pre Variable Adjustments pan screen based on char
    for (var i = 0; i < maxBlock; i++) {
      block[i].X += -player.Velocity_X;
    }
    // player.X += player.Velocity_X;
    player.Y += player.Velocity_Y;

    //Logic
    if (isLeft) player.Velocity_X = -3;
    if (isRight) player.Velocity_X = 3;
    if (!isLeft && !isRight && player.Velocity_Y === 0) player.Velocity_X = 0;

    // fall velocity with weight
    if (player.Velocity_Y < player.gravity) player.Velocity_Y += player.weight;

    // falling off block objects
    for (var i = 0; i < maxBlock; i++) {
      if (player.isColliding(block[i]) && player.Y + player.height < block[i].Y + player.Velocity_Y) {
        player.Y = block[i].Y - player.height;
        player.Velocity_Y = 0;
      }
    }

    //jump logic
    if (isJump && player.Velocity_Y === 0) {
      player.Velocity_Y = -5;
    }

    //Post Variable Adjustments

    //render blocks
    graphics.clearRect(0,0,gameCanvas.width, gameCanvas.height);
    for (var i = 0; i < maxBlock; i++) {
      graphics.drawImage(block[i].Sprite, block[i].X, block[i].Y);
    }
    graphics.drawImage(player.Sprite, player.X, player.Y);


    setTimeout(mainLoop, 1000/60);
  };
  mainLoop();

});


/***/ })
/******/ ]);