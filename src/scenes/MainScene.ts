import { BaseScene } from "./BaseScene";
import { NetStatus } from "../components/lobby/NetStatus";
import { TextInput } from "../components/lobby/TextInput";
import { ConnectButton } from "../components/common/Button";
import connectToServer, { join } from "../network/Core";
import { Footer } from "../components/lobby/Footer";

export default class MainScene extends BaseScene {
  private name: TextInput;
  private button: Phaser.GameObjects.DOMElement;
  private usernameLoaded: Boolean;

  constructor() {
    super("MainScene");
    this.usernameLoaded = false;
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
    this.button = this.add.dom(this.getW() / 2, 750, ConnectButton);
    this.button.addListener("click");
    this.button.on("click", () => {
      this.usernameLoaded = true;
      join(socket, this.name.text, (): void => {
        this.scene.start("LobbyListScene");
      });
    });
    this.button.setVisible(false);
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
      this.button.setVisible(true);
    } else {
      this.button.setVisible(false);
    }
  }
}
