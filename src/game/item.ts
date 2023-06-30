import Phaser from "phaser";
import Player from "./player";
import { bridge } from "../bridge/bridge";
import { PROMPT } from "../bridge/prompt";

export default class Item extends Phaser.GameObjects.Container{
  collected

  constructor(scene: Phaser.Scene, x: number, y: number, name: string){
    super(scene, x, y)

    const img = scene.add.sprite(0, 0, name).setOrigin(0.5, 1)

    this.add(img)
    this.name = name
    this.collected = false;
  }  

  update(player: Player) {
    let dx = player.x - this.x
    let dy = player.y - this.y
    if (dx * dx + dy * dy < 100 && ! this.collected) {
      this.collected = true
      bridge.sendMessage(PROMPT.PICK("vincent", this.name, "his room", 30))
      bridge.sendMessage(PROMPT.ITEM_CHECK(player.item_list.toString(), false))
      player.get_item(this.name)

      console.log(this.name + " is collected")
      console.log(  "You have " + player.item_list.toString())
      console.log(  `You have ${player.item_list.toString()}` )
      this.destroy()
    }
  }

}