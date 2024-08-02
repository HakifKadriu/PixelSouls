import Phaser from 'phaser';
import playerImg from '../Assets/Sprites/Player.png';

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        this.load.image('player', playerImg);
    }

    create() {
        this.add.image(400, 300, 'player');
    }

    update() {
        // Game logic
    }
}

export default GameScene;
