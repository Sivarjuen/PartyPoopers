import 'phaser';
import IBaseScene from '../interfaces/IBaseScene';
import { IGameObj } from '../interfaces/IGameObj';

export class Button extends Phaser.GameObjects.Text implements IGameObj {

  public baseScene: IBaseScene;
  
  constructor(scene: IBaseScene, x: number, y: number, label: string, callback: Function) {
    super(scene.getScene(), x, y, label, null);
    this.baseScene = scene;
    // this.setFontSize(scene.registry.get('mobile') === true ? 100 : 30)
    this.setFontSize(30)
    this.setOrigin(0.5)
    this.setPadding(10)
    this.setStyle({ backgroundColor: '#111', fill: '#FFF' })
    this.setInteractive({ useHandCursor: true })
    this.on('pointerdown', () => callback())
    this.on('pointerover', () => this.setStyle({ fill: '#f39c12' }))
    this.on('pointerout', () => this.setStyle({ fill: '#FFF' }));
  }
}