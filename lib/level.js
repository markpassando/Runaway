import gameObject from './object.js'
import Block from './objects/block.js'

class Level {
  constructor() {
    this.blocks = new Array ();

    // this.blocks = this.blocks.bind(this);
  }

  clear() {
    return this.blocks = [];
  }

  numBlocks() {
    return this.blocks.length;
  }

  platformBlocks() {
    return this.blocks.filter(block => block.type === "platform");
  }

  fallingBlocks() {
    return this.blocks.filter(block => block.type === "falling");
  }

  springBlocks() {
    return this.blocks.filter(block => block.type === "spring");
  }
}

const generateBlock = (options) => {
  let defaultOptions = {
    type: "platform",
    num: 1,
    space: null
  };
  let newOptions = Object.assign(defaultOptions, options);

  const { level, num, img, x, y, width, height, type, space } = newOptions;

  let totalWidth = 0;
  for (var i = 1; i <= num; i++) {
    level.blocks.push(new Block({
      img: img,
      x: x + (totalWidth),
      y: y,
      width: width,
      height: height,
      type: type
    }));

    totalWidth += width + space
  }
}

// Create Static Level One
const levelOne = new Level();
//flat stage
generateBlock({
  level: levelOne,
  img: "assets/platform.png",
  num: 6,
  x: 96,
  y: 400,
  width: 96,
  height: 11
});

//staggering
generateBlock({
  level: levelOne,
  img: "assets/platform.png",
  num: 1,
  x: 768,
  y: 325,
  width: 96,
  height: 11
});

generateBlock({
  level: levelOne,
  img: "assets/platform.png",
  x: 768,
  y: 325,
  width: 96,
  height: 11
});

generateBlock({
  level: levelOne,
  img: "assets/platform.png",
  x: 1200,
  y: 450,
  width: 96,
  height: 11
});

generateBlock({
  level: levelOne,
  img: "assets/platform.png",
  x: 1460,
  y: 350,
  width: 96,
  height: 11
});

generateBlock({
  level: levelOne,
  img: "assets/platform.png",
  x: 1460,
  y: 350,
  width: 96,
  height: 11
});

generateBlock({
  level: levelOne,
  img: "assets/platform.png",
  x: 1200,
  y: 250,
  width: 96,
  height: 11
});

//flat stage
generateBlock({
  level: levelOne,
  img: "assets/platform.png",
  num: 3,
  x: 1460,
  y: 150,
  width: 96,
  height: 11
});

//Falling area
generateBlock({
  level: levelOne,
  img: "assets/falling-platform.png",
  num: 1,
  x: 2000,
  y: 250,
  width: 96,
  height: 11,
  type: "falling",
  space: 270,
  num: 3
});

generateBlock({
  level: levelOne,
  img: "assets/spring.png",
  num: 1,
  x: 3100,
  y: 420,
  width: 60,
  height: 78,
  type: "spring",
  num: 3,
  space: 400
});


export default levelOne;
