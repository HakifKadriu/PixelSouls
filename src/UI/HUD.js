import Phaser from "phaser";

export default class HUD extends Phaser.GameObjects.Container {
  constructor(scene) {
    super(scene);
    this.scene = scene;
    this.maxHealth = 100;
    this.health = this.maxHealth;

    // Add this container to the scene
    this.scene.add.existing(this);

    // Set up the HUD elements
  }

  create() {
    // Example HUD element: Score text
    // this.scoreText = this.scene.add.text(16, 16, "Score: 0", {
    //   font: "26px Arial",
    //   fill: "#FFF",
    // });
    this.healthBar = this.scene.add.graphics();
    // this.updateHealthBar();

    // Position the container
    this.setPosition(0, 0);
  }

  update() {
    this.updateHealthBar();
  }

  updateHealthBar() {
    this.healthBar.clear();

    // definitions
    const barWidth = this.maxHealth;
    const barHeight = 15;
    const barX = 10;
    const barY = 10;

    // add red color
    this.healthBar.fillStyle(0xff0000);
    this.healthBar.fillRect(barX, barY, barWidth, barHeight);
    this.healthBar.strokeRect(50, 50, 400, 200);

    // calculate health width
    const healthWidth = (this.health / this.maxHealth) * barWidth;

    // pass health width to the bar with green color this  time
    this.healthBar.fillStyle(0x00ff00);
    this.healthBar.fillRect(barX, barY, healthWidth, barHeight);
  }

  // Add more HUD methods as needed
}
