import "phaser";
import MainScene from "./scenes/MainScene";
import LobbyListScene from "./scenes/LobbyListScene";
import { MENU_BACKGROUND_COLOR } from "./constants";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: MENU_BACKGROUND_COLOR,
  dom: {
    createContainer: true,
  },
  scale: {
    parent: "wrapper",
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1920,
    height: 1080,
  },
  // @ts-ignore
  scene: [new MainScene(), new LobbyListScene()],
};

const game = new Phaser.Game(config);

const mobile =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
    navigator.userAgent
  );

game.registry.set("mobile", mobile);
game.registry.set("debug", true);
