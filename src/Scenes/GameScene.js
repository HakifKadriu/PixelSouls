import Phaser from "phaser";
import * as consts from "../consts/consts";
import bg from "../Assets/Sprites/bg.jpg";
import Player from "../Components/player";
import HUD from "../UI/HUD";

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
  }

  preload() {
    this.load.image("bg", bg);
    this.player = new Player(this);
    this.player.preload();

    this.hud = new HUD(this);
  }

  create() {
    let image = this.add.image(
      consts.sizes.width / 2,
      consts.sizes.height / 2,
      "bg"
    );
    let scaleX = consts.sizes.width / image.width;
    let scaleY = consts.sizes.height / image.height;
    let scale = Math.max(scaleX, scaleY);
    image.setScale(scale).setScrollFactor(0);
    image.setDepth(-1);

    this.player.create(50, consts.sizes.height / 2);

    this.hud.create();
  }

  update() {
    // Game logic
    this.player.update();
    this.hud.update();
  }
}

export default GameScene;
