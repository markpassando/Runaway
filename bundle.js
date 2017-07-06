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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__object_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__key_events_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__level_js__ = __webpack_require__(3);




document.addEventListener("DOMContentLoaded", () => {
  const gameCanvas = document.getElementById('canvas');
  let graphics = gameCanvas.getContext('2d');

  const playerCreation = {
    img: "assets/mario2.png",
    x: 375 - 23,
    y: 0,
    width: 46,
    height: 78
  }
  let player = new __WEBPACK_IMPORTED_MODULE_0__object_js__["a" /* default */](playerCreation);



  //Events
  let isLeft = false;
  let isRight = false;
  let isJump = false;
  player.gravity = 20;
  player.weight = 0.1;

// keyEvents();
  // Jump
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
      // debugger
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

  //Let go of jump
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
    const level = __WEBPACK_IMPORTED_MODULE_2__level_js__["a" /* default */];
    //Pre Variable Adjustments pan screen based on player
    debugger
    for (var i = 0; i < level.maxBlock; i++) {
      level.block[i].X += -player.velocity_X;
    }

    // player.X += player.velocity_X;
    player.Y += player.velocity_Y;

    //Logic
    if (isLeft) player.velocity_X = -3;
    if (isRight) player.velocity_X = 3;
    if (!isLeft && !isRight && player.velocity_Y === 0) player.velocity_X = 0;

    // fall velocity with weight
    if (player.velocity_Y < player.gravity) player.velocity_Y += player.weight;

    // falling off block objects
    for (var i = 0; i < level.maxBlock; i++) {
      if (player.isColliding(level.block[i]) && player.Y + player.height < level.block[i].Y + player.velocity_Y) {
        player.Y = level.block[i].Y - player.height;
        player.velocity_Y = 0;
      }
    }

    //jump logic
    if (isJump && player.velocity_Y === 0) {
      player.velocity_Y = -4.5;
    }

    //Post Variable Adjustments

    //render blocks
    graphics.clearRect( 0, 0, gameCanvas.width, gameCanvas.height);
    for (var i = 0; i < level.maxBlock; i++) {
      graphics.drawImage(level.block[i].sprite, level.block[i].X, level.block[i].Y);
    }
    graphics.drawImage(player.sprite, player.X, player.Y);


    setTimeout(mainLoop, 1000/60);
  };
  mainLoop();

});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Object {
  constructor(options) {
    const { img, x, y, width, height } = options;

    this.sprite = new Image();
    this.sprite.src = img;
    this.width = width;
    this.height = height;
    this.X = x;
    this.Y = y;
    this.previous_X;
    this.previous_Y;
    
    this.velocity_X = 0;
    this.velocity_Y = 0;
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

/* harmony default export */ __webpack_exports__["a"] = (Object);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const keyEvents = (isLeft, isRight, isJump) => {
  debugger
  // Jump
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
      // debugger
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

  //Let go of jump
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
}

/* unused harmony default export */ var _unused_webpack_default_export = (keyEvents);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__object_js__ = __webpack_require__(1);


class Level {
  constructor() {
    this.maxBlock = 10;
    this.block = new Array ();
  }
}

// Create Static Level One
const levelOne = new Level();

//Initial Platform
for (var i = 0; i < 9; i++) {
  levelOne.block[i] = new __WEBPACK_IMPORTED_MODULE_0__object_js__["a" /* default */]({
    img: "assets/platform.png",
    x: i * 96,
    y: 400,
    width: 96,
    height: 11
  });
}

//far block
levelOne.block[9] = new __WEBPACK_IMPORTED_MODULE_0__object_js__["a" /* default */]({
  img: "assets/platform.png",
  x: 600,
  y: 300,
  width: 96,
  height: 11
});

/* harmony default export */ __webpack_exports__["a"] = (levelOne);


/***/ })
/******/ ]);