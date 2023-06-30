import Phaser from "phaser";
import tile from "../../public/images/Tilemap/tilemap_packed.png"
import playerimg from "../../public/images/Tiles/tile_0085.png"
import boximg from "../../public/images/Tiles/tile_0072.png"
import guitarimg from "../../public/images/Tiles/tile_0073.png"
import phoneimg from "../../public/images/Tiles/tile_0074.png"
import riddleimg from "../../public/images/Tiles/tile_0075.png"
import Item from "./item"
import Player from "./player";
import { bridge } from "../bridge/bridge";
import { PROMPT } from "../bridge/prompt";

export default class MainScene extends Phaser.Scene{
    constructor(){
        super('main')
    }

    preload(){
        this.load.image('background', tile)
        this.load.image('player', playerimg)
        this.load.image('Box', boximg)
        this.load.image('Guitar', guitarimg)
        this.load.image('Phone', phoneimg)
        this.load.image('riddle', riddleimg)
    }
    player: Player
    items: Item[]
    aside: Phaser.GameObjects.Text
    create(){
        this.add.image(0, 0, 'background').setOrigin(0, 0)
        const array =[[0,1,3],[0,1,2],[0,1,2]]
        const map = this.make.tilemap({data: array, tileWidth: 16, tileHeight: 16})
        map.addTilesetImage("background", "background", 16, 16)
        const layer = map.createLayer(0, "background", 0, 0)

        this.player = new Player(this, 400, 300)
        this.add.existing(this.player)

        this.items = [
          new Item(this, 500, 400, "Box"),
          new Item(this, 200, 300, "Guitar"),
          new Item(this, 400, 100, "Phone")
        ]
        this.items.forEach(
          (item, index, number) =>
          this.add.existing(item)
        )
        
        this.aside = this.add.text(50, 500, "asfdsadfsdflkjasdf;lkjsvlkasn;lajsdf;lkajsf;alsdkjf;aslkdfj;adfkj;asdfkj;aslkdfjaslfhjaueyrqw;ekjfnasdj,vhlakufhweaufrqoiuewr",
        {align: 'center', stroke: '#000', strokeThickness: 2, fontSize: '20px'
        , fixedHeight: 100, fixedWidth: 600, maxLines: 3, wordWrap: { width: 600, useAdvancedWrap: true }})
    }

    update(time: number, delta: number): void {
      this.player.update(delta)
      this.items.forEach((item, index, number) => {
        item.update(this.player)
      });      
    }

}
