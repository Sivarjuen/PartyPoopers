import "phaser";
import { Spinner } from "phaser3-rex-plugins/templates/spinner/spinner-components.js";
import { Text } from "../common/Text";

export class NetStatus extends Phaser.GameObjects.Container {
  private text: Text;
  private spinner: Spinner;
  private graphics: Phaser.GameObjects.Graphics;

  constructor(scene: Phaser.Scene, x: number, y: number, font: string) {
    super(scene, x, y);

    const spinnerConfig = {
      x: 0,
      y: 0,
      width: 36,
      height: 36,
      color: 0xffffff,
      duration: 1800,
      start: true,
    };

    this.text = new Text(scene, -30, 0, "Connecting...", font, 22);
    this.text.setColor("#FFA500");

    this.text.setOrigin(1, 0.5);
    this.add(this.text);

    this.spinner = new Spinner(scene, spinnerConfig);
    this.add(this.spinner);

    this.graphics = new Phaser.GameObjects.Graphics(scene, { x: 0, y: 0 });
    this.add(this.graphics);
    this.graphics.setVisible(false);
  }

  public connectionSuccess() {
    this.spinner.setVisible(false);
    this.text.setText("Connected");
    this.text.setColor("#00FF00");
    this.graphics.setVisible(true);
    this.graphics.lineStyle(3, 0x37a018, 1.0);
    this.graphics.fillStyle(0x4fd826, 1.0);
    this.graphics.fillCircle(0, 0, 18);
    this.graphics.strokeCircle(0, 0, 18);
  }

  public connectionFail() {
    this.spinner.setVisible(false);
    this.text.setText("Unable to connect");
    this.text.setColor("#FF0000");
    this.graphics.setVisible(true);
    this.graphics.lineStyle(3, 0x8b0d0d, 1.0);
    this.graphics.fillStyle(0xe30b0b, 1.0);
    this.graphics.fillCircle(0, 0, 18);
    this.graphics.strokeCircle(0, 0, 18);
  }

  public reconnecting() {
    this.spinner.setVisible(true);
    this.text.setText("Connecting...");
    this.text.setColor("#FFA500");
    this.graphics.setVisible(false);
  }
}
