import Phaser from 'phaser';
import { Player } from '@/game/entities/Player';

export class WorldScene extends Phaser.Scene {

    player!: Player;
    constructor() {
        super('world');
    }

    create() {
        // this.add.text(100, 100, 'Phaser is running!', {
        // fontSize: '24px',
        // color: '#ffffff',
        // });
        this.player = new Player(this, 400, 300);
    }

    override update() {
        this.player.update();
    }
}