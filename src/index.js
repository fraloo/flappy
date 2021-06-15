import Phaser from "phaser";
import backgroundImg from "./assets/background.png";
import birdImg from "./assets/bird.gif";
import palmImg from "./assets/palm_tree.png";
import cloudImg from "./assets/cloud.png";
class TheGame extends Phaser.Scene {
    constructor() {
        super();
    }

    initialize() {
        Phaser.Scene.call(this, { key: "TheGame" });
    }

    preload() {
        this.load.image("background", backgroundImg);
        this.load.image("bird", birdImg);
        this.load.image("tree", palmImg);
        this.load.image("cloud", cloudImg);
    }

    create() {
        // this.cameras.main.setBackgroundColor("#333333");
        // Tree
        this.tree = this.add
            .sprite(800, 800 - (166 + 175), "tree")
            .setOrigin(0, 0);
        this.physics.add.existing(this.tree, false);
        this.tree.body.setVelocity(-550, 0);

        // ClaoOoud
        this.clud = this.add.sprite(1200, 50, "cloud").setOrigin(0, 0);
        this.physics.add.existing(this.clud, true);
        // this.clud.body.setVelocity(-100, 100);

        // Background
        this.background = this.add
            .tileSprite(0, 800 - 166, 1000, 166, "background")
            .setOrigin(0, 0);
        this.physics.add.existing(this.background, true);

        // BiRD
        this.bird = this.add.sprite(500, 88, "bird");
        this.physics.add.existing(this.bird, false);
        this.bird.body.setBounce(0.2);
        this.bird.body.setCollideWorldBounds(true);
        this.bird.body.setGravityY(180);

        this.cursorKeys = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(this.bird, this.background);
        this.physics.add.collider(this.tree, this.bird, (obj1, obj2) => {
            console.log("Tree!", obj1, obj2);
            this.scene.start("GameOver", {
                message: "Game Over",
            });
        });
        this.physics.add.collider(this.clud, this.bird, (obj1, obj2) => {
            console.log("CLUD CLUD CLUD!", obj1, obj2);
            this.scene.start("GameOver", {
                message: "Game Over",
            });
        });
        this.physics.add.collider(this.tree, this.background);
        this.physics.add.collider(this.clud, this.background);
    }

    update() {
        this.background.tilePositionX += 4;
        // this.tree.body.setX(this.tree.x - 2);
        if (this.tree.x + this.tree.width < 0) {
            this.tree.body.x = 1000;
        }
        this.clud.x = this.clud.body.x -= 5;
        if (this.clud.x + this.clud.width < 0) {
            this.clud.body.x = this.clud.x = 1000;
        }
        if (this.cursorKeys.space.isDown) {
            // this.bird.setY(this.bird.y - 5);
            this.bird.body.setVelocityY(-250);
        } else {
            // this.bird.setY(this.bird.y + 15);
        }
    }
}

var GameOver = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function () {
        Phaser.Scene.call(this, { key: "GameOver" });
    },
    init: function (data) {
        this.message = data.message;
    },
    preload: function () {},
    create: function () {
        console.log("HELLO", this.message);
        var text = this.add
            .text(500, 200, this.message, {
                fontSize: 50,
                color: "#ffffff",
                fontStyle: "bold",
            })
            .setOrigin(0.5);
    },
    update: function () {
        // var cursors = this.input.keyboard.createCursorKeys();
        // if (cursor.enter.isDown) {
        //     this.scene.start("TheGame");
        // }
    },
});

const config = {
    type: Phaser.AUTO,
    parent: "phaser-example",
    width: 1000,
    height: 800,
    scene: [TheGame, GameOver],
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 200 },
            debug: true,
        },
    },
};

const game = new Phaser.Game(config);
