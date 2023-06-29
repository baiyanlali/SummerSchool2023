import Phaser from "phaser";

const W = 'w'
const S = 's'
const A = 'a'
const D = 'd'
const J = 'j'
const K = 'k'
const Z = 'z'
const X = 'x'
const UP = 'arrowUp'
const DOWN = 'arrowDown'
const LEFT = 'arrowLeft'
const RIGHT = 'arrowRight'
const speed = 0.1

export default class Player extends Phaser.GameObjects.Container{

    movement = [0, 0]
    isAC = false
    isBC = false

    constructor(scene: Phaser.Scene, x: number, y: number){
        super(scene, x, y)

        const player_img = scene.add.sprite(0, 0, "player").setOrigin(0.5, 1)

        this.add(player_img)

        scene.input.keyboard?.on('keydown', event => {
            this.toggleKey(event.key, true)
        });

        scene.input.keyboard?.on('keyup', event => {
            this.toggleKey(event.key, false)
        });
    }

    toggleKey(key: String, isDown: boolean): void{
        switch (key) {
            case A:
            case LEFT:
                this.movement[0] = isDown ? -1 : 0
                break
            case D:
            case RIGHT:
                this.movement[0] = isDown ? 1 : 0
                break
            case UP:
            case W:
                this.movement[1] = isDown ? -1 : 0
                break
            case S:
            case DOWN:
                this.movement[1] = isDown ? 1 : 0
                break
            case K:
            case X:
                this.isBC = isDown
                break
            case J:
            case Z:
                this.isAC = isDown
                break
        }
    }

    preUpdate(){
        
    }

    update(d: number): void {
        this.x += this.movement[0] * d * speed
        this.y += this.movement[1] * d * speed
    }
}