import 'phaser';
import { Button } from './components/button';

export default class Main extends Phaser.Scene {

    logo;

    constructor() {
        super('main');
    }

    preload() {
        this.load.image('logo', 'assets/phaser3-logo.png');
    }

    create() {
        if(this.registry.get("mobile") && window.innerHeight < window.innerWidth) {
            this.add.text(window.innerWidth / 2, window.innerHeight / 2, "Please turn your device \nto portrait mode and \nrefresh the page")
            .setFontSize(40)
            .setOrigin(0.5)
            .setPadding(10)
            .setStyle({fill: '#fff', align: 'center'})
            return
        }

        this.logo = this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'logo');

        const button = new Button(window.innerWidth / 2, 100, 'Start Game', this, () => console.log("Pressed"));
        
        this.tweens.add({
            targets: this.logo,
            y: this.logo.y - 150,
            duration: 3000,
            ease: 'Sine.inOut',
            yoyo: true,
            repeat: -1 
        });
    }
}

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
    scene: Main,
    mobile: window.innerHeight > window.innerWidth
};

const game = new Phaser.Game(config);

var mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)

// game.registry.set("mobile", window.innerHeight > window.innerWidth);
game.registry.set("mobile", mobile);