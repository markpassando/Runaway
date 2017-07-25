import gameObject from './gameObject.js';
import Player from './player.js';
import generateLevelOne from './level.js';
import Sound from './sounds.js';

class Game {
  constructor() {
    this.gameCanvas = document.getElementById('canvas');
    this.graphics = this.gameCanvas.getContext('2d');
    this.sounds = new Sound();
    this.effects = [];
    this.level = generateLevelOne();
    this.player = new Player({
      img: "assets/grid-sprite.png",
      x: 120,
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
      x: 8400,
      y: 305,
      width: 48,
      height: 121
    });

    // Create Enemies
    this.enemies = this.level.enemies;
    this.level.generateEnemies();
    this.level.generateConsumables();
  }

  update() {
    // Move Objects according to player

    // Enemies
    this.enemies.forEach(enemy => enemy.X += -this.player.velocity_X);
    // Consumables
    this.level.consumables.forEach(consumable => consumable.X += -this.player.velocity_X);
    // Effects
    this.effects.forEach(fx => fx.X += -this.player.velocity_X);
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

      // Render All Blocks
      for (var i = 0; i < this.level.numBlocks(); i++) {
        this.graphics.drawImage(this.level.blocks[i].sprite, this.level.blocks[i].X, this.level.blocks[i].Y);
      }

      // Render Enemies
      this.enemies.forEach(enemy => {
        this.graphics.drawImage(enemy.sprite, enemy.X, enemy.Y);
      })

      // Render Consumables
      this.level.consumables.forEach(consumable => {
        this.graphics.drawImage(consumable.sprite, consumable.X, consumable.Y);
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

      // Effects Sprites
      this.effects.forEach( fx => {
        fx.draw(this.graphics);
        fx.spriteAnimCounter += .31;
      });

      //Draw Player
      this.player.draw(this.graphics);
  }
  
}

export default Game;
