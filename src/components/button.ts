import 'phaser';

export class Button {

  public button: Phaser.GameObjects.Text;

  constructor(x, y, label, scene, callback) {
    this.button = scene.add.text(x, y, label)
      .setFontSize(scene.registry.get('mobile') === true ? 100 : 30)
      .setOrigin(0.5)
      .setPadding(10)
      .setStyle({ backgroundColor: '#111', fill: '#FFF' })
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => callback())
      .on('pointerover', () => this.button.setStyle({ fill: '#f39c12' }))
      .on('pointerout', () => this.button.setStyle({ fill: '#FFF' }));
  }
}