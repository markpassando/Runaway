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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__player_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__key_events_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__level_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__render_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__logic_js__ = __webpack_require__(6);







document.addEventListener("DOMContentLoaded", () => {
  const gameCanvas = document.getElementById('canvas');
  const graphics = gameCanvas.getContext('2d');

  // Create Player
  const playerCreation = {
    img: "assets/mario2.png",
    x: 375 - 23,
    y: 0,
    width: 46,
    height: 78
  }
  let player = new __WEBPACK_IMPORTED_MODULE_1__player_js__["a" /* default */](playerCreation);

  //Create Level
  const level = __WEBPACK_IMPORTED_MODULE_3__level_js__["a" /* default */];

  //Event Handler
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__key_events_js__["a" /* default */])(player);

  const mainLoop = () => {
    //Pre Variable Adjustments pan screen based on player
    for (var i = 0; i < level.maxBlock; i++) {
      level.block[i].X += -player.velocity_X;
    }
    player.Y += player.velocity_Y;

    // Game Logic
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__logic_js__["a" /* default */])(player, level);

    //Post Variable Adjustments

    //render graphics
    graphics.clearRect( 0, 0, gameCanvas.width, gameCanvas.height);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__render_js__["a" /* default */])(graphics, level, player);

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
const keyEvents = (player) => {
  document.addEventListener("keydown", (e) => {
    switch (e.keyCode) {
      case 32:
      case 38:
      case 87:
        //  up
        player.isJump = true;
        break
      case 37:
      case 65:
      // debugger
        // left
        player.isLeft = true;
        break
      case 40:
      case 83:
        //  down
        break
      case 39:
      case 68:
        //  right
        player.isRight = true;
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
        player.isJump = false;
        break
      case 37:
      case 65:
        // left
        player.isLeft = false;
        break
      case 40:
      case 83:
        //  down
        break
      case 39:
      case 68:
        //  right
        player.isRight = false;
        break
      default:
        console.log('wrong key')
    }
  });

}

/* harmony default export */ __webpack_exports__["a"] = (keyEvents);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__object_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__objects_falling_block_js__ = __webpack_require__(7);



class Level {
  constructor() {
    this.maxBlock = 15;
    this.block = new Array ();
  }
}

// const generateBlock= (options) => {
//   const { level, num, img, x, y, width, height } = options;
//   for (var i = 0; i < array.length; i++) {
//   }
// }

// Create Static Level One
const levelOne = new Level();

//Initial Platform
for (var i = 0; i < 7; i++) {
  levelOne.block[i] = new __WEBPACK_IMPORTED_MODULE_0__object_js__["a" /* default */]({
    img: "assets/platform.png",
    x: i * 96,
    y: 400,
    width: 96,
    height: 11
  });
}

levelOne.block[6] = new __WEBPACK_IMPORTED_MODULE_0__object_js__["a" /* default */]({
  img: "assets/platform.png",
  x: 768,
  y: 325,
  width: 96,
  height: 11
});

levelOne.block[7] = new __WEBPACK_IMPORTED_MODULE_0__object_js__["a" /* default */]({
  img: "assets/platform.png",
  x: 1200,
  y: 450,
  width: 96,
  height: 11
});

levelOne.block[8] = new __WEBPACK_IMPORTED_MODULE_0__object_js__["a" /* default */]({
  img: "assets/platform.png",
  x: 1460,
  y: 350,
  width: 96,
  height: 11
});

levelOne.block[9] = new __WEBPACK_IMPORTED_MODULE_0__object_js__["a" /* default */]({
  img: "assets/platform.png",
  x: 1200,
  y: 250,
  width: 96,
  height: 11
});

for (var i = 10; i < 14; i++) {
  let j = i - 10;
  levelOne.block[i] = new __WEBPACK_IMPORTED_MODULE_0__object_js__["a" /* default */]({
    img: "assets/platform.png",
    x: 1460 + (j * 96),
    y: 150,
    width: 96,
    height: 11
  });
}


// far block
levelOne.block[14] = new __WEBPACK_IMPORTED_MODULE_1__objects_falling_block_js__["a" /* default */]({
  img: "assets/platform.png",
  x: 600,
  y: 300,
  width: 96,
  height: 11
});

/* harmony default export */ __webpack_exports__["a"] = (levelOne);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const render = (graphics, level, player) => {
  for (var i = 0; i < level.maxBlock; i++) {
    graphics.drawImage(level.block[i].sprite, level.block[i].X, level.block[i].Y);
  }
  graphics.drawImage(player.sprite, player.X, player.Y);
}

/* harmony default export */ __webpack_exports__["a"] = (render);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__object_js__ = __webpack_require__(1);


class Player extends __WEBPACK_IMPORTED_MODULE_0__object_js__["a" /* default */] {
  constructor(options) {
    super(options);

    this.isLeft = false;
    this.isRight = false;
    this.isJump = false;
    this.canJump = false;
    this.gravity = 20;
    this.weight = 0.1;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Player);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const logic = (player, level) => {
  //Move Left & Right
  if (player.isLeft) player.velocity_X = -3;
  if (player.isRight) player.velocity_X = 3;

  if (player.Y > 500) {
    console.log("you lose");
    // player.Y = 0;
    // player.X = 375 - 23;
  }
  // FallingBlock
  if (player.isColliding(level.block[14]) && player.Y + player.height < level.block[14].Y + player.velocity_Y) {
    level.block[14].gravity = 50;
    level.block[14].weight = 1;
    if (level.block[14].velocity_Y < level.block[14].gravity) level.block[14].velocity_Y += level.block[14].weight;
    player.velocity_Y = 0;
    player.canJump = true;
  }
  level.block[14].Y += level.block[14].velocity_Y;

  // Stand on Platform
  if (!player.isLeft && !player.isRight && player.velocity_Y === 0) player.velocity_X = 0;

  // Fall velocity with weight
  if (player.velocity_Y < player.gravity) player.velocity_Y += player.weight;

  // Collision, Falling off block objects
  for (var i = 0; i < level.maxBlock; i++) {
    if (player.isColliding(level.block[i]) && player.Y + player.height < level.block[i].Y + player.velocity_Y) {
      player.Y = level.block[i].Y - player.height;
      player.velocity_Y = 0;
    }
  }

  //Jump
  if (player.isJump && player.velocity_Y === 0 || player.isJump && player.canJump) {
    player.velocity_Y = -4.5;
    player.canJump = false;
  }



}

/* harmony default export */ __webpack_exports__["a"] = (logic);


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__object_js__ = __webpack_require__(1);


class FallingBlock extends __WEBPACK_IMPORTED_MODULE_0__object_js__["a" /* default */] {
  constructor(options){
    super(options);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (FallingBlock);


/***/ })
/******/ ]);