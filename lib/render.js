const render = (graphics, level, player) => {
  // debugger
  for (var i = 0; i < level.numBlocks(); i++) {
    graphics.drawImage(level.blocks[i].sprite, level.blocks[i].X, level.blocks[i].Y);
  }
  graphics.drawImage(player.sprite, player.X, player.Y);
}

export default render;
