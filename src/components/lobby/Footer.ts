import "phaser";
import { Text } from "../common/Text";

export class Footer extends Phaser.GameObjects.Container {
  private versionText: Text;
  private authorText: Text;

  constructor(scene: Phaser.Scene, x: number, y: number, font: string) {
    super(scene, x, y);

    const version = `v${process.env.npm_package_version}`;
    const author = "Sivarjuen Ravichandran ©";

    console.log(`Client v${version}`);

    this.versionText = new Text(scene, 0, -32, version, font, 20);
    this.versionText.setOrigin(0, 0.5);
    this.versionText.setColor("#565463");
    this.add(this.versionText);

    this.authorText = new Text(scene, 0, 0, author, font, 20);
    this.authorText.setOrigin(0, 0.5);
    this.authorText.setColor("#565463");
    this.add(this.authorText);
  }
}
