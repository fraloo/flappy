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
        // this.wallHeight = this.random.integerInRange(
        //     20,
        //     this.game.config.height / 3
        // );
        this.wallHeight = 200;
        this.wallWidth = 200;
        console.log({ wh: this.wallHeight });

        let wallSprite = new Phaser.GameObjects.Graphics(this.scene);
        wallSprite.fillStyle(0xffffff, 1.0);
        wallSprite.fillRect(800, 500, this.wallWidth, this.wallHeight);

        let wallSpriteTexture = wallSprite.generateTexture("PAPPA");
        console.log(wallSpriteTexture);

        this.spriteGroup = this.scene.physics.add.group();
        // this.spriteGroup.enableBody = true;
        /*this.spriteGroup.createMultiple({
            quantity: 10,
            key: "PAPPA",
        });*/

        const theSprite = this.scene.physics.add.sprite(0, 0, "PAPPA");
        theSprite.body.setGravityY(0);
        theSprite.body.setAllowGravity(false);
        theSprite.setImmovable(true);
        this.spriteGroup.add(theSprite);

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
        if (!wall) {
            return;
        }

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
