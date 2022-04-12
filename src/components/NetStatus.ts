import "phaser";
import IBaseScene from "../interfaces/IBaseScene";
import { IGameObj } from "../interfaces/IGameObj";
import { AlignGrid } from "../util/alignGrid";

export class NetStatus extends Phaser.GameObjects.Container implements IGameObj {
  public grid!: AlignGrid;
  public baseScene: IBaseScene;

  constructor(scene: IBaseScene) {
    super(scene.getScene());

    this.baseScene = scene
    this.grid = new AlignGrid(scene, 11, 11, -1, -1, this);
    if(this.baseScene.debug) {
      this.grid.showNumbers();
    }
  }
}
