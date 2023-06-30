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

if(true){
    const stories: Array<String> = []
    bridge.init((p)=>{setLabel("init-label", p);}).then(()=>{bridge.
        sendMessage("This is a game where player vincent collect what he lost, please polish every sentence you have met to make like a story. Answer this sentence with no more than 5 words.")})
    bridge.onGenFin = (r)=>{
        gameMainScene.aside.text = r
        stories.push(r)
        setLabel("generate-label", stories.join("<br>"))
        // console.log(r)
    }
    bridge.onProgress = (s, m)=>{
        gameMainScene.aside.text = m
        // console.log(m)
    }
}

