import "phaser";
import IBaseScene from "../interfaces/IBaseScene";
import { IGameObj } from "../interfaces/IGameObj";
import { AlignGrid } from "../util/alignGrid";

export class NetStatus extends Phaser.GameObjects.Container implements IGameObj {
  public grid!: AlignGrid;

  constructor(scene: IBaseScene) {
    super(scene.getScene());

    const text = this.scene.add.text(0, 0, "Connected")
    text.setOrigin(0.5)
    this.add(text)
  }
}
