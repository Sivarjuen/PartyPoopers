import "phaser";
import MainScene from "./scenes/MainScene";

const config = {
  type: Phaser.AUTO,
  backgroundColor: "#020115",
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
  scene: MainScene,
};

const game = new Phaser.Game(config);

const mobile =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
    navigator.userAgent
  );

game.registry.set("mobile", mobile);
game.registry.set("debug", true);
