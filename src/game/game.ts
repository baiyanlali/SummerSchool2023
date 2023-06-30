import Phaser from "phaser";
import MainScene from "./gameScene";

function setLabel(id: string, text: string) {
    const label = document.getElementById(id);
    if (label == null) {
      throw Error("Cannot find label " + id);
    }
    label.innerText = text;
}

const gameMainScene = new MainScene()

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.CANVAS,
    width: 800,
    height: 600,
    scene: [gameMainScene],
    backgroundColor: "#1FFFFF",
    parent: "game"
}

const GAME = new Phaser.Game(config)

// GAME.scale.displaySize = 5
import { bridge } from "../bridge/bridge";
import { PROMPT } from "../bridge/prompt";

if(true){
    const stories: Array<String> = []
    bridge.init((p)=>{setLabel("init-label", p);})
    bridge.sendMessage(PROMPT.BEGIN())
    bridge.onGenFin = (r)=>{
        gameMainScene.aside.text = r
        stories.push(r)
        setLabel("generate-label", stories.join("\n"))
        // console.log(r)
    }
    bridge.onProgress = (s, m)=>{
        gameMainScene.aside.text = m
        // console.log(m)
    }
}

