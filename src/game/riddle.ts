import Phaser from "phaser";
import Player from "./player";

export default class Riddle extends Phaser.GameObjects.Container{
  triggered: boolean
  active: boolean
  question: string
  answer: string
  timeleft: number
  text

  constructor(scene: Phaser.Scene, x: number, y: number, q: string, a: string){
    super(scene, x, y)

    const img = scene.add.sprite(0, 0, "riddle").setOrigin(0.5, 1)

    this.add(img)
    this.question = q
    this.answer = a
    this.triggered = false
    this.active = true
    this.timeleft = 60.0
  }  

  update(player: Player, delta: number) {
    let dx = player.x - this.x
    let dy = player.y - this.y
    if (dx * dx + dy * dy < 100 && ! this.triggered) {
      this.triggered = true
    }
    if (this.triggered && this.active) {
      this.text = this.scene.add.text(
        50, 100, this.question, {
          align: 'center', stroke: '#000', strokeThickness: 2, fontSize: '20px', fixedHeight: 100, fixedWidth: 600, maxLines: 3, wordWrap: { width: 600, useAdvancedWrap: true }}
      )
    }
  }

}