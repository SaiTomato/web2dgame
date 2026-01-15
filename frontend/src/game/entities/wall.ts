import Phaser from 'phaser';

export class Wall{
readonly body: number;
topWall: Phaser.GameObjects.Rectangle;
bottomWall: Phaser.GameObjects.Rectangle;
private wallgap:number=150;

    constructor (
        private scene: Phaser.Scene, 
        config: {id:number; x: number; y: number; })
    {
        this.body=config.id;
        const wallHeight=600;
        const wallWidth=32;

        this.topWall = scene.add.rectangle(
            config.x,
            config.y,
            wallWidth,
            wallHeight,
            0xffff00
        );
        this.topWall.setOrigin(0.5,1); // Set origin to bottom center

        this.bottomWall = scene.add.rectangle(
            config.x,
            config.y + this.wallgap, // Adjusted for gap
            wallWidth,
            wallHeight,
            0xffff00
        );
        this.bottomWall.setOrigin(0.5,0); // Set origin to top center
    }

    update():boolean{

        const speed = 5 ;
        this.topWall.x -= speed;
        this.bottomWall.x -= speed;
        if(this.topWall.x<=0){
            this.topWall.destroy();
            this.bottomWall.destroy();
            return false;
        }
        else return true;
    }
}