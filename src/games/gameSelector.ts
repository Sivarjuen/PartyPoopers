import { TICTACTOE_SCENE_NAME } from "./tictactoe/TicTacToeScene";

export enum Game {
    TICTACTOE = "Tic-Tac-Toe",
    CONNECT4 = "Connect 4",
}

const gameSceneMap: Map<Game, string> = new Map([
    [Game.TICTACTOE, TICTACTOE_SCENE_NAME],
]);

export const getGameScene = (game: Game) => {
    return gameSceneMap.get(game);
};
