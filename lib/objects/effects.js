import gameObject from './gameObject.js'

class Effects extends gameObject {
  constructor(options) {
    super(options);

    this.spriteAnimCounter = 0;
  }

  draw(graphics) {
    const frameWidth = 55;
    const frameHeight = 544/17;
    let frameStatus = 1;
    let explosionMod = Math.floor(this.spriteAnimCounter) % 17;

    graphics.drawImage(this.sprite,
      0, explosionMod * 32,
      frameWidth, frameHeight,
      this.X, this.Y,
      frameWidth, 32
    );
  }

}

export default Effects;
