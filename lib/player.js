import gameObject from './object.js'

class Player extends gameObject {
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

export default Player;
