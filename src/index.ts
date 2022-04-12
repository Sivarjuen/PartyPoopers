import 'phaser';
import MainScene from "./scenes/MainScene";

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#000000',
    scale: {
        parent: 'wrapper',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: window.innerWidth,
        height: window.innerHeight
    },
    scene: MainScene,
    mobile: window.innerHeight > window.innerWidth
};

const game = new Phaser.Game(config);

var mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)

game.registry.set("mobile", mobile);
game.registry.set("debug", true);