// import gameObject from './object.js'``;

const render = (graphics, level, player) => {

  // debugger
  for (var i = 0; i < level.numBlocks(); i++) {
    graphics.drawImage(level.blocks[i].sprite, level.blocks[i].X, level.blocks[i].Y);
  }
  // graphics.drawImage(player.sprite, player.X, player.Y);
  if (this.velocity_X === 0 && this.velocity_Y === 0) {

  } else if (player.velocity_X !== 0) {
    player.spriteAnimCounter += .2;
  }
  player.draw(graphics);

}

export default render;
