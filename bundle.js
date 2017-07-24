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
/* 0 */
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
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__gameObject_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__block_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bullet_js__ = __webpack_require__(7);




class Level {
  constructor() {
    this.blocks = new Array();
    this.enemies = new Array();
    this.maxEnemies = 3;
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

  generateEnemies() {
    while (this.enemies.length < this.maxEnemies) {
      this.enemies.push(new __WEBPACK_IMPORTED_MODULE_2__bullet_js__["a" /* default */]());
    }
  };

  updateEnemies() {
    this.enemies.forEach(enemy => {
      enemy.update();
    })
  }
}

const generateBlock = (options) => {
  let defaultOptions = {
    type: "platform",
    num: 1,
    space: 0
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
};

// Create Level One
const generateLevelOne = () => {
  const levelOne = new Level();
  //flat stage
  generateBlock({
    level: levelOne,
    img: "assets/platform.png",
    num: 6,
    x: 96,
    y: 405,
    width: 96,
    height: 11
  });

  // first fall
  generateBlock({
    level: levelOne,
    img: "assets/falling-platform.png",
    num: 1,
    x: 768,
    y: 325,
    width: 96,
    height: 11,
    type: "falling"
  });

  generateBlock({
    level: levelOne,
    img: "assets/platform.png",
    num: 2,
    x: 875,
    y: 425,
    width: 96,
    height: 11
  });

  generateBlock({
    level: levelOne,
    img: "assets/platform.png",
    x: 1200,
    y: 400,
    width: 96,
    height: 11,
    num: 2
  });

  generateBlock({
    level: levelOne,
    img: "assets/platform.png",
    num: 2,
    x: 1460,
    y: 325,
    width: 96,
    height: 11
  });

  generateBlock({
    level: levelOne,
    img: "assets/platform.png",
    x: 1300,
    y: 250,
    width: 96,
    height: 11
  });

  //flat stage
  generateBlock({
    level: levelOne,
    img: "assets/platform.png",
    num: 6,
    x: 1460,
    y: 150,
    width: 96,
    height: 11
  });

  // springs
  generateBlock({
   level: levelOne,
   img: "assets/spring.png",
   x: 2200,
   y: 420,
   width: 60,
   height: 78,
   type: "spring",
   num: 2
 });

// flat platform
 generateBlock({
   level: levelOne,
   img: "assets/platform.png",
   x: 2400,
   y: 250,
   width: 96,
   height: 11,
   num: 2
 });

 // springs
 generateBlock({
  level: levelOne,
  img: "assets/spring.png",
  x: 2700,
  y: 420,
  width: 60,
  height: 78,
  type: "spring",
  num: 2
});

// fall sequence
generateBlock({
  level: levelOne,
  img: "assets/falling-platform.png",
  num: 1,
  x: 2900,
  y: 200,
  width: 96,
  height: 11,
  type: "falling"
});

generateBlock({
  level: levelOne,
  img: "assets/falling-platform.png",
  num: 1,
  x: 3050,
  y: 275,
  width: 96,
  height: 11,
  type: "falling"
});

generateBlock({
  level: levelOne,
  img: "assets/falling-platform.png",
  num: 1,
  x: 3200,
  y: 350,
  width: 96,
  height: 11,
  type: "falling"
});

generateBlock({
  level: levelOne,
  img: "assets/platform.png",
  num: 2,
  x: 3330,
  y: 425,
  width: 96,
  height: 11
});

//falling to spring
generateBlock({
  level: levelOne,
  img: "assets/falling-platform.png",
  num: 1,
  x: 3600,
  y: 400,
  width: 96,
  height: 11,
  type: "falling"
});

generateBlock({
  level: levelOne,
  img: "assets/spring.png",
  num: 1,
  x: 3800,
  y: 420,
  width: 60,
  height: 78,
  type: "spring"
});

generateBlock({
  level: levelOne,
  img: "assets/platform.png",
  num: 2,
  x: 3900,
  y: 225,
  width: 96,
  height: 11
});



  // Falling area
  generateBlock({
    level: levelOne,
    img: "assets/falling-platform.png",
    num: 1,
    x: 4200,
    y: 250,
    width: 96,
    height: 11,
    type: "falling",
    space: 200,
    num: 3
  });

  generateBlock({
    level: levelOne,
    img: "assets/spring.png",
    x: 5000,
    y: 420,
    width: 60,
    height: 78,
    type: "spring",
    num: 3,
    space: 350
  });

  // after spring
  generateBlock({
    level: levelOne,
    img: "assets/platform.png",
    x: 6000,
    y: 480,
    width: 96,
    height: 11
  });

  generateBlock({
    level: levelOne,
    img: "assets/platform.png",
    x: 6200,
    y: 480,
    width: 96,
    height: 11
  });

  generateBlock({
    level: levelOne,
    img: "assets/spring.png",
    x: 6400,
    y: 420,
    width: 60,
    height: 78,
    type: "spring",
  });

  // +300
  generateBlock({
    level: levelOne,
    img: "assets/falling-platform.png",
    num: 1,
    x: 6600,
    y: 350,
    width: 96,
    height: 11,
    type: "falling",
  });
  //
  generateBlock({
    level: levelOne,
    img: "assets/platform.png",
    num: 1,
    x: 6800,
    y: 300,
    width: 96,
    height: 11
  });

  generateBlock({
    level: levelOne,
    img: "assets/platform.png",
    num: 3,
    x: 7000,
    y: 250,
    width: 96,
    height: 11
  });

  generateBlock({
    level: levelOne,
    img: "assets/falling-platform.png",
    num: 1,
    x: 7296,
    y: 250,
    width: 96,
    height: 11,
    type: "falling"
  });

  generateBlock({
    level: levelOne,
    img: "assets/spring.png",
    num: 1,
    x: 7600,
    y: 420,
    width: 60,
    height: 78,
    type: "spring"
  });

  //flat stage
  generateBlock({
    level: levelOne,
    img: "assets/platform.png",
    num: 10,
    x: 7800,
    y: 400,
    width: 96,
    height: 11
  });
// debugger
  return levelOne;
}

/* harmony default export */ __webpack_exports__["a"] = (generateLevelOne);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__gameObject_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__player_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__level_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sounds_js__ = __webpack_require__(5);





class Game {
  constructor() {
    this.gameCanvas = document.getElementById('canvas');
    this.graphics = this.gameCanvas.getContext('2d');
    this.sounds = new __WEBPACK_IMPORTED_MODULE_3__sounds_js__["a" /* default */]();
    this.level = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__level_js__["a" /* default */])();
    this.player = new __WEBPACK_IMPORTED_MODULE_1__player_js__["a" /* default */]({
      img: "assets/grid-sprite.png",
      x: 220,
      y: 0,
      width: 46,
      height: 94
    });

    // Kim testing coords
    // x: 600,
    // y: 280,

    // Prod coords
    // x: 8500,
    // y: 280,
    this.kim = new __WEBPACK_IMPORTED_MODULE_0__gameObject_js__["a" /* default */]({
      img: "assets/kim.png",
      x: 8500,
      y: 280,
      width: 48,
      height: 121
    });


    this.enemies = this.level.enemies;
    this.level.generateEnemies();

  }

update() {
  this.enemies.forEach(enemy => {
    enemy.X += -this.player.velocity_X;
  });

  // Kim
  this.kim.X += -this.player.velocity_X;
  // Blocks
  this.level.blocks.forEach( block => {
    block.X += -this.player.velocity_X;
  });
  this.player.Y += this.player.velocity_Y;
}

render() {
  // Clear canvas
  this.graphics.clearRect( 0, 0, this.gameCanvas.width, this.gameCanvas.height);

  // Render Life Bar
  for (var i = 0; i < this.player.lives; i++) {
    let base_image = new Image();
    base_image.src = 'assets/heart.png';
    this.graphics.drawImage(base_image, (i * 50) + 10, 10);
  }
  // Render All blocks
  for (var i = 0; i < this.level.numBlocks(); i++) {
    this.graphics.drawImage(this.level.blocks[i].sprite, this.level.blocks[i].X, this.level.blocks[i].Y);
  }

  // Render Enemies
  this.enemies.forEach(enemy => {
    this.graphics.drawImage(enemy.sprite, enemy.X, enemy.Y);
  })

  // Draw Kim
  this.graphics.drawImage(this.kim.sprite, this.kim.X, this.kim.Y);

  // Player Sprites Animation
  if (this.player.velocity_X === 0 && this.player.velocity_Y === 0) {
    // Standing, sprites need work

  } else if (this.player.velocity_X !== 0) {
    // Running
    this.player.spriteAnimCounter += .2;
  }

  //Draw Player
  this.player.draw(this.graphics);
}

}

/* harmony default export */ __webpack_exports__["a"] = (Game);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__gameObject_js__ = __webpack_require__(0);


class Block extends __WEBPACK_IMPORTED_MODULE_0__gameObject_js__["a" /* default */] {
  constructor(options){
    super(options);

    this.type = options.type;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Block);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__gameObject_js__ = __webpack_require__(0);


class Player extends __WEBPACK_IMPORTED_MODULE_0__gameObject_js__["a" /* default */] {
  constructor(options) {
    super(options);

    this.isLeft = false;
    this.isRight = false;
    this.isJump = false;
    this.canJump = false;
    this.springJump = false;
    this.gravity = 100000;
    this.weight = 0.3;
    this.distance = 0;
    this.spriteAnimCounter = 0;

    this.lives = 4;

    this.update = this.update.bind(this);
  }

  addEventHandlers() {
    document.addEventListener("keydown", keyDownEvents.bind(this), true );
    document.addEventListener("keyup", keyUpEvents.bind(this), true );

    function keyDownEvents(e) {
        switch (e.keyCode) {
          case 32:
          case 38:
          case 87:
            //  up
            this.isJump = true;
            break
          case 37:
          case 65:
            // left
            this.isLeft = true;
            break
          case 40:
          case 83:
            //  down
            break
          case 39:
          case 68:
            //  right
            this.isRight = true;
            break
        }
    }

    function keyUpEvents(e) {
      switch (e.keyCode) {
        case 32:
        case 38:
        case 87:
          //  up
          this.isJump = false;
          break

        case 37:
        case 65:
          // left
          this.isLeft = false;
          break

        case 40:
        case 83:
          //  down
          break

        case 39:
        case 68:
          //  right
          this.isRight = false;
          break

        default:

      }
    }

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

  update(level) {
    //Move Left & Right
    if (this.isLeft) this.velocity_X = -4;
    if (this.isRight) this.velocity_X = 4;
    this.distance += this.velocity_X;

    // Stand on Platform
    if (!this.isLeft && !this.isRight && this.velocity_Y === 0) this.velocity_X = 0;

    // Fall velocity with weight
    if (this.velocity_Y < this.gravity) this.velocity_Y += this.weight;

    //Platform Collision
    // Regular Blocks, Falling off block objects
    const platformBlocks = level.platformBlocks();
    platformBlocks.forEach( block => {
      if (this.isColliding(block) && this.Y + this.height < block.Y + this.velocity_Y) {
        this.Y = block.Y - this.height;
        this.velocity_Y = 0;
      }
    });

    // Bullets
    const enemies = level.enemies;
    enemies.forEach( enemy => {
      if (this.isColliding(enemy) && this.Y + this.height < enemy.Y + this.velocity_Y) {
        this.Y = enemy.Y - this.height;
        this.velocity_Y = 0;
        this.X += 1;
      } else if (this.isColliding(enemy)){
        enemy.reset();
        this.lives -= 1;
        console.log(this.lives);
      }
    });

    //Falling Blocks
    const fallingBlocks = level.fallingBlocks();
    fallingBlocks.forEach( block => {
      if (this.isColliding(block) && this.Y + this.height < block.Y + this.velocity_Y) {
        block.gravity = 50;
        block.weight = 2.5;
        if (block.velocity_Y < block.gravity) block.velocity_Y += block.weight;
        this.velocity_Y = 0;
        this.canJump = true;
      }
      block.Y += block.velocity_Y;
    });

    //Spring Blocks
    const springBlocks = level.springBlocks();
    springBlocks.forEach( block => {
      if (this.isColliding(block) && this.Y + this.height < block.Y + this.velocity_Y) {
        this.Y = block.Y - this.height;
        this.velocity_Y = 0;
        this.springJump = true;
      }
    });

    //Jump
    if (this.isJump && this.velocity_Y === 0 || this.isJump && this.canJump) {
      this.velocity_Y = -7.75;
      this.canJump = false;
    }

    //Spring Jump
    if (this.springJump) {
      this.velocity_Y = -12;
      this.springJump = false;
    }
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Player);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Sound {
  constructor() {
    this.music = {
      theme: new Audio('assets/audio/runaway.mp3'),
      ending: new Audio('assets/audio/through-the-wire.mp3')
    }
    this.volume = .5;
    this.mute = false;

    this.addEventHandlers();
  }

  playMusic(track) {
    const currentTrack = this.music[track];
    if (typeof currentTrack.loop == 'boolean')
    {
        currentTrack.loop = true;
    }
    else
    {
        currentTrack.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        }, false);
    }
    // this.music.theme.play();
    currentTrack.play();
  }

  muteToggle() {
    document.getElementById("mute").classList.toggle("volume-off")
    if (this.mute) {
      // Turn Off
      for (const key of Object.keys(this.music)) {
        this.music[key].muted = false;
        this.mute = false;
      }
    } else {
      // Turn On
      for (const key of Object.keys(this.music)) {
        this.music[key].muted = true;
        this.mute = true;
      }
    }
  }

  addEventHandlers() {
    const muteBtn = document.getElementById("mute");
    muteBtn.addEventListener("click", () => this.muteToggle(), true);
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Sound);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__objects_game_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__objects_level_js__ = __webpack_require__(1);



document.addEventListener("DOMContentLoaded", () => {
  const game = new __WEBPACK_IMPORTED_MODULE_0__objects_game_js__["a" /* default */]();
  game.sounds.playMusic("theme");
  game.player.addEventHandlers();

  function welcome() {
    let base_image = new Image();
    base_image.src = 'assets/start-game.jpg';
    base_image.onload = function(){
      game.graphics.drawImage(base_image, 0, 0);
    }

    game.gameCanvas.addEventListener("click", splashControls, true);
  }

  function splashControls() {
    game.gameCanvas.removeEventListener("click", splashControls, true);
    game.graphics.clearRect( 0, 0, game.gameCanvas.width, game.gameCanvas.height);
    let base_image = new Image();
    base_image.src = 'assets/splash-controls.jpg';
    base_image.onload = function(){
      game.graphics.drawImage(base_image, 0, 0);
    }

    game.gameCanvas.addEventListener("click", splashIntro, true);
  }

  function splashIntro() {
    game.gameCanvas.removeEventListener("click", splashIntro, true);
    game.graphics.clearRect( 0, 0, game.gameCanvas.width, game.gameCanvas.height);
    let base_image = new Image();
    base_image.src = 'assets/splash-crying-kim.png';
    base_image.onload = function(){
      game.graphics.drawImage(base_image, 0, 0);
    }

    setTimeout(mainLoop, 2000);
  }

  function splashRetry() {
    document.body.classList.toggle('death');
    game.graphics.clearRect( 0, 0, game.gameCanvas.width, game.gameCanvas.height);
    let base_image = new Image();
    base_image.src = 'assets/splash-retry.jpg';
    base_image.onload = function(){
      game.graphics.drawImage(base_image, 0, 0);
    }

    game.gameCanvas.addEventListener("click", retry, true);
  }

  function splashRetryAfterCredits() {
    game.graphics.clearRect( 0, 0, game.gameCanvas.width, game.gameCanvas.height);
    let base_image = new Image();
    base_image.src = 'assets/splash-thanks.jpg';
    base_image.onload = function(){
      game.graphics.drawImage(base_image, 0, 0);
    }

    game.gameCanvas.addEventListener("click", retry, true);
  }

  function ending() {
    document.body.classList.toggle('death');
    let base_image = new Image();
    base_image.src = 'assets/splash-credits.jpg';
    base_image.onload = function(){
      game.graphics.drawImage(base_image, 0, 0);
    }
    let credits_Y = 0;

    function rollCredits() {
      game.graphics.clearRect( 0, 0, game.gameCanvas.width, game.gameCanvas.height);
        game.graphics.drawImage(base_image, 0, credits_Y);
      credits_Y -= .6;
      let creditFrames = setTimeout(rollCredits, 1000/60);

      if (credits_Y <= -1200) {
        clearTimeout(creditFrames);
        splashRetryAfterCredits();
      }
    }

    rollCredits();
  }

  function retry() {
    game.gameCanvas.removeEventListener("click", retry, true);
    // Reset Player
    game.player.lives = 5;
    game.player.velocity_X = 0;
    game.player.Y = 0;
    game.player.X = 220;

    // Testing vars
    // game.kim.Y = 280;
    // game.kim.X = 600;

    // Reset Kim
    game.kim.Y = 280;
    game.kim.X = 8500;

    // Reset Levels
    game.level = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__objects_level_js__["a" /* default */])();
    for (var i = 0; i < game.level.numBlocks(); i++) {
      game.graphics.drawImage(game.level.blocks[i].sprite, game.level.blocks[i].X, game.level.blocks[i].Y);
    }

    // Reset Enemies
    game.enemies = game.level.enemies;
    game.level.generateEnemies();

    document.body.classList.toggle('death');

    mainLoop();
  }

  const mainLoop = () => {
    // Turn off Intro Handler
    game.gameCanvas.removeEventListener("click", mainLoop, true);

    // Move objects in relation to Player
    game.update();
    // Game Logic
    game.player.update(game.level);
    game.level.updateEnemies(game);

    // Render Game
    game.render();

    var frames = setTimeout(mainLoop, 1000/60);

    // Player Reaches Kim
    if (game.player.isColliding(game.kim)) {
      clearTimeout(frames);
      game.sounds.music.theme.pause();
      game.sounds.playMusic("ending");

      ending();
    }

    // Player Death
    if (game.player.Y > 500) {
      clearTimeout(frames);
      splashRetry();
    }

    // Player Death
    if (game.player.lives === 0) {
      clearTimeout(frames);
      splashRetry();
    }
  };

  // Starts game
  welcome();

});


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__gameObject_js__ = __webpack_require__(0);


class Bullet extends __WEBPACK_IMPORTED_MODULE_0__gameObject_js__["a" /* default */] {
  constructor() {
    super({img: "assets/bullet.png",
    width: 58,
    height: 48});

    this.weight = 58;
    this.height = 48;
    this.X = this.randomX();
    this.Y = this.randomY();
    this.isLeft = true;
    this.isRight = false;
    this.gravity = 20;
    this.weight = 0.1;
    this.spriteAnimCounter = 0;

  }

  randomX() {
    return (Math.floor(Math.random() * (5 - 1 + 1)) + 1) * 50 + 900
  }

  randomY() {
    return (Math.floor(Math.random() * (8 - 2 + 1)) + 2) * 50
  }

  reset() {
    this.X = this.randomX();
    this.Y = this.randomY();
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

  update() {
    //Move Left & Right
    this.X -= 3;

    if (this.X <= -60) {
      this.reset();
    }
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Bullet);


/***/ })
/******/ ]);