import gameObject from './object.js';

const render = (graphics, level, player) => {
  // const kanyeCreation = {
  //   img: "assets/nightmare-kanye.png",
  //   x: 700,
  //   y: 350,
  //   width: 49,
  //   height: 47
  // }
  // let kanye = new gameObject(kanyeCreation);
  // graphics.drawImage(kanye.sprite, kanye.X, kanye.Y);


  // debugger
  for (var i = 0; i < level.numBlocks(); i++) {
    graphics.drawImage(level.blocks[i].sprite, level.blocks[i].X, level.blocks[i].Y);
  }
  graphics.drawImage(player.sprite, player.X, player.Y);

}

export default render;
