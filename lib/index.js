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
