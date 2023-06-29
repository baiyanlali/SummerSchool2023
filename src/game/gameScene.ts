import Phaser from "phaser";
import tile from "../../public/images/Tilemap/tilemap_packed.png"

export default class MainScene extends Phaser.Scene{
    constructor(){
        super('main')
    }

    preload(){
        this.load.image('background', tile)
    }

    create(){
        this.add.image(0, 0, 'background').setOrigin(0, 0)
        console.log("hello")
        const array =[[0,1,3],[0,1,2],[0,1,2]]
        const map = this.make.tilemap({data: array, tileWidth: 16, tileHeight: 16})
        map.addTilesetImage("tilemap", "tiles", 16, 16)
        const layer = map.createLayer(0, "tilemap", 0, 0)
    }
}