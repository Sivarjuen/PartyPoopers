import { BaseScene } from "./BaseScene";
import { NetStatus } from "../components/lobby/NetStatus";
import { TextInput } from "../components/lobby/TextInput";
import { Button } from "../components/common/Button";
import connectToServer from "../network/Core";
import { MENU_BACKGROUND_COLOR } from "../constants";

import { percentToHex } from "../util";

export default class MainScene extends BaseScene {
  private name: TextInput;
  private button: Button;

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
    this.button = new Button(this, this.getW() / 2, 750, 300, 80, null, "Connect", 36, null, null);
    this.button.addToScene(this);
  }

  update(_time: number, _delta: number) {
    if (this.name.text.trim().length < this.name.minLength && this.name.text.trim().length > 0) {
      this.name.fontColor = "red";
    } else {
      this.name.fontColor = "white";
    }

    if (this.name.text.trim().length >= this.name.minLength) {
      this.button.show();
    } else {
      this.button.hide();
    }
  }
}
