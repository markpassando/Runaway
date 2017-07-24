import gameObject from './gameObject.js'

class Bullet extends gameObject {
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

export default Bullet;
