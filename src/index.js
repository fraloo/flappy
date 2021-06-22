import Phaser from "phaser";
import backgroundImg from "./assets/background.png";
import birdImg from "./assets/bird.gif";
import palmImg from "./assets/palm_tree.png";
import cloudImg from "./assets/cloud.png";
import jumpSound from "./assets/audio/jump.mp3";
import gameoverSound from "./assets/audio/gameover.mp3";
import smackSound from "./assets/audio/smack.mp3";
class TheGame extends Phaser.Scene {
    constructor() {
        super({ key: "TheGame" });
    }


    preload() {
        this.load.image("background", backgroundImg);
        this.load.image("bird", birdImg);
        this.load.image("tree", palmImg);
        this.load.image("cloud", cloudImg);
        this.load.audio('jump', jumpSound);
        this.load.audio('smack', smackSound);
    }

    create() {
        this.score = 0
        this.treeRuns = 0
        this.cludRuns = 0
        this.cludSpeed = 5

        this.scoreBoard = this.add.text(10, 10, '', { fill: '#00ff00' });

        // Background
        var graphics = this.add.graphics();

        graphics.fillStyle(0xffffff, 1);
        graphics.fillRect(0, 0, 1000, 800);

        const stripes = 8;

        for (var i = 0; i < stripes; ++i) {
            var color = 0x33ccff;
            var alpha = 0.2 + ((i / stripes-1) * 0.8);
            graphics.fillStyle(color, alpha);
            graphics.fillRect(0, ((800 - 166)/stripes) * i , 1000, 256);
        }
        
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
        this.bird.body.setGravityY(400);

        // Sound
        this.jump = this.sound.add("jump");
        this.smack = this.sound.add("smack");

        this.physics.add.collider(this.bird, this.background);
        this.physics.add.collider(this.tree, this.bird, ()=> this.gameOver());
        this.physics.add.collider(this.clud, this.bird, ()=> this.gameOver());
        this.physics.add.collider(this.tree, this.background);
        this.physics.add.collider(this.clud, this.background);
        this.input.mouse.disableContextMenu();

        this.input.on('pointerup', (pointer) => {
            if (pointer.leftButtonReleased()) {
                this.jump.play();
                this.bird.body.setVelocityY(-350);
            }
        })
       // this.camera = this.cameras.add() 
       // this.camera.setBackgroundColor('rgba(240, 244, 180, 0.5)');
        
    }

    gameOver() {
        this.smack.play();
        this.scene.start("GameOver", {
            score: this.score,
        });
    }

    update() {
        this.background.tilePositionX += 4;
        // this.tree.body.setX(this.tree.x - 2);
        if (this.tree.x + this.tree.width < 0) {
            this.tree.body.x = 1000;
            this.treeRuns+=5
            const newVelocity = randomIntFromInterval(-400, -700) + this.treeRuns;
            this.tree.body.setVelocity(newVelocity, 0);
            this.score++
        }

        
        this.clud.x = this.clud.body.x -= this.cludSpeed;
        if (this.clud.x + this.clud.width < 0) {
            this.clud.body.x = this.clud.x = 1000;
            this.score++
            this.cludRuns++
            this.cludSpeed = randomIntFromInterval(3, 10);
        }
       
        
        this.scoreBoard.setText(`SCORE: ${this.score}`);
    }
}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}


class GameOver extends Phaser.Scene {
    constructor() {
        super({ key: "GameOver" });
    }

    init({score}) {
        this.score = score;
    }
    preload() {
        this.load.audio('gameoverSound', gameoverSound);
    }

    create() {

        // Background
        var graphics = this.add.graphics();

        graphics.fillStyle(0xffffff, 1);
        graphics.fillRect(0, 0, 1000, 800);

        const stripes = 8;

        for (var i = 0; i < stripes; ++i) {
            var color = 0x33ccff;
            var alpha = 0.2 + ((i / stripes-1) * 0.8);
            graphics.fillStyle(color, alpha);
            graphics.fillRect(0, ((800 - 166)/stripes) * i , 1000, 256);
        }
           

        // Background
        this.background = this.add
            .tileSprite(0, 800 - 166, 1000, 166, "background")
            .setOrigin(0, 0);
        this.physics.add.existing(this.background, true);

        this.gameoverSound = this.sound.add("gameoverSound");
        // this.gameoverSound.play();

        const heading = this.add
            .text(500, 200, "Game Over", {
                fontSize: 70,
                color: "#ffffff",
                fontStyle: "bold",
            })
            .setOrigin(0.5);

        const score = this.add
            .text(500, 350, `Total score: ${this.score}`, {
                fontSize: 90,
                color: "#eeff33",
                fontStyle: "bold",
            })
            .setOrigin(0.5);

        var button = this.add
            .text(500, 600, "Play Again", {
                fontSize: 25,
                color: "#ffffff",
                fontStyle: "ITALIC",
            })
            .setOrigin(0.5);
        button.setInteractive();

        button.on('pointerover', function () {
            button.setTint(0x7878ff);
        });
        button.on('pointerout', function () {
            button.setTint(0xffffff);
        });
        
        button.on("pointerup",(event) => {
            this.gameoverSound.stop()
            this.scene.start("TheGame");
        })
    }
}

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
