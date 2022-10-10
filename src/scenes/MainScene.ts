import { BaseScene } from "./BaseScene";
import { NetStatus } from "../components/lobby/NetStatus";
import { TextInput } from "../components/lobby/TextInput";
import connectToServer from "../network/Core";
import { MENU_BACKGROUND_COLOR } from "../constants";
import RoundRectangle from "phaser3-rex-plugins/plugins/roundrectangle.js";
import { Text } from "../components/common/Text";

import Button from "phaser3-rex-plugins/plugins/input/button/Button";
import { percentToHex } from "../util";

export default class MainScene extends BaseScene {
  private name: TextInput;
  private buttonShape: RoundRectangle;
  private buttonText: Text;

  constructor() {
    super("MainScene");
  }

  preload() {
    this.load.image("logo", "assets/logo.png");
  }

  create() {
    super.create();

    // Logo
    const logo = this.add.image(this.getW() / 2, 250, "logo");
    logo.setScale(1.5, 1.5);
    this.tweens.add({
      targets: logo,
      y: logo.y - 30,
      duration: 2000,
      ease: "Sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    // Network
    const status = this.add.existing(
      new NetStatus(this, this.getW() - 32, this.getH() - 32, "bFont")
    );
    const network = connectToServer(status);

    // Name Input
    this.name = this.add.existing(
      new TextInput(this, this.getW() / 2, 600, {
        width: 300,
        height: 80,
        backgroundColor: MENU_BACKGROUND_COLOR,
        fontFamily: "beaufort",
        fontSize: "36px",
        maxLength: 12,
        minLength: 3,
        paddingLeft: "20px",
        paddingRight: "20px",
        paddingTop: "10px",
        paddingBottom: "1px",
        align: "center",
        tooltip: "Name must be between 3 and 12 characters",
        placeholder: "Enter name",
      })
    );
    this.name.setStyle("border-bottom", "5px solid grey");

    // Connect Button
    this.buttonShape = this.add.existing(
      new RoundRectangle(this, this.getW() / 2, 750, 300, 80, 10)
    );
    this.buttonShape.setStrokeStyle(4, 0xffa500);

    this.buttonText = this.add.existing(
      new Text(this, this.getW() / 2, 750, "Connect", "bFont", 36)
    );
    this.buttonText.setOrigin(0.5, 0.5);
    this.buttonText.setAlign("center");
    this.buttonText.setColor("#FFA500");

    const connectButton = new Button(this.buttonShape);
  }

  update(_time: number, _delta: number) {
    if (
      this.name.text.trim().length < this.name.minLength &&
      this.name.text.trim().length > 0
    ) {
      this.name.fontColor = "red";
    } else {
      this.name.fontColor = "white";
    }

    if (this.name.text.trim().length >= this.name.minLength) {
      this.buttonShape.setVisible(true);
      this.buttonText.setVisible(true);
    } else {
      this.buttonShape.setVisible(false);
      this.buttonText.setVisible(false);
    }
  }
}
