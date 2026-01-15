import Phaser from 'phaser';

export class Wall{
readonly body: number;
sprite: Phaser.GameObjects.Rectangle;

    constructor (
        private scene: Phaser.Scene, 
        config: {id:number; x: number; y: number; })
    {
        this.body=config.id;
        this.sprite = scene.add.rectangle(
            config.x,
            config.y,
            8,
            16,
            0xffff00
        );
    }

    update():boolean{

        const speed = 8;
        this.sprite.x -= speed;
        console.log("Wall position:", this.sprite.x); 


        if(this.sprite.x<=50){
            this.sprite.destroy();
            return false;
        }
        else return true;
    }

    spawn (x:number, y:number)
    {
        this.sprite.setPosition(x, y);
    }
}
