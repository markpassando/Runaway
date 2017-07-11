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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const keyEvents = (player) => {
  document.addEventListener("keydown", keyDownEvents, true );

  function keyDownEvents(e) {
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
      }
  }

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
/* harmony export (immutable) */ __webpack_exports__["a"] = keyEvents;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__objects_level_js__ = __webpack_require__(9);


const logic = (player, level, frames) => {
  //Move Left & Right
  if (player.isLeft) player.velocity_X = -3;
  if (player.isRight) player.velocity_X = 3;
  player.distance += player.velocity_X;
  // console.log(player.distance);

  // Stand on Platform
  if (!player.isLeft && !player.isRight && player.velocity_Y === 0) player.velocity_X = 0;

  // Fall velocity with weight
  if (player.velocity_Y < player.gravity) player.velocity_Y += player.weight;

  //Platform Collision
  // Regular Blocks, Falling off block objects
  const platformBlocks = level.platformBlocks();
  platformBlocks.forEach( block => {
    if (player.isColliding(block) && player.Y + player.height < block.Y + player.velocity_Y) {
      player.Y = block.Y - player.height;
      player.velocity_Y = 0;
    }
  });

  //Falling Blocks
  const fallingBlocks = level.fallingBlocks();
  fallingBlocks.forEach( block => {
    if (player.isColliding(block) && player.Y + player.height < block.Y + player.velocity_Y) {
      block.gravity = 50;
      block.weight = 1;
      if (block.velocity_Y < block.gravity) block.velocity_Y += block.weight;
      player.velocity_Y = 0;
      player.canJump = true;
    }
    block.Y += block.velocity_Y;
  });

  //Spring Blocks
  const springBlocks = level.springBlocks();
  springBlocks.forEach( block => {
    if (player.isColliding(block) && player.Y + player.height < block.Y + player.velocity_Y) {
      player.Y = block.Y - player.height;
      player.velocity_Y = 0;
      player.springJump = true;
    }
  });

  //Jump
  if (player.isJump && player.velocity_Y === 0 || player.isJump && player.canJump) {
    player.velocity_Y = -4.5;
    player.canJump = false;
  }

  //Spring Jump
  if (player.springJump) {
    player.velocity_Y = -7;
    player.springJump = false;
  }


}

/* harmony default export */ __webpack_exports__["a"] = (logic);


/***/ }),
/* 4 */,
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// import gameObject from './object.js'``;

const render = (graphics, level, player) => {

  // debugger
  for (var i = 0; i < level.numBlocks(); i++) {
    graphics.drawImage(level.blocks[i].sprite, level.blocks[i].X, level.blocks[i].Y);
  }
  // graphics.drawImage(player.sprite, player.X, player.Y);
  if (this.velocity_X === 0 && this.velocity_Y === 0) {

  } else if (player.velocity_X !== 0) {
    player.spriteAnimCounter += .2;
  }
  player.draw(graphics);

}

/* harmony default export */ __webpack_exports__["a"] = (render);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__objects_gameObject_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__objects_player_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__key_events_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__objects_level_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__render_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__logic_js__ = __webpack_require__(3);







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

  let player = new __WEBPACK_IMPORTED_MODULE_1__objects_player_js__["a" /* default */](playerCreation);

  //Create Level
  let level = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__objects_level_js__["a" /* default */])();

  function retry() {
    gameCanvas.removeEventListener("click", retry, true);
    player.velocity_X = 0;
    player.Y = 0;
    player.X = 220;
    level = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__objects_level_js__["a" /* default */])();
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
  let kim = new __WEBPACK_IMPORTED_MODULE_0__objects_gameObject_js__["a" /* default */](kimCreation);

  //Event Handler
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__key_events_js__["a" /* keyEvents */])(player);

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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__logic_js__["a" /* default */])(player, level, frames);

    // Render graphics
    graphics.clearRect( 0, 0, gameCanvas.width, gameCanvas.height);

    // TEMP render kim
    // graphics.drawImage(kim.sprite, kim.X, kim.Y);

    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__render_js__["a" /* default */])(graphics, level, player);

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


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__gameObject_js__ = __webpack_require__(8);


class Block extends __WEBPACK_IMPORTED_MODULE_0__gameObject_js__["a" /* default */] {
  constructor(options){
    super(options);

    this.type = options.type;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Block);


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class gameObject {
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

/* harmony default export */ __webpack_exports__["a"] = (gameObject);


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__gameObject_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__block_js__ = __webpack_require__(7);



class Level {
  constructor() {
    this.blocks = new Array ();

    // this.blocks = this.blocks.bind(this);
  }

  clear() {
    return this.blocks = [];
  }

  numBlocks() {
    return this.blocks.length;
  }

  platformBlocks() {
    return this.blocks.filter(block => block.type === "platform");
  }

  fallingBlocks() {
    return this.blocks.filter(block => block.type === "falling");
  }

  springBlocks() {
    return this.blocks.filter(block => block.type === "spring");
  }
}

const generateBlock = (options) => {
  let defaultOptions = {
    type: "platform",
    num: 1,
    space: null
  };
  let newOptions = Object.assign(defaultOptions, options);

  const { level, num, img, x, y, width, height, type, space } = newOptions;

  let totalWidth = 0;
  for (var i = 1; i <= num; i++) {
    level.blocks.push(new __WEBPACK_IMPORTED_MODULE_1__block_js__["a" /* default */]({
      img: img,
      x: x + (totalWidth),
      y: y,
      width: width,
      height: height,
      type: type
    }));

    totalWidth += width + space
  }
}

// Create Static Level One


const generateLevelOne = () => {
  const levelOne = new Level();
  //flat stage
  generateBlock({
    level: levelOne,
    img: "assets/platform.png",
    num: 6,
    x: 96,
    y: 400,
    width: 96,
    height: 11
  });

  //staggering
  generateBlock({
    level: levelOne,
    img: "assets/platform.png",
    num: 1,
    x: 768,
    y: 325,
    width: 96,
    height: 11
  });

  generateBlock({
    level: levelOne,
    img: "assets/platform.png",
    x: 768,
    y: 325,
    width: 96,
    height: 11
  });

  generateBlock({
    level: levelOne,
    img: "assets/platform.png",
    x: 1200,
    y: 450,
    width: 96,
    height: 11
  });

  generateBlock({
    level: levelOne,
    img: "assets/platform.png",
    x: 1460,
    y: 350,
    width: 96,
    height: 11
  });

  generateBlock({
    level: levelOne,
    img: "assets/platform.png",
    x: 1460,
    y: 350,
    width: 96,
    height: 11
  });

  generateBlock({
    level: levelOne,
    img: "assets/platform.png",
    x: 1200,
    y: 250,
    width: 96,
    height: 11
  });

  //flat stage
  generateBlock({
    level: levelOne,
    img: "assets/platform.png",
    num: 3,
    x: 1460,
    y: 150,
    width: 96,
    height: 11
  });

  //Falling area
  generateBlock({
    level: levelOne,
    img: "assets/falling-platform.png",
    num: 1,
    x: 2000,
    y: 250,
    width: 96,
    height: 11,
    type: "falling",
    space: 270,
    num: 3
  });

  generateBlock({
    level: levelOne,
    img: "assets/spring.png",
    x: 3090,
    y: 420,
    width: 60,
    height: 78,
    type: "spring",
    num: 3,
    space: 390
  });

  // after spring
  generateBlock({
    level: levelOne,
    img: "assets/platform.png",
    x: 4200,
    y: 480,
    width: 96,
    height: 11
  });

  generateBlock({
    level: levelOne,
    img: "assets/platform.png",
    x: 4400,
    y: 480,
    width: 96,
    height: 11
  });

  generateBlock({
    level: levelOne,
    img: "assets/spring.png",
    x: 4600,
    y: 420,
    width: 60,
    height: 78,
    type: "spring",
  });

  generateBlock({
    level: levelOne,
    img: "assets/falling-platform.png",
    num: 1,
    x: 4900,
    y: 350,
    width: 96,
    height: 11,
    type: "falling",
  });

  generateBlock({
    level: levelOne,
    img: "assets/falling-platform.png",
    num: 1,
    x: 5100,
    y: 300,
    width: 96,
    height: 11,
    type: "falling",
  });

  generateBlock({
    level: levelOne,
    img: "assets/falling-platform.png",
    num: 1,
    x: 5400,
    y: 250,
    width: 96,
    height: 11,
    type: "falling",
  });

  //flat stage
  generateBlock({
    level: levelOne,
    img: "assets/platform.png",
    num: 10,
    x: 5600,
    y: 400,
    width: 96,
    height: 11
  });
// debugger
  return levelOne;
}



/* harmony default export */ __webpack_exports__["a"] = (generateLevelOne);


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__gameObject_js__ = __webpack_require__(8);


class Player extends __WEBPACK_IMPORTED_MODULE_0__gameObject_js__["a" /* default */] {
  constructor(options) {
    super(options);

    this.isLeft = false;
    this.isRight = false;
    this.isJump = false;
    this.canJump = false;
    this.springJump = false;
    this.gravity = 100000;
    this.weight = 0.1;
    this.distance = 0;
    this.spriteAnimCounter = 0;
  }

  draw(graphics) {
    const frameWidth = 1875/15;
    const frameHeight = 1250/10;
    let walkingMod = Math.floor(this.spriteAnimCounter) % 8;
    let standingMod = Math.floor(this.spriteAnimCounter) % 6;

    let actionStatus = 0;
    let frameStatus = 0;
    if (this.velocity_X === 0 && this.velocity_Y === 0) {
      // standing
      actionStatus = 0;
      frameStatus = 0;
      // frameStatus = standingMod;
    } else if (this.velocity_Y < 0 || this.velocity_Y > 0) {
      // jumping
      actionStatus = 250;
      frameStatus = 0;
    } else if (this.velocity_X !== 0) {
      // walking
      actionStatus = 125;
      frameStatus = walkingMod;
    }

    // Rotate sprites if going left
    let playerXCoord = this.X - 43;
    if (this.velocity_X < 0) {
      graphics.scale(-1, 1);
      playerXCoord = -playerXCoord - 125;
    }

    graphics.drawImage(this.sprite,
      frameStatus * frameWidth, actionStatus,
      frameWidth, frameHeight,
      playerXCoord, this.Y,
      125, 125
    );

    // Rotate sprites back
    if (this.velocity_X < 0) {
      graphics.scale(-1, 1);
    }
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Player);


/***/ })
/******/ ]);