import "phaser";

import InputText from "phaser3-rex-plugins/plugins/inputtext.js";

export class TextInput extends InputText {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    config?: InputText.IConfig
  ) {
    super(scene, x, y, config);
  }
}
