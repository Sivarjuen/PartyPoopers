import { GameObjects } from "phaser";
import { GameScene } from "../../scenes/GameScene";
import { COLOR, RGB } from "../../util";

export const TICTACTOE_SCENE_NAME = "TicTacToe";

const GRID_SIZE = 800;

enum Shape {
    O = "O",
    X = "X",
}

export default class TicTacToeScene extends GameScene {
    private grid: GameObjects.Grid;
    private cells: number[];

    constructor() {
        super(TICTACTOE_SCENE_NAME);
    }

    create() {
        this.cells = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.grid = this.add.grid(
            this.sys.game.canvas.width / 2,
            100 + this.sys.game.canvas.height / 2,
            GRID_SIZE,
            GRID_SIZE,
            GRID_SIZE / 3,
            GRID_SIZE / 3,
            RGB(5, 6, 23),
            1,
            RGB(51, 51, 51)
        );

        this.handleInput();
    }

    handleInput() {
        this.input.keyboard.on("keyup", (event: any) => {
            switch (event.code) {
                case "ArrowLeft": {
                    this.scene.start("LobbyScene");
                    break;
                }
                default:
                    break;
            }
        });
    }
}
