import "phaser";
import { BaseScene } from "./BaseScene";
import { LobbyList } from "../components/lobby/LobbyList";
import { RoomCodeText } from "../components/lobby/Text";
import { ReadyButton, UnreadyButton } from "../components/common/Button";
import { Lobby, LobbyPlayer } from "src/types";
import { Game, getGameScene } from "../games/gameSelector";

export default class LobbyScene extends BaseScene {
    private socket: any;
    private readyButton: Phaser.GameObjects.DOMElement;
    private unreadyButton: Phaser.GameObjects.DOMElement;
    private isReady: boolean;
    private lobbyCode: string;
    private lobbyEntries: Phaser.GameObjects.DOMElement;

    constructor() {
        super("LobbyScene");
    }

    init(data: any): void {
        this.lobbyCode = data.lobbyCode;
    }

    create(): void {
        super.create();

        this.socket = this.registry.get("socket");

        const names: string[] = ["abc", "def", "ghi", "1", "2", "3", "4"];

        this.add.dom(this.getW() / 2, 180, RoomCodeText(this.lobbyCode));

        this.lobbyEntries = this.add.dom(
            this.getW() / 2,
            this.getH() / 2,
            LobbyList(names, 2, [0, 4])
        );

        this.readyButton = this.add.dom(this.getW() / 2, 900, ReadyButton);
        this.unreadyButton = this.add.dom(this.getW() / 2, 900, UnreadyButton);

        this.readyButton.addListener("click");
        this.readyButton.on("click", () => this.toggleReady(true));

        this.unreadyButton.addListener("click");
        this.unreadyButton.on("click", () => this.toggleReady(false));

        this.unreadyButton.setVisible(false);
        this.isReady = false;

        this.handleInput();
        if (this.socket) this.handleNetwork();
    }

    handleNetwork() {
        this.socket.emit("getLobbyDetails", this.lobbyCode);

        this.socket.on("lobbyDetails", (lobby: Lobby | undefined) => {
            if (lobby !== undefined) {
                this.updateLobbyDetails(lobby);
            } else {
                console.error(
                    `Failed to get lobby details for code: '${this.lobbyCode}'`
                );
            }
        });
    }

    handleInput() {
        this.input.keyboard.on("keyup", (event: any) => {
            switch (event.code) {
                case "ArrowLeft": {
                    this.scene.start("MainScene");
                    break;
                }
                case "ArrowRight": {
                    this.scene.start(getGameScene(Game.TICTACTOE));
                    break;
                }
                default:
                    break;
            }
        });
    }

    toggleReady(ready: boolean) {
        this.socket.emit("playerReady", this.lobbyCode, ready);

        this.socket.on("serverReady", (serverReady: boolean) => {
            this.isReady = serverReady;
            this.unreadyButton.setVisible(serverReady);
            this.readyButton.setVisible(!serverReady);
        });
    }

    updateLobbyDetails(lobbyDetails: Lobby) {
        const players = Object.keys(lobbyDetails.players);
        const playerNames: string[] = [];
        let highlightIndex: number = 0;
        const readyIndexes: number[] = [];

        players.forEach((playerId, index) => {
            const player: LobbyPlayer = lobbyDetails.players[playerId];
            playerNames.push(player.name);
            if (player.name === this.socket.username) highlightIndex = index;
            if (player.ready) readyIndexes.push(index);
        });

        this.lobbyEntries.setElement(
            LobbyList(playerNames, highlightIndex, readyIndexes)
        );
    }
}
