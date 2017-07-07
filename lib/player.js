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

    this.spriteAnimCounter = 0;
  }

  draw(graphics) {
    // 1875
    // 1250
    // 47, 76,
    const frameWidth = 1875/15;
    const frameHeight = 1250/10;
    let walkingMod = Math.floor(this.spriteAnimCounter) % 8;

    let actionStatus = 0;
    let frameStatus = 0;
    if (this.velocity_X === 0) {
      //standing
      actionStatus = 0;
      frameStatus = 0;
    } else if (this.velocity_X !== 0) {
      actionStatus = 125;
      frameStatus = walkingMod;
    }

    graphics.drawImage(this.sprite,
      frameStatus * frameWidth, actionStatus,
      frameWidth, frameHeight,
      this.X - 40, this.Y,
      125, 125
    );
    // point on image
    //
  }
}

export default Player;
