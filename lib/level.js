import Object from './object.js'
import FallingBlock from './objects/falling_block.js'

class Level {
  constructor() {
    this.maxBlock = 15;
    this.block = new Array ();
  }
}

// const generateBlock= (options) => {
//   const { level, num, img, x, y, width, height } = options;
//   for (var i = 0; i < array.length; i++) {
//   }
// }

// Create Static Level One
const levelOne = new Level();

//Initial Platform
for (var i = 0; i < 7; i++) {
  levelOne.block[i] = new Object({
    img: "assets/platform.png",
    x: i * 96,
    y: 400,
    width: 96,
    height: 11
  });
}

levelOne.block[6] = new Object({
  img: "assets/platform.png",
  x: 768,
  y: 325,
  width: 96,
  height: 11
});

levelOne.block[7] = new Object({
  img: "assets/platform.png",
  x: 1200,
  y: 450,
  width: 96,
  height: 11
});

levelOne.block[8] = new Object({
  img: "assets/platform.png",
  x: 1460,
  y: 350,
  width: 96,
  height: 11
});

levelOne.block[9] = new Object({
  img: "assets/platform.png",
  x: 1200,
  y: 250,
  width: 96,
  height: 11
});

for (var i = 10; i < 14; i++) {
  let j = i - 10;
  levelOne.block[i] = new Object({
    img: "assets/platform.png",
    x: 1460 + (j * 96),
    y: 150,
    width: 96,
    height: 11
  });
}


// far block
levelOne.block[14] = new FallingBlock({
  img: "assets/platform.png",
  x: 600,
  y: 300,
  width: 96,
  height: 11
});

export default levelOne;
