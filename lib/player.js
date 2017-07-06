import Object from './object.js'

class Player extends Object {
  constructor(options) {
    super(options)

    this.isLeft = false;
    this.isRight = false;
    this.isJump = false;
    this.gravity = 20;
    this.weight = 0.1;
  }
}

export default Player;
