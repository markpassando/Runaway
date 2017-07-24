import gameObject from './gameObject.js'
import Block from './block.js'
import Bullet from './bullet.js';

class Level {
  constructor() {
    this.blocks = new Array();
    this.enemies = new Array();
    this.maxEnemies = 3;
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

  generateEnemies() {
    while (this.enemies.length < this.maxEnemies) {
      this.enemies.push(new Bullet());
    }
  };

  updateEnemies() {
    this.enemies.forEach(enemy => {
      enemy.update();
    })
  }
}

const generateBlock = (options) => {
  let defaultOptions = {
    type: "platform",
    num: 1,
    space: 0
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
};

// Create Level One
const generateLevelOne = () => {
  const levelOne = new Level();
  //flat stage
  generateBlock({
    level: levelOne,
    img: "assets/platform.png",
    num: 6,
    x: 96,
    y: 405,
    width: 96,
    height: 11
  });

  // first fall
  generateBlock({
    level: levelOne,
    img: "assets/falling-platform.png",
    num: 1,
    x: 768,
    y: 325,
    width: 96,
    height: 11,
    type: "falling"
  });

  generateBlock({
    level: levelOne,
    img: "assets/platform.png",
    num: 2,
    x: 875,
    y: 425,
    width: 96,
    height: 11
  });

  generateBlock({
    level: levelOne,
    img: "assets/platform.png",
    x: 1200,
    y: 400,
    width: 96,
    height: 11,
    num: 2
  });

  generateBlock({
    level: levelOne,
    img: "assets/platform.png",
    num: 2,
    x: 1460,
    y: 325,
    width: 96,
    height: 11
  });

  generateBlock({
    level: levelOne,
    img: "assets/platform.png",
    x: 1300,
    y: 250,
    width: 96,
    height: 11
  });

  //flat stage
  generateBlock({
    level: levelOne,
    img: "assets/platform.png",
    num: 6,
    x: 1460,
    y: 150,
    width: 96,
    height: 11
  });

  // springs
  generateBlock({
   level: levelOne,
   img: "assets/spring.png",
   x: 2200,
   y: 420,
   width: 60,
   height: 78,
   type: "spring",
   num: 2
 });

// flat platform
 generateBlock({
   level: levelOne,
   img: "assets/platform.png",
   x: 2400,
   y: 250,
   width: 96,
   height: 11,
   num: 2
 });

 // springs
 generateBlock({
  level: levelOne,
  img: "assets/spring.png",
  x: 2700,
  y: 420,
  width: 60,
  height: 78,
  type: "spring",
  num: 2
});

// fall sequence
generateBlock({
  level: levelOne,
  img: "assets/falling-platform.png",
  num: 1,
  x: 2900,
  y: 200,
  width: 96,
  height: 11,
  type: "falling"
});

generateBlock({
  level: levelOne,
  img: "assets/falling-platform.png",
  num: 1,
  x: 3050,
  y: 275,
  width: 96,
  height: 11,
  type: "falling"
});

generateBlock({
  level: levelOne,
  img: "assets/falling-platform.png",
  num: 1,
  x: 3200,
  y: 350,
  width: 96,
  height: 11,
  type: "falling"
});

generateBlock({
  level: levelOne,
  img: "assets/platform.png",
  num: 2,
  x: 3330,
  y: 425,
  width: 96,
  height: 11
});

//falling to spring
generateBlock({
  level: levelOne,
  img: "assets/falling-platform.png",
  num: 1,
  x: 3600,
  y: 400,
  width: 96,
  height: 11,
  type: "falling"
});

generateBlock({
  level: levelOne,
  img: "assets/spring.png",
  num: 1,
  x: 3800,
  y: 420,
  width: 60,
  height: 78,
  type: "spring"
});

generateBlock({
  level: levelOne,
  img: "assets/platform.png",
  num: 2,
  x: 3900,
  y: 225,
  width: 96,
  height: 11
});



  // Falling area
  generateBlock({
    level: levelOne,
    img: "assets/falling-platform.png",
    num: 1,
    x: 4200,
    y: 250,
    width: 96,
    height: 11,
    type: "falling",
    space: 200,
    num: 3
  });

  generateBlock({
    level: levelOne,
    img: "assets/spring.png",
    x: 5000,
    y: 420,
    width: 60,
    height: 78,
    type: "spring",
    num: 3,
    space: 350
  });

  // after spring
  generateBlock({
    level: levelOne,
    img: "assets/platform.png",
    x: 6000,
    y: 480,
    width: 96,
    height: 11
  });

  generateBlock({
    level: levelOne,
    img: "assets/platform.png",
    x: 6200,
    y: 480,
    width: 96,
    height: 11
  });

  generateBlock({
    level: levelOne,
    img: "assets/spring.png",
    x: 6400,
    y: 420,
    width: 60,
    height: 78,
    type: "spring",
  });

  // +300
  generateBlock({
    level: levelOne,
    img: "assets/falling-platform.png",
    num: 1,
    x: 6600,
    y: 350,
    width: 96,
    height: 11,
    type: "falling",
  });
  //
  generateBlock({
    level: levelOne,
    img: "assets/platform.png",
    num: 1,
    x: 6800,
    y: 300,
    width: 96,
    height: 11
  });

  generateBlock({
    level: levelOne,
    img: "assets/platform.png",
    num: 3,
    x: 7000,
    y: 250,
    width: 96,
    height: 11
  });

  generateBlock({
    level: levelOne,
    img: "assets/falling-platform.png",
    num: 1,
    x: 7296,
    y: 250,
    width: 96,
    height: 11,
    type: "falling"
  });

  generateBlock({
    level: levelOne,
    img: "assets/spring.png",
    num: 1,
    x: 7600,
    y: 420,
    width: 60,
    height: 78,
    type: "spring"
  });

  //flat stage
  generateBlock({
    level: levelOne,
    img: "assets/platform.png",
    num: 10,
    x: 7800,
    y: 400,
    width: 96,
    height: 11
  });
// debugger
  return levelOne;
}

export default generateLevelOne;
