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

export default keyEvents;
