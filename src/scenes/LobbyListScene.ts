import "phaser";
import { BaseScene } from "./BaseScene";
import { Button } from "../components/common/Button";
import { Text } from "../components/common/Text";
import { LobbyListItem, Vector2D } from "../types";

const MAX_LOBBIES = 3;

export default class LobbyListScene extends BaseScene {
  private lobbies: Button[] = [];
  private createLobby: Button;
  private confirmText: Text;
  private lobby_positions: Vector2D[][] = [];

  constructor() {
    super("LobbyListScene");
  }

  create(): void {
    super.create();

    // Lobby positions
    this.lobby_positions = [
      [{ x: this.getW() / 2, y: this.getH() / 2 }],
      [
        { x: this.getW() / 3, y: this.getH() / 2 },
        { x: (2 * this.getW()) / 3, y: this.getH() / 2 },
      ],
      [
        { x: this.getW() / 4, y: this.getH() / 2 },
        { x: this.getW() / 2, y: this.getH() / 2 },
        { x: (3 * this.getW()) / 4, y: this.getH() / 2 },
      ],
    ];

    // Lobby button(s)
    const button_width = 400;
    const button_height = 150;
    const button_font_size = 36;

    this.confirmText = new Text(this, 0, 0, "", "bFont", 64);
    this.confirmText.setColor("#EEEEEE");
    this.confirmText.setOrigin(0.5, 0.5);
    this.add.existing(this.confirmText);
    this.confirmText.setVisible(false);
    this.confirmText.setDepth(10);

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
    this.createLobby.shape.setStrokeStyle(4, 0x444444);
    this.createLobby.shape.setFillStyle(0x444444, 0x888888);
    this.createLobby.text.setColor(0xaaaaaa);
    this.createLobby.shape.on("pointerover", () => {
      if (!this.createLobby.selected) {
        this.createLobby.shape.setStrokeStyle(10, 0x444444);
        this.createLobby.shape.setFillStyle(0x666666, 0x555555);
        this.createLobby.text.setFontSize(button_font_size + 2);
        this.createLobby.text.setColor(0xdddddd);
      }
    });
    this.createLobby.shape.on("pointerout", () => {
      if (!this.createLobby.selected) {
        this.createLobby.shape.setStrokeStyle(4, 0x444444);
        this.createLobby.shape.setFillStyle(0x444444, 0x888888);
        this.createLobby.text.setFontSize(button_font_size);
        this.createLobby.text.setColor(0xbbbbbb);
      }
    });
    this.createLobby.button.on("click", () => {
      if (this.createLobby.selected) {
        console.log("Creating");
      } else {
        this.createLobby.selected = true;
        this.createLobby.shape.setStrokeStyle(6, 0xffffff);
        this.createLobby.shape.setFillStyle(0x1a9f61, 0x111111);
        this.createLobby.text.setVisible(false);
        this.confirmText.text = "Confirm";
        this.confirmText.setVisible(true);
        this.confirmText.setPosition(this.createLobby.shape.getCenter().x, this.createLobby.shape.getCenter().y);

        this.lobbies.forEach((b) => {
          b.selected = false;
          b.text.setVisible(true);
          b.shape.setStrokeStyle(1, 0xcccccc);
          b.shape.setFillStyle(0xeeeeee, 0x444444);
          b.text.setColor(0x222222);
          b.text.setFontSize(button_font_size);
        });
      }
    });
    this.createLobby.addToScene(this);
    this.createLobby.hide();

    this.lobbies.push(new Button(this, -100, 0, button_width, button_height, null, "Lobby1", button_font_size));
    this.lobbies.push(new Button(this, -100, 0, button_width, button_height, null, "Lobby2", button_font_size));
    this.lobbies.push(new Button(this, -100, 0, button_width, button_height, null, "Lobby3", button_font_size));
    this.lobbies.forEach((lobbyButton) => {
      lobbyButton.shape.setStrokeStyle(1, 0xcccccc);
      lobbyButton.shape.setFillStyle(0xeeeeee, 0x444444);
      lobbyButton.text.setColor(0x222222);
      lobbyButton.shape.on("pointerover", () => {
        if (!lobbyButton.selected) {
          lobbyButton.shape.setStrokeStyle(6, 0xffffff);
          lobbyButton.shape.setFillStyle(0xeeeeee, 0x111111);
          lobbyButton.text.setColor(0x000000);
          lobbyButton.text.setFontSize(button_font_size + 2);
        }
      });
      lobbyButton.shape.on("pointerout", () => {
        if (!lobbyButton.selected) {
          lobbyButton.shape.setStrokeStyle(1, 0xcccccc);
          lobbyButton.shape.setFillStyle(0xeeeeee, 0x444444);
          lobbyButton.text.setColor(0x222222);
          lobbyButton.text.setFontSize(button_font_size);
        }
      });
      lobbyButton.button.on("click", () => {
        if (lobbyButton.selected) {
          console.log("Joining");
        } else {
          lobbyButton.selected = true;
          lobbyButton.shape.setFillStyle(0x1a9f61, 0x111111);
          lobbyButton.text.setVisible(false);
          this.confirmText.text = "Join";
          this.confirmText.setVisible(true);
          this.confirmText.setPosition(lobbyButton.shape.getCenter().x, lobbyButton.shape.getCenter().y);
          if (this.createLobby.shape.visible) {
            this.createLobby.text.setVisible(true);
            this.createLobby.selected = false;
            this.createLobby.shape.setStrokeStyle(4, 0x444444);
            this.createLobby.shape.setFillStyle(0x444444, 0x888888);
          }
          this.lobbies.forEach((b) => {
            if (b !== lobbyButton && b.shape.visible) {
              b.selected = false;
              b.text.setVisible(true);
              b.shape.setStrokeStyle(1, 0xcccccc);
              b.shape.setFillStyle(0xeeeeee, 0x444444);
              b.text.setColor(0x222222);
              b.text.setFontSize(button_font_size);
            }
          });
        }
      });
      lobbyButton.addToScene(this);
      lobbyButton.hide();
    });

    this.updateLobbyDetails([{ name: "User1", players: 2 }]);
  }

  updateLobbyPositions(openLobbies: number) {
    this.createLobby.hide();
    this.lobbies.forEach((lobby) => lobby.hide());
    this.confirmText.setVisible(false);
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

  updateLobbyDetails(details: LobbyListItem[]) {
    for (let i = 0; i < details.length; i++) {
      if (i >= MAX_LOBBIES) continue;
      this.lobbies[i].text.text = `${details[i].name}'s lobby\n${details[i].players}/8`;
    }

    this.updateLobbyPositions(Math.min(details.length, MAX_LOBBIES));
  }
}
