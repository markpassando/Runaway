import gameObject from './gameObject.js';
import Player from './player.js';
import generateLevelOne from './level.js';
import Sound from './sounds.js';

class Game {
  constructor() {
    this.gameCanvas = document.getElementById('canvas');
    this.graphics = this.gameCanvas.getContext('2d');
    this.sounds = new Sound();
    this.level = generateLevelOne();
    this.player = new Player({
      img: "assets/grid-sprite.png",
      x: 220,
      y: 0,
      width: 46,
      height: 94
    });

    // Kim testing coords
    // x: 600,
    // y: 280,

    // Prod coords
    // x: 8500,
    // y: 280,
    this.kim = new gameObject({
      img: "assets/kim.png",
      x: 8500,
      y: 280,
      width: 48,
      height: 121
    });


    this.enemies = this.level.enemies;
    this.level.generateEnemies();

  }

update() {
  this.enemies.forEach(enemy => {
    enemy.X += -this.player.velocity_X;
  });

  // Kim
  this.kim.X += -this.player.velocity_X;
  // Blocks
  this.level.blocks.forEach( block => {
    block.X += -this.player.velocity_X;
  });
  this.player.Y += this.player.velocity_Y;
}

render() {
  // Clear canvas
  this.graphics.clearRect( 0, 0, this.gameCanvas.width, this.gameCanvas.height);

  // Render Life Bar
  for (var i = 0; i < this.player.lives; i++) {
    let base_image = new Image();
    base_image.src = 'assets/heart.png';
    this.graphics.drawImage(base_image, (i * 50) + 10, 10);
  }
  // Render All blocks
  for (var i = 0; i < this.level.numBlocks(); i++) {
    this.graphics.drawImage(this.level.blocks[i].sprite, this.level.blocks[i].X, this.level.blocks[i].Y);
  }

  // Render Enemies
  this.enemies.forEach(enemy => {
    this.graphics.drawImage(enemy.sprite, enemy.X, enemy.Y);
  })

  // Draw Kim
  this.graphics.drawImage(this.kim.sprite, this.kim.X, this.kim.Y);

  // Player Sprites Animation
  if (this.player.velocity_X === 0 && this.player.velocity_Y === 0) {
    // Standing, sprites need work

  } else if (this.player.velocity_X !== 0) {
    // Running
    this.player.spriteAnimCounter += .2;
  }

  //Draw Player
  this.player.draw(this.graphics);
}

}

export default Game;
