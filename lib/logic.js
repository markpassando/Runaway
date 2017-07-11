import levelOne from './objects/level.js';

const logic = (player, level, frames) => {
  //Move Left & Right
  if (player.isLeft) player.velocity_X = -3;
  if (player.isRight) player.velocity_X = 3;
  player.distance += player.velocity_X;
  // console.log(player.distance);

  // Stand on Platform
  if (!player.isLeft && !player.isRight && player.velocity_Y === 0) player.velocity_X = 0;

  // Fall velocity with weight
  if (player.velocity_Y < player.gravity) player.velocity_Y += player.weight;

  //Platform Collision
  // Regular Blocks, Falling off block objects
  const platformBlocks = level.platformBlocks();
  platformBlocks.forEach( block => {
    if (player.isColliding(block) && player.Y + player.height < block.Y + player.velocity_Y) {
      player.Y = block.Y - player.height;
      player.velocity_Y = 0;
    }
  });

  //Falling Blocks
  const fallingBlocks = level.fallingBlocks();
  fallingBlocks.forEach( block => {
    if (player.isColliding(block) && player.Y + player.height < block.Y + player.velocity_Y) {
      block.gravity = 50;
      block.weight = 1;
      if (block.velocity_Y < block.gravity) block.velocity_Y += block.weight;
      player.velocity_Y = 0;
      player.canJump = true;
    }
    block.Y += block.velocity_Y;
  });

  //Spring Blocks
  const springBlocks = level.springBlocks();
  springBlocks.forEach( block => {
    if (player.isColliding(block) && player.Y + player.height < block.Y + player.velocity_Y) {
      player.Y = block.Y - player.height;
      player.velocity_Y = 0;
      player.springJump = true;
    }
  });

  //Jump
  if (player.isJump && player.velocity_Y === 0 || player.isJump && player.canJump) {
    player.velocity_Y = -4.5;
    player.canJump = false;
  }

  //Spring Jump
  if (player.springJump) {
    player.velocity_Y = -7;
    player.springJump = false;
  }


}

export default logic;
