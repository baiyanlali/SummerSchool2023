import Phaser from "phaser";
import MainScene from "./gameScene";

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.CANVAS,
    width: 800,
    height: 600,
    scene: [MainScene],
    backgroundColor: "#1FFFFF"
}

const GAME = new Phaser.Game(config)
// GAME.scale.displaySize = 5
