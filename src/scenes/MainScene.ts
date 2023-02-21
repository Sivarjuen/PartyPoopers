import { BaseScene } from "./BaseScene";
import { NetStatus } from "../components/lobby/NetStatus";
import { TextInput } from "../components/lobby/TextInput";
import { Button } from "../components/common/Button";
import connectToServer, { join } from "../network/Core";
import { MENU_BACKGROUND_COLOR } from "../constants";
import { Footer } from "../components/lobby/Footer";

export default class MainScene extends BaseScene {
  private name: TextInput;
  private button: Button;
  private usernameLoaded = false;

  constructor() {
    super("MainScene");
  }

  preload(): void {
    this.load.image("logo", "assets/logo.png");
  }

  create(): void {
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

    // Network
    const status = this.add.existing(new NetStatus(this, this.getW() - 32, this.getH() - 32, "bFont"));

    // Version
    this.add.existing(new Footer(this, 32, this.getH() - 32, "bFont"));

    const socket = connectToServer(status);
    this.registry.set("socket", socket);

    // Connect Button
    this.button = new Button(this, this.getW() / 2, 750, 300, 80, null, "Connect", 36, null, () => {
      this.usernameLoaded = true;
      join(socket, this.name.text, (lobbies: any): void => {
        this.scene.start("LobbyListScene", { lobbies: lobbies });
      });
    });
    this.button.text.setColor(0xffa500);
    this.button.shape.on("pointerover", () => {
      this.button.shape.setFillStyle(0xffa500, 0x111111);
      this.button.text.setFontSize(38);
      this.button.text.setColor(0x0f0f0f);
    });
    this.button.shape.on("pointerout", () => {
      this.button.shape.setFillStyle(0xffa500, 0x000000);
      this.button.text.setFontSize(36);
      this.button.text.setColor(0xffa500);
    });
    this.button.addToScene(this);
  }

  update(_time: number, _delta: number) {
    const network = this.registry.get("socket");
    if (!this.usernameLoaded && network.username) {
      this.name.text = network.username;
      this.usernameLoaded = true;
    }
    if (this.name.text.trim().length < this.name.minLength && this.name.text.trim().length > 0) {
      this.name.fontColor = "red";
    } else {
      this.name.fontColor = "white";
    }

    if (this.name.text.trim().length >= this.name.minLength && network.connected) {
      this.button.show();
    } else {
      this.button.hide();
    }
  }
}
