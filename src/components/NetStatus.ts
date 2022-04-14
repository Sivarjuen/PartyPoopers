import "phaser";
import IBaseScene from "../interfaces/IBaseScene";
import { IGameObj } from "../interfaces/IGameObj";
import { Spinner } from "phaser3-rex-plugins/templates/spinner/spinner-components.js"

export class NetStatus extends Spinner implements IGameObj {

  constructor(scene: IBaseScene, x: number, y: number) {
    super(scene.getScene(), {
      x: x,
      y: y,
      width: 36,
      height: 36,
      color: 0xffffff,
      duration: 1800,
      start: true
    });
  }
}
