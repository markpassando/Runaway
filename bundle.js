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
    constructor(img, x, y) {
      this.Sprite = new Image();
      this.Sprite.src = img;
      this.X = x;
      this.Y = y;
      this.Previous_X;
      this.Previous_Y;
      this.Velocity_X = 0;
      this.Velocity_Y = 0;
    }

  }

  const gameCanvas = document.getElementById('canvas');
  let graphics = gameCanvas.getContext('2d');
  let player = new Object("assets/spiderman.gif", 100, 100);




  //Events
  let isLeft = false;
  let isRight = false;

  document.addEventListener("keydown", (e) => {
    switch (e.keyCode) {
     case 38:
      //  up
       break
     case 37:
        // left
        isLeft = true;
       break
     case 40:
      //  down
       break
     case 39:
      //  right
       isRight = true;
       break
     default:
       console.log('wrong key')
    }
  });

  document.addEventListener("keyup", (e) => {
    switch (e.keyCode) {
     case 38:
      //  up
       break
     case 37:
        // left
        isLeft = false;
       break
     case 40:
      //  down
       break
     case 39:
      //  right
       isRight = false;
       break
     default:
       console.log('wrong key')
    }
  });


  const mainLoop = () => {
    //Pre Variable Adjustments
    player.X += player.Velocity_X;
    player.Y += player.Velocity_Y;

    //Logic
    if (isLeft) player.Velocity_X = -3;
    if (isRight) player.Velocity_X = 3;
    if (!isLeft && !isRight) player.Velocity_X = 0;
    //Post Variable Adjustments

    //render
    graphics.clearRect(0,0,gameCanvas.width, gameCanvas.height);
    graphics.drawImage(player.Sprite, player.X, player.Y);

    setTimeout(mainLoop, 1000/60);
  };
  mainLoop();

});


/***/ })
/******/ ]);