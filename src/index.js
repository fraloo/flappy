import Phaser from "phaser";
import backgroundImg from "./assets/background.png";
import birdImg from "./assets/bird.gif";

class MyGame extends Phaser.Scene {
    constructor() {
        super();
    }

    preload() {
        this.load.image("background", backgroundImg);
        this.load.image("bird", birdImg);
    }

    create() {
        this.background = this.add
            .tileSprite(0, 800 - 166, 1000, 166, "background")
            .setOrigin(0, 0);

        this.bird = this.add.sprite(500, 88, "bird");

        this.cursorKeys = this.input.keyboard.createCursorKeys();

        // this.physics.add.    (this.background, this.bird);
    }

    update() {
        this.background.tilePositionX += 4;

        if (this.cursorKeys.space.isDown) {
            this.bird.setY(this.bird.y - 5);
        } else {
            this.bird.setY(this.bird.y + 5);
        }
    }
}

const config = {
    type: Phaser.AUTO,
    parent: "phaser-example",
    width: 1000,
    height: 800,
    scene: MyGame,
};

const game = new Phaser.Game(config);
