import Phaser from "phaser";
import MainScene from "./gameScene";

function setLabel(id: string, text: string) {
    const label = document.getElementById(id);
    if (label == null) {
      throw Error("Cannot find label " + id);
    }
    label.innerText = text;
  }

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.CANVAS,
    width: 800,
    height: 600,
    scene: [MainScene],
    backgroundColor: "#1FFFFF"
}

const GAME = new Phaser.Game(config)

// GAME.scale.displaySize = 5
import { bridge } from "../bridge/bridge";

bridge.init((p)=>{setLabel("init-label", p);}).then(()=>{bridge.sendMessage("This is a game")})
bridge.onGenFin = (r)=>{
    console.log(r)
}