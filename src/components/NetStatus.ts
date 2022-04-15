import "phaser";
import IBaseScene from "../interfaces/IBaseScene";
import { IGameObj } from "../interfaces/IGameObj";
import { Spinner } from "phaser3-rex-plugins/templates/spinner/spinner-components.js"

export class NetStatus extends Phaser.GameObjects.Container implements IGameObj {

  private spinner;
  private graphics;

  constructor(scene: IBaseScene, x: number, y: number) {
    super(scene.getScene(), x, y) 
    
    const spinnerConfig = {
      x: 0,
      y: 0,
      width: 36,
      height: 36,
      color: 0xffffff,
      duration: 1800,
      start: true
    };

    this.spinner = new Spinner(scene.getScene(), spinnerConfig);
    this.add(this.spinner);

    this.graphics = new Phaser.GameObjects.Graphics(scene.getScene(), { x: 0, y: 0 });
    this.add(this.graphics);
    this.graphics.setVisible(false)
  }

  public connectionSuccess() {
    this.spinner.setVisible(false)
    this.graphics.setVisible(true)
    this.graphics.lineStyle(3, 0x37A018, 1.0);
    this.graphics.fillStyle(0x4FD826, 1.0);
    this.graphics.fillCircle(0, 0, 18);
    this.graphics.strokeCircle(0, 0, 18);
  }

  public connectionFail() {
    this.spinner.setVisible(false)
    this.graphics.setVisible(true)
    this.graphics.lineStyle(3, 0x8B0D0D, 1.0);
    this.graphics.fillStyle(0xE30B0B, 1.0);
    this.graphics.fillCircle(0, 0, 18);
    this.graphics.strokeCircle(0, 0, 18);
  }

  public reconnecting() {
    this.spinner.setVisible(true)
    this.graphics.setVisible(false)
  }
}
