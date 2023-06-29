import Phaser from "phaser";
import MainScene from "./gameScene";

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [MainScene]
}

const GAME = new Phaser.Game(config)