import Phaser from "phaser";
import backgroundImg from "./assets/background.png";
import birdImg from "./assets/bird.gif";
import palmImg from "./assets/palm_tree.png";
class MyGame extends Phaser.Scene {
    constructor() {
        super();
    }

    preload() {
        this.load.image("background", backgroundImg);
        this.load.image("bird", birdImg);
        this.load.image("tree", palmImg);
    }

    create() {
        this.tree = this.add
            .sprite(800, 800 - (166 + 175), "tree")
            .setOrigin(0, 0);
        this.physics.add.existing(this.tree, false);
        this.tree.body.setVelocity(-500, 0);

        this.background = this.add
            .tileSprite(0, 800 - 166, 1000, 166, "background")
            .setOrigin(0, 0);
        this.physics.add.existing(this.background, true);

        this.bird = this.add.sprite(500, 88, "bird");
        this.physics.add.existing(this.bird, false);
        this.bird.body.setBounce(0.2);
        this.bird.body.setCollideWorldBounds(true);
        this.bird.body.setGravityY(180);

        this.cursorKeys = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(this.bird, this.background);
        this.physics.add.collider(this.tree, this.bird, (obj1, obj2) => {
            console.log("PANG!", obj1, obj2);
        });
        this.physics.add.collider(this.tree, this.background);
    }

    update() {
        this.background.tilePositionX += 4;
        // this.tree.body.setX(this.tree.x - 2);
        if (this.tree.x < 0) {
            this.tree.body.x = 1000;
        }
        if (this.cursorKeys.space.isDown) {
            // this.bird.setY(this.bird.y - 5);
            this.bird.body.setVelocityY(-200);
        } else {
            // this.bird.setY(this.bird.y + 15);
        }
    }
}

const config = {
    type: Phaser.AUTO,
    parent: "phaser-example",
    width: 1000,
    height: 800,
    scene: MyGame,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 200 },
            debug: true,
        },
    },
};

const game = new Phaser.Game(config);
