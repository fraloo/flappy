import Phaser from "phaser";
import backgroundImg from "./assets/background.png";
import birdImg from "./assets/bird.gif";
import MovingWalls from "./MovingWalls";

class MyGame extends Phaser.Scene {
    constructor() {
        super();
    }

    preload() {
        this.load.image("background", backgroundImg);
        this.load.image("bird", birdImg);
    }

    create() {
        const fakeground = this.physics.add
            .sprite(480, 800 - 166, "background")
            .setOrigin(0, 0);
        fakeground.body.setAllowGravity(false);
        fakeground.setImmovable(true);
        fakeground.body.setGravityY(0);
        this.background = this.add
            .tileSprite(0, 800 - 166, 1000, 166, "background")
            .setOrigin(0, 0);

        this.bird = this.physics.add.sprite(500, 88, "bird");
        this.bird.setBounce(0.2);
        this.bird.setCollideWorldBounds(true);
        this.bird.body.setGravityY(180);

        this.walls = new MovingWalls(this);

        this.cursorKeys = this.input.keyboard.createCursorKeys();

        // this.physics.overlap(this.bird.sprite, this.walls.spriteGroup);

        // this.physics.add.    (this.background, this.bird);
        this.physics.add.collider(this.bird, fakeground, (obj1, obj2) => {
            //    console.log("collideded", obj1, obj2);
        });

        this.addTimers();
    }

    addTimers() {
        this.time.addEvent({
            delay: 2000,
            loop: true,
            callback: this.walls.spawn,
            callbackScope: this.walls,
        });
    }

    update() {
        this.background.tilePositionX += 4;

        if (this.cursorKeys.space.isDown) {
            // this.bird.setY(this.bird.y - 5);
            this.bird.setVelocityY(-200);
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
            gravity: { y: 300 },
            debug: false,
        },
    },
};

const game = new Phaser.Game(config);
