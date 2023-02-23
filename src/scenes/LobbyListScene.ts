import "phaser";
import { BaseScene } from "./BaseScene";
import { Button } from "../components/common/ButtonOld";
import { Lobby, Vector2D } from "../types";
import { LobbyButton } from "../components/common/Button";
import { ConnectedAsText } from "../components/lobby/Text";

const MAX_LOBBIES = 3;

export default class LobbyListScene extends BaseScene {
  private lobbies: Button[] = [];
  private createLobby: Button;
  private confirmButton: Phaser.GameObjects.DOMElement;
  private lobby_positions: Vector2D[][] = [];
  private socket: any;

  constructor() {
    super("LobbyListScene");
  }

  create(): void {
    super.create();

    this.socket = this.registry.get("socket");

    this.add.dom(this.getW() / 2, this.getH() / 6, ConnectedAsText(this.socket.username));

    // Lobby button(s)
    const button_width = 400;
    const button_height = 150;
    const button_font_size = 36;

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

    const confirm_position = { x: this.getW() / 2, y: (this.getH() * 3.5) / 5 };

    this.confirmButton = this.add.dom(confirm_position.x, confirm_position.y, LobbyButton);

    this.confirmButton.setVisible(false);
    // TODO - add on click listener

    this.createLobby = new Button(
      this,
      -100,
      0,
      button_width,
      button_height,
      null,
      "+\nCreate lobby",
      button_font_size
    );

    this.createLobby.setBaseStyle((b: Button) => {
      b.shape.setStrokeStyle(0, 0x444444);
      b.shape.setFillStyle(0x444444, 0x888888);
      b.text.setColor(0xaaaaaa);
      b.text.setFontSize(button_font_size);
    });

    this.createLobby.setHoverStyle((b: Button) => {
      b.shape.setStrokeStyle(0, 0x444444);
      b.shape.setFillStyle(0x666666, 0x555555);
      b.text.setFontSize(button_font_size + 2);
      b.text.setColor(0xdddddd);
    });

    this.createLobby.setSelectedStyle((b: Button) => {
      b.shape.setStrokeStyle(6, 0xffffff);
      b.shape.setFillStyle(0x666666, 0x555555);
    });

    this.createLobby.button.on("click", () => {
      this.createLobby.selected = true;
      this.confirmButton.visible = true;
      this.confirmButton.node.innerHTML = "Create";

      this.lobbies.forEach((b) => {
        b.selected = false;
        b.applyBaseStyle();
      });
    });
    this.createLobby.addToScene(this);
    this.createLobby.hide();

    this.lobbies.push(new Button(this, -100, 0, button_width, button_height, null, "Lobby1", button_font_size));
    this.lobbies.push(new Button(this, -100, 0, button_width, button_height, null, "Lobby2", button_font_size));
    this.lobbies.push(new Button(this, -100, 0, button_width, button_height, null, "Lobby3", button_font_size));
    this.lobbies.forEach((lobbyButton) => {
      lobbyButton.setBaseStyle((b: Button) => {
        b.shape.setStrokeStyle(0, 0xcccccc);
        b.shape.setFillStyle(0x2b53e3, 0xb3b3b3);
        b.text.setColor(0xe6e6e6);
        b.text.setFontSize(button_font_size);
      });

      lobbyButton.setHoverStyle((b: Button) => {
        b.shape.setFillStyle(0x2554fe, 0x111111);
        b.text.setFontSize(button_font_size + 2);
        b.text.setColor(0xffffff);
      });

      lobbyButton.setSelectedStyle((b: Button) => {
        b.shape.setStrokeStyle(6, 0xffffff);
        b.shape.setFillStyle(0x2554fe, 0x111111);
      });

      lobbyButton.button.on("click", () => {
        lobbyButton.selected = true;
        this.confirmButton.visible = true;
        this.confirmButton.node.innerHTML = "Join";
        if (this.createLobby.shape.visible) {
          this.createLobby.selected = false;
          this.createLobby.applyBaseStyle();
        }
        this.lobbies.forEach((b) => {
          if (b !== lobbyButton && b.shape.visible) {
            b.selected = false;
            b.applyBaseStyle();
          }
        });
      });
      lobbyButton.addToScene(this);
      lobbyButton.hide();
    });

    this.handleNetwork();
  }

  handleNetwork() {
    this.socket.emit("getLobbyDetails");
    this.socket.on("lobbyDetails", ({ lobbies }) => {
      this.updateLobbyDetails(lobbies);
    });
  }

  updateLobbyPositions(openLobbies: number) {
    this.createLobby.hide();
    this.lobbies.forEach((lobby) => lobby.hide());
    switch (openLobbies) {
      case 0:
        this.createLobby.setPosition(this.lobby_positions[0][0].x, this.lobby_positions[0][0].y);
        this.createLobby.show();
        break;
      case 1:
        this.lobbies[0].setPosition(this.lobby_positions[1][0].x, this.lobby_positions[1][0].y);
        this.createLobby.setPosition(this.lobby_positions[1][1].x, this.lobby_positions[1][1].y);
        this.lobbies[0].show();
        this.createLobby.show();
        break;
      case 2:
        this.lobbies[0].setPosition(this.lobby_positions[2][0].x, this.lobby_positions[2][0].y);
        this.lobbies[1].setPosition(this.lobby_positions[2][1].x, this.lobby_positions[2][1].y);
        this.createLobby.setPosition(this.lobby_positions[2][2].x, this.lobby_positions[2][2].y);
        this.lobbies[0].show();
        this.lobbies[1].show();
        this.createLobby.show();
        break;
      case 3:
        this.lobbies[0].setPosition(this.lobby_positions[2][0].x, this.lobby_positions[2][0].y);
        this.lobbies[1].setPosition(this.lobby_positions[2][1].x, this.lobby_positions[2][1].y);
        this.lobbies[2].setPosition(this.lobby_positions[2][2].x, this.lobby_positions[2][2].y);
        this.lobbies[0].show();
        this.lobbies[1].show();
        this.lobbies[2].show();
        break;

      default:
        console.error("Invalid number of lobby positions");
        break;
    }
  }

  updateLobbyDetails(details: Lobby[]) {
    for (let i = 0; i < details.length; i++) {
      if (i >= MAX_LOBBIES) continue;
      this.lobbies[i].text.text = `${details[i].hostname}'s lobby\n${details[i].players.length}/8`;
    }

    this.updateLobbyPositions(Math.min(details.length, MAX_LOBBIES));
  }
}
