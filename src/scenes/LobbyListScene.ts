import { BaseScene } from "./BaseScene";
import { Button } from "../components/common/Button";
import { LobbyListItem, Vector2D } from "../types";

export default class LobbyListScene extends BaseScene {
  private lobbies: Button[] = [];
  private createLobby: Button;
  private lobby_positions: Vector2D[][] = [];

  constructor() {
    super("LobbyListScene");
  }

  create(): void {
    super.create();

    // Lobby positions
    this.lobby_positions = [
      [
        {
          x: this.getW() / 2,
          y: this.getH() / 2,
        },
      ],
      [
        {
          x: this.getW() / 3,
          y: this.getH() / 2,
        },
        {
          x: (2 * this.getW()) / 3,
          y: this.getH() / 2,
        },
      ],
      [
        {
          x: this.getW() / 4,
          y: this.getH() / 2,
        },
        {
          x: this.getW() / 2,
          y: this.getH() / 2,
        },
        {
          x: (3 * this.getW()) / 4,
          y: this.getH() / 2,
        },
      ],
    ];

    // Lobby button(s)
    this.createLobby = new Button(this, 0, 0, 400, 300, null, "+\n\nCreate lobby", 36);
    this.createLobby.addToScene(this);
    this.createLobby.hide();

    this.lobbies.push(new Button(this, 0, 0, 400, 300, null, "Lobby1", 36));
    this.lobbies.push(new Button(this, 0, 0, 400, 300, null, "Lobby2", 36));
    this.lobbies.push(new Button(this, 0, 0, 400, 300, null, "Lobby3", 36));
    this.lobbies.forEach((lobbyButton) => {
      lobbyButton.addToScene(this);
      lobbyButton.hide();
    });

    this.updateLobbyDetails([
      {
        name: "User1",
        players: 2,
      },
    ]);
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

  updateLobbyDetails(details: LobbyListItem[]) {
    for (let i = 0; i < details.length; i++) {
      this.lobbies[i].text.text = `${details[i].name}'s lobby\n\n${details[i].players}/8`;
    }

    this.updateLobbyPositions(details.length);
  }
}
