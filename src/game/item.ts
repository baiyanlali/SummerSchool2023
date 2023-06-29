import Phaser from "phaser";

export default class Item extends Phaser.GameObjects.Container{
  collected

  constructor(scene: Phaser.Scene, x: number, y: number, name: string){
    super(scene, x, y)

    const img = scene.add.sprite(0, 0, "item").setOrigin(0.5, 1)

    this.add(img)
    this.name = name
    this.collected = false;
  }  

  on_collected() {
    console.log(this.name + " is collected")
    this.collected = true
  }
}