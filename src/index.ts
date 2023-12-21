import "phaser";
import MainScene from "./scenes/MainScene";
import LobbyScene from "./scenes/LobbyScene";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  transparent: true,
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
  // prettier-ignore
  scene: [
    new LobbyScene(), 
    new MainScene(),
    
    
  ],
};

const game = new Phaser.Game(config);

const mobile =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
    navigator.userAgent
  );

game.registry.set("mobile", mobile);
game.registry.set("debug", true);
