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

export default keyEvents;
