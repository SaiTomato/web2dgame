import Phaser from 'phaser';
import { Player } from '@/game/entities/Player';
import { gameEvents } from '../events';

export class WorldScene extends Phaser.Scene {

    player!: Player;
    constructor() {
        super('world');
    }

    private onInitPlayers = (data: any) => {
        console.log('收到初始玩家数据', data);
    };

    private onPlayerMove = (data: any) => {
        console.log('有玩家移动', data);
    };

    create() {
        this.player = new Player(this, 400, 300);

        gameEvents.on('init-players', this.onInitPlayers);
        gameEvents.on('player-move', this.onPlayerMove);

        this.events.once(
        Phaser.Scenes.Events.SHUTDOWN,
        this.onShutdown,
        this
        );
    }

    override update() {
        this.player.update();
    }

    private onShutdown() {
        gameEvents.off('init-players', this.onInitPlayers);
        gameEvents.off('player-move', this.onPlayerMove);
    }
}