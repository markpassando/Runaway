const logic = (player, level) => {
  //Move Left & Right
  if (player.isLeft) player.velocity_X = -3;
  if (player.isRight) player.velocity_X = 3;

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
  if (player.isJump && player.velocity_Y === 0) {
    player.velocity_Y = -4.5;
  }

}

export default logic;
