import "phaser";

import BBCodeText from "phaser3-rex-plugins/plugins/bbcodetext.js";

export class Text extends BBCodeText {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    text: string,
    font: string,
    size: number,
    style?: BBCodeText.TextStyle
  ) {
    super(scene, x, y, text, style);
    this.setFont(font);
    this.setFontSize(size);
  }
}
