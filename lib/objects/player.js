import gameObject from './gameObject.js'
import Effects from './effects.js'

class Player extends gameObject {
  constructor(options) {
    super(options);

    this.isLeft = false;
    this.isRight = false;
    this.isDuck = false;
    this.isJump = false;
    this.canJump = false;
    this.springJump = false;
    this.direction = "right";
    this.gravity = 100000;
    this.weight = 0.3;
    this.distance = 0;
    this.spriteAnimCounter = 0;

    this.lives = 5;

    this.update = this.update.bind(this);
  }

  addEventHandlers() {
    document.addEventListener("keydown", keyDownEvents.bind(this), true );
    document.addEventListener("keyup", keyUpEvents.bind(this), true );

    function keyDownEvents(e) {
        switch (e.keyCode) {
          case 32:
          case 38:
          case 87:
            //  up
            this.isJump = true;
            break
          case 37:
          case 65:
            // left
            this.isLeft = true;
            break
          case 40:
          case 83:
            //  down
            // if (this.isDuck === false) {
            //   this.height -= 20;
            //   this.Y += 20;
            //   this.isDuck = true;
            // }
            break
          case 39:
          case 68:
            //  right
            this.isRight = true;
            break
        }
    }

    function keyUpEvents(e) {
      switch (e.keyCode) {
        case 32:
        case 38:
        case 87:
          //  up
          this.isJump = false;
          break

        case 37:
        case 65:
          // left
          this.isLeft = false;
          break

        case 40:
        case 83:
          //  down
          // if (this.isDuck === true) {
          //   this.height += 20;
          //   this.Y -= 20;
          //   this.isDuck = false;
          // }
          break

        case 39:
        case 68:
          //  right
          this.isRight = false;
          break

        default:

      }
    }

  }

  draw(graphics) {
    const frameWidth = 1875/15;
    const frameHeight = 1250/10;
    let walkingMod = Math.floor(this.spriteAnimCounter) % 8;
    let standingMod = Math.floor(this.spriteAnimCounter) % 6;

    let actionStatus = 0;
    let frameStatus = 0;
    if (this.velocity_X === 0 && this.velocity_Y === 0 && this.isDuck === false) {
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
    } else if (this.isDuck) {
      // ducking
      actionStatus = 375;
      frameStatus = 0;
    }

    // Rotate sprites if going left
    let playerXCoord = this.X - 43;
    if (this.direction === "left") {
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
    if (this.direction === "left") {
      graphics.scale(-1, 1);
    }
  }

  update(game) {
    //Move Left & Right
    if (this.isLeft) {
      this.velocity_X = -4;
      this.direction = "left";
    }
    if (this.isRight) {
      this.velocity_X = 4;
      this.direction = "right";
    }

    this.distance += this.velocity_X;

    // Stand on Platform
    if (!this.isLeft && !this.isRight && this.velocity_Y === 0) this.velocity_X = 0;

    // Fall velocity with weight
    if (this.velocity_Y < this.gravity) this.velocity_Y += this.weight;

    //Platform Collision
    // Regular Blocks, Falling off block objects
    const platformBlocks = game.level.platformBlocks();
    platformBlocks.forEach( block => {
      if (this.isColliding(block) && this.Y + this.height < block.Y + this.velocity_Y) {
        this.Y = block.Y - this.height;
        this.velocity_Y = 0;
      }
    });

    // Bullets
    game.level.enemies.forEach( enemy => {
      if (this.isColliding(enemy) && this.Y + this.height < enemy.Y + this.velocity_Y) {
        this.Y = enemy.Y - this.height;
        this.velocity_Y = 0;
        this.X += 1;
      } else if (this.isColliding(enemy)){
          game.effects.push(new Effects({
            img: "assets/explosion.png",
            x: enemy.X,
            y: enemy.Y,
            width: 55,
            height: 32
          }));

          enemy.reset();
          setTimeout(function(){ game.effects.shift() }, 1000);
        this.lives -= 1;
      }
    });

    // Consumables
    let i = 0;
    while (i < game.level.consumables.length){
      if (this.isColliding(game.level.consumables[i])) {
        switch (game.level.consumables[i].type) {
          case "health":
              if (this.lives < 6) {
                this.lives += 1;
                game.level.consumables.splice(i, 1)
              }
            break;

          case "mic":
            game.level.consumables.splice(i, 1)
            game.level.enemies.forEach(enemy => {
              game.effects.push(new Effects({
                img: "assets/explosion.png",
                x: enemy.X,
                y: enemy.Y,
                width: 55,
                height: 32
              }));

              enemy.reset();
              setTimeout(function(){ game.effects.shift() }, 1000);
            });
            break;

          default:

        }
      }

      i++;
    }

    //Falling Blocks
    const fallingBlocks = game.level.fallingBlocks();
    fallingBlocks.forEach( block => {
      if (this.isColliding(block) && this.Y + this.height < block.Y + this.velocity_Y) {
        block.gravity = 50;
        block.weight = 2.5;
        if (block.velocity_Y < block.gravity) block.velocity_Y += block.weight;
        this.velocity_Y = 0;
        this.canJump = true;
      }
      block.Y += block.velocity_Y;
    });

    //Spring Blocks
    const springBlocks = game.level.springBlocks();
    springBlocks.forEach( block => {
      if (this.isColliding(block) && this.Y + this.height < block.Y + this.velocity_Y) {
        this.Y = block.Y - this.height;
        this.velocity_Y = 0;
        this.springJump = true;
      }
    });

    //Jump
    if (this.isJump && this.velocity_Y === 0 || this.isJump && this.canJump) {
      this.velocity_Y = -7.75;
      this.canJump = false;
    }

    //Spring Jump
    if (this.springJump) {
      this.velocity_Y = -12;
      this.springJump = false;
    }
  }

}

export default Player;
