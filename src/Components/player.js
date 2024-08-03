import playerImg from "../Assets/SpriteSheets/player.png";
import playerIdleImg from "../Assets/SpriteSheets/playerIdle.png";
import airParticle from "../Assets/Sprites/airParticle.png";
import Phaser from "phaser";

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene) {
    super(scene, 0, 0, "player"); // Initialize with scene and default position
    this.scene = scene;
    this.speed = 160;
    this.sprintSpeed = 215;
    this.emitter;
  }

  preload() {
    this.scene.load.spritesheet("player", playerImg, {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.scene.load.spritesheet("playerIdle", playerIdleImg, {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.scene.load.image("air", airParticle);
  }

  create(x, y) {
    this.setTexture("player");
    this.setPosition(x, y);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.setCollideWorldBounds(true);
    this.body.setSize(36, 50).setOffset(13, 10);

    this.createAnimations();
    this.getInputKeys();
    this.createAirParticle();
  }

  update() {
    this.movement();
  }

  getInputKeys() {
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.keyboard = this.scene.input.keyboard.addKeys({
      w: Phaser.Input.Keyboard.KeyCodes.W,
      a: Phaser.Input.Keyboard.KeyCodes.A,
      s: Phaser.Input.Keyboard.KeyCodes.S,
      d: Phaser.Input.Keyboard.KeyCodes.D,
      shift: Phaser.Input.Keyboard.KeyCodes.SHIFT,
    });
  }

  movement() {
    var speed = this.speed;

    if (this.keyboard.shift.isDown) {
      speed = this.sprintSpeed;
      this.isSprinting = true;
    } else {
      this.isSprinting = false;
    }

    let velocityX = 0;
    let velocityY = 0;

    if (this.cursors.left.isDown || this.keyboard.a.isDown) {
      velocityX = -speed;
      this.anims.play("left", true);
    } else if (this.cursors.right.isDown || this.keyboard.d.isDown) {
      velocityX = speed;
      this.anims.play("right", true);
    } else if (this.cursors.up.isDown || this.keyboard.w.isDown) {
      velocityY = -speed;
      this.anims.play("up", true);
    } else if (this.cursors.down.isDown || this.keyboard.s.isDown) {
      velocityY = speed;
      this.anims.play("down", true);
    } else {
      // Player is not moving
      this.anims.stop(); // Stop the current animation

      // Set the frame based on the last direction
      if (this.anims.currentAnim && this.anims.currentAnim.key === "left") {
        this.setFrame(4); // First frame of the 'left' animation
      } else if (
        this.anims.currentAnim &&
        this.anims.currentAnim.key === "right"
      ) {
        this.setFrame(8); // First frame of the 'right' animation
      } else if (
        this.anims.currentAnim &&
        this.anims.currentAnim.key === "up"
      ) {
        this.setFrame(12); // First frame of the 'up' animation
      } else if (
        this.anims.currentAnim &&
        this.anims.currentAnim.key === "down"
      ) {
        this.setFrame(0); // First frame of the 'down' animation
      }
    }

    // Normalize diagonal movement
    if (velocityX !== 0 && velocityY !== 0) {
      velocityX *= Math.SQRT1_2;
      velocityY *= Math.SQRT1_2;
    }

    this.body.setVelocity(velocityX, velocityY);

    // Emit particles when sprinting
    if (this.isSprinting && (velocityX != 0 || velocityY != 0)) {
      this.emitter.emitParticleAt(this.x, this.y + this.displayHeight / 2 - 5);
    }
  }

  createAnimations() {
    // Idle
    this.scene.anims.create({
      key: "idle",
      frames: this.scene.anims.generateFrameNumbers("playerIdle", {
        start: 0,
        end: 0,
      }),
      frameRate: 4,
      repeat: -1,
    });

    // Moving
    this.scene.anims.create({
      key: "right",
      frames: this.scene.anims.generateFrameNumbers("player", {
        start: 8,
        end: 11,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.scene.anims.create({
      key: "left",
      frames: this.scene.anims.generateFrameNumbers("player", {
        start: 4,
        end: 7,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.scene.anims.create({
      key: "up",
      frames: this.scene.anims.generateFrameNumbers("player", {
        start: 12,
        end: 15,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.scene.anims.create({
      key: "down",
      frames: this.scene.anims.generateFrameNumbers("player", {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });
  }

  createAirParticle() {
    this.emitter = this.scene.add.particles(0, 0, "air", {
    //   speed: 20,
    //   scale: 0.4,
    //   duration: 50,
    //   emitting: false,

      speed: 1,
      angle: { min: 0, max: 0 },
      scale: { start: 0.6, end: 0.4 },
      blendMode: "ADD",
      lifespan: 200,
      quantity: 1,
      frequency: -1, // Disable automatic emitting
    });

    this.emitter.setDepth(-1);

    // this.emitter.startFollow(
    //   this,
    //   this.displayWidth / 2,
    //   this.displayHeight / 2,
    //   true
    // );
  }
}
