import Phaser from "phaser";

class MovingWalls {
    constructor(scene) {
        this.scene = scene;
        this.game = scene.game;
        console.log("game", this.game, this.scene);

        this.wallGroup = null;
        this.spriteGroup = null;
        this.wallSpeed = 300;

        let seed = Date.now();
        this.random = new Phaser.Math.RandomDataGenerator([seed]);

        this.initWalls();
    }

    initWalls() {
        this.wallHeight = this.random.integerInRange(
            20,
            this.game.config.height / 3
        );
        this.wallWidth = 200;

        let grunka = new Phaser.GameObjects.Graphics(this.scene, {
            x: 50,
            y: 50,
        })
            .lineStyle(5, 0xff00ff, 1.0)
            .beginPath()
            .moveTo(100, 100)
            .lineTo(200, 200)
            .closePath()
            .strokePath();

        let wallSprite = new Phaser.GameObjects.Graphics(this.scene);
        wallSprite.fillStyle(0xffffff, 1.0);
        wallSprite.fillRect(0, 0, this.wallWidth, this.wallHeight);

        let wallSpriteTexture = wallSprite.generateTexture("PAPPA");
        console.log(wallSpriteTexture);

        this.spriteGroup = this.scene.physics.add.group();
        //this.spriteGroup.enableBody = true;
        /*this.spriteGroup.createMultiple({
            quantity: 10,
            key: "PAPPA",
        });*/

        this.spriteGroup.add(this.scene.physics.add.sprite(0, 0, "PAPPA"));
        this.spriteGroup.add(this.scene.physics.add.sprite(0, 0, "PAPPA"));
        this.spriteGroup.add(this.scene.physics.add.sprite(0, 0, "PAPPA"));
        this.spriteGroup.add(this.scene.physics.add.sprite(0, 0, "PAPPA"));
        this.spriteGroup.add(this.scene.physics.add.sprite(0, 0, "PAPPA"));
        this.spriteGroup.add(this.scene.physics.add.sprite(0, 0, "PAPPA"));
        this.spriteGroup.add(this.scene.physics.add.sprite(0, 0, "PAPPA"));
        this.spriteGroup.add(this.scene.physics.add.sprite(0, 0, "PAPPA"));

        console.log(this.spriteGroup);
    }

    spawn() {
        console.log(
            this.spriteGroup.countActive(),
            this.spriteGroup.getChildren()
        );
        let wall = this.spriteGroup.getFirstDead();
        //let wall = this.spriteGroup.getFirstActive();

        console.log("first dead", wall);

        wall.body.gravity.y = 0;

        wall.reset(
            this.game.world.width,
            this.random.integerInRange(0, this.game.world.height)
        );

        wall.body.velocity.x = -this.wallSpeed;
        wall.body.immovable = true;

        //When the block leaves the screen, kill it
        wall.checkWorldBounds = true;
        wall.outOfBoundsKill = true;
    }
}

export default MovingWalls;
