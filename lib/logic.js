const logic = (player, level) => {
  //Move Left & Right
  if (player.isLeft) player.velocity_X = -3;
  if (player.isRight) player.velocity_X = 3;

  if (player.Y > 500) {
    console.log("you lose");
    // player.Y = 0;
    // player.X = 375 - 23;
  }
  // FallingBlock
  if (player.isColliding(level.block[14]) && player.Y + player.height < level.block[14].Y + player.velocity_Y) {
    level.block[14].gravity = 50;
    level.block[14].weight = 1;
    if (level.block[14].velocity_Y < level.block[14].gravity) level.block[14].velocity_Y += level.block[14].weight;
    player.velocity_Y = 0;
    player.canJump = true;
  }
  level.block[14].Y += level.block[14].velocity_Y;

  // Stand on Platform
  if (!player.isLeft && !player.isRight && player.velocity_Y === 0) player.velocity_X = 0;

  // Fall velocity with weight
  if (player.velocity_Y < player.gravity) player.velocity_Y += player.weight;

  // Collision, Falling off block objects
  for (var i = 0; i < level.maxBlock; i++) {
    if (player.isColliding(level.block[i]) && player.Y + player.height < level.block[i].Y + player.velocity_Y) {
      player.Y = level.block[i].Y - player.height;
      player.velocity_Y = 0;
    }
  }

  //Jump
  if (player.isJump && player.velocity_Y === 0 || player.isJump && player.canJump) {
    player.velocity_Y = -4.5;
    player.canJump = false;
  }



}

export default logic;
