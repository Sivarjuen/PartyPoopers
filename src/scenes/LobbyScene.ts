import "phaser";
import { BaseScene } from "./BaseScene";
import { LobbyList } from "../components/lobby/LobbyList";
import { LobbyOptions } from "../components/lobby/LobbyOptions";
import { RoomCodeText } from "../components/lobby/Text";
import { ReadyButton, UnreadyButton } from "../components/common/Button";

export default class LobbyScene extends BaseScene {
  private socket: any;
  private readyButton: Phaser.GameObjects.DOMElement;
  private unreadyButton: Phaser.GameObjects.DOMElement;
  private isReady: boolean;

  constructor() {
    super("LobbyScene");
  }

  create(): void {
    super.create();

    this.socket = this.registry.get("socket");

    const names: string[] = ["abc", "def", "ghi"];

    this.add.dom(this.getW() / 2, 180, RoomCodeText("1234"));

    const a = this.add.dom(this.getW() / 2, this.getH() / 2, LobbyList(names, 2, [0, 4]));
    // const b = this.add.dom(this.getW() / 2 + 380, this.getH() / 2, LobbyOptions());

    this.readyButton = this.add.dom(this.getW() / 2, 900, ReadyButton);
    this.unreadyButton = this.add.dom(this.getW() / 2, 900, UnreadyButton);

    this.readyButton.addListener("click");
    this.readyButton.on("click", () => this.toggleReady(false));

    this.unreadyButton.addListener("click");
    this.unreadyButton.on("click", () => this.toggleReady(true));

    this.unreadyButton.setVisible(false);
    this.isReady = false;

    this.handleInput();
    if (this.socket) this.handleNetwork();
  }

  handleNetwork() {
    this.socket.emit("getLobbyDetails");
    // this.socket.on("lobbyDetails", ({ lobbies }) => {
    //   this.updateLobbyDetails(lobbies);
    // });
  }

  handleInput() {
    this.input.keyboard.on("keyup", (event: any) => {
      switch (event.code) {
        case "ArrowLeft": {
          this.scene.start("MainScene");
          break;
        }
        default:
          break;
      }
      if (event.code === "ArrowLeft") {
        this.scene.start("MainScene");
      }
    });
  }

  toggleReady(ready: boolean) {
    this.isReady = ready;
    this.unreadyButton.setVisible(!ready);
    this.readyButton.setVisible(ready);
  }
}
