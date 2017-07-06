import Object from './object.js'

class Level {
  constructor() {
    this.maxBlock = 10;
    this.block = new Array ();
  }
}

// Create Static Level One
const levelOne = new Level();

//Initial Platform
for (var i = 0; i < 9; i++) {
  levelOne.block[i] = new Object({
    img: "assets/platform.png",
    x: i * 96,
    y: 400,
    width: 96,
    height: 11
  });
}

//far block
levelOne.block[9] = new Object({
  img: "assets/platform.png",
  x: 600,
  y: 300,
  width: 96,
  height: 11
});

export default levelOne;
