import Object from './object.js'
import keyEvents from './key_events.js'
import levelOne from './level.js'

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
  let player = new Object(playerCreation);



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
    const level = levelOne;
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
