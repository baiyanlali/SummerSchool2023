import Phaser from "phaser";
import Player from "./player";
import Item from "./item";

export default class Riddle extends Phaser.GameObjects.Container{
  triggered: boolean
  active: boolean
  question: string
  answer: string
  timeleft: number
  entries: Item[]
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
    if (!this.active) return

    let dx = player.x - this.x
    let dy = player.y - this.y
    if (dx * dx + dy * dy < 100 && !this.triggered) {
      this.on_trigger()
    }
    if (this.triggered) {
      this.text.text = `${this.question}\nYou need to answer it in ${this.timeleft.toFixed(1)} seconds`
      this.timeleft -= delta / 1000

      this.check_entries(player)
    }
    if (this.timeleft <= 0) {
      this.safe_destroy()
    }
  }

  on_trigger() {
    this.text = this.scene.add.text(
      50, 100, `${this.question}\nYou need to answer it in ${this.timeleft.toFixed(2)} seconds`, {
        align: 'center', stroke: '#000', strokeThickness: 2, fontSize: '20px', fixedHeight: 100, fixedWidth: 600, maxLines: 3, wordWrap: { width: 600, useAdvancedWrap: true }}
    )
    this.entries = [
      new Item(this.scene, this.x - 100, this.y + 50, "1"),
      new Item(this.scene, this.x, this.y + 50, "2"),
      new Item(this.scene, this.x + 100, this.y + 50, "3")
    ]
    this.entries.forEach(
      (item, index, number) =>
      this.scene.add.existing(item)
    )
    this.triggered = true
  }

  check_entries(player: Player) {
    let answer_submitted = false
    this.entries.forEach((item, index, number) =>{
      if (!answer_submitted && item.check_collected(player)) {
        const player_answer = item.name
        if (player_answer === this.answer) {
          player.get_item("Award")
          console.log("You get award")
        } else {
          console.log("You do not get award")
        }
        answer_submitted = true
      }
    });
    if (answer_submitted) {
      this.entries.forEach((item, index, number) =>{
        item.destroy()
      });
      this.safe_destroy()
    }
  }

  safe_destroy() {
    this.active = false
    this.text.destroy()
    this.destroy()
  }
}