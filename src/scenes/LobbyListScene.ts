import "phaser";
import { BaseScene } from "./BaseScene";
import { Lobby, Vector2D } from "../types";
import { LobbyButton } from "../components/common/Button";
import { ConnectedAsText, LobbyTitle } from "../components/lobby/Text";
import { LobbyCreate, LobbyList, LobbyListItem } from "../components/lobby/LobbyList";

const MAX_LOBBIES = 3;

export default class LobbyListScene extends BaseScene {
  // private lobbies: Button[];
  // private createLobby: Button;
  private joinLobbyButton: Phaser.GameObjects.DOMElement;
  private lobby_positions: Vector2D[][];
  private socket: any;

  constructor() {
    super("LobbyListScene");
    // this.lobbies = [];
    this.lobby_positions = [];
  }

  create(): void {
    super.create();

    this.socket = this.registry.get("socket");

    this.add.dom(this.getW() / 2, this.getH() / 7 - 40, LobbyTitle);
    this.add.dom(this.getW() / 2, this.getH() / 7 + 60, ConnectedAsText(this.socket?.username ?? "local"));

    // Lobby positions
    this.lobby_positions = [
      [{ x: this.getW() / 2, y: (this.getH() * 2) / 5 }],
      [
        { x: this.getW() / 3, y: (this.getH() * 2) / 5 },
        { x: (2 * this.getW()) / 3, y: (this.getH() * 2) / 5 },
      ],
      [
        { x: this.getW() / 4, y: (this.getH() * 2) / 5 },
        { x: this.getW() / 2, y: (this.getH() * 2) / 5 },
        { x: (3 * this.getW()) / 4, y: (this.getH() * 2) / 5 },
      ],
    ];

    const createLobby: HTMLElement = LobbyCreate;
    const lobbyList: HTMLElement[] = [];
    lobbyList.push(LobbyListItem("abc"));
    lobbyList.push(LobbyListItem("def"));
    // lobbyList.push(LobbyListItem("def"));

    this.add.dom(this.getW() / 2, (this.getH() * 9) / 20, LobbyList(lobbyList, createLobby));

    const confirm_position = { x: this.getW() / 2, y: (this.getH() * 4) / 5 };
    this.joinLobbyButton = this.add.dom(confirm_position.x, confirm_position.y, LobbyButton as HTMLElement);

    this.joinLobbyButton.node.toggleAttribute("disabled");
    this.joinLobbyButton.node.textContent = "Confirm";
    // TODO - add on click listener

    if (this.socket) this.handleNetwork();
  }

  handleNetwork() {
    this.socket.emit("getLobbyDetails");
    // this.socket.on("lobbyDetails", ({ lobbies }) => {
    //   this.updateLobbyDetails(lobbies);
    // });
  }

  updateLobbyDetails(details: Lobby[]) {
    for (let i = 0; i < details.length; i++) {
      if (i >= MAX_LOBBIES) continue;
      // this.lobbies[i].text.text = `${details[i].hostname}'s lobby\n${details[i].players.length}/8`;
    }
  }
}
