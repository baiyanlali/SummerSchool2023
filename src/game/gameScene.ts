import Phaser from "phaser";
import tile from "../../public/images/Tilemap/tilemap_packed.png"
import playerimg from "../../public/images/Tiles/tile_0085.png"
import itemimg from "../../public/images/Tiles/tile_0072.png"
import Item from "./item"
import Player from "./player";

export default class MainScene extends Phaser.Scene{
    constructor(){
        super('main')
    }

    preload(){
        this.load.image('background', tile)
        this.load.image('player', playerimg)
        this.load.image('item', itemimg)
    }
    player
    item
    create(){
        this.add.image(0, 0, 'background').setOrigin(0, 0)
        const array =[[0,1,3],[0,1,2],[0,1,2]]
        const map = this.make.tilemap({data: array, tileWidth: 16, tileHeight: 16})
        map.addTilesetImage("background", "background", 16, 16)
        const layer = map.createLayer(0, "background", 0, 0)

        this.player = new Player(this, 400, 300)
        this.add.existing(this.player)

        this.item = new Item(this, 500, 400, "Box")
        this.add.existing(this.item)
    }

    update(time: number, delta: number): void {
      this.player.update(delta)
      this.collision_detect()
    }

    collision_detect() {
      let dx = this.player.x - this.item.x
      let dy = this.player.y - this.item.y
      if (dx * dx + dy * dy < 100 && !this.item.collected) {
        console.log('Collision')
        this.item.on_collected()
      }
    }
}