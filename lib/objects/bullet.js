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
  }

  randomX() {
    return (Math.floor(Math.random() * (9 - 1 + 1)) + 1) * 50 + 900
  }

  randomY() {
    return (Math.floor(Math.random() * (8 - 2 + 1)) + 2) * 50
  }

  reset() {
    this.X = this.randomX();
    this.Y = this.randomY();
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
