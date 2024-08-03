import Phaser from "phaser";
import GameScene from "./Scenes/GameScene";
import "./style.css";
import * as consts from './consts/consts';


const config = {
  type: Phaser.WEBGL,
  width: consts.sizes.width,
  height: consts.sizes.height,
  canvas: gameCanvas,
  scene: [GameScene],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: true,
    },
  },
};

const game = new Phaser.Game(config);
