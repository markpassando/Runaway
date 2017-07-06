const render = (graphics, level, player) => {
  for (var i = 0; i < level.maxBlock; i++) {
    graphics.drawImage(level.block[i].sprite, level.block[i].X, level.block[i].Y);
  }
  graphics.drawImage(player.sprite, player.X, player.Y);
}

export default render;
