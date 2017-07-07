import gameObject from './object.js'

class Player extends gameObject {
  constructor(options) {
    super(options);

    this.isLeft = false;
    this.isRight = false;
    this.isJump = false;
    this.canJump = false;
    this.springJump = false;
    this.gravity = 100000;
    this.weight = 0.12;
    this.distance = 0;
  }
}

export default Player;
