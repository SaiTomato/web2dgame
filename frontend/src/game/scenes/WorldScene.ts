import Phaser from 'phaser';
import { Player } from '@/game/entities/Player';
import { gameEvents, PlayerState } from '../events';

export class WorldScene extends Phaser.Scene {

    player!: Player;
    constructor() {
        super('world');
    }

    private myId!: string;
    private players = new Map<string, Player>();

    private onInitPlayers = (data: any) => {
        this.myId = data.selfId;

        data.players.forEach((p: any) => {
            const isSelf = p.id === this.myId;

            const player = new Player(
            this,
            p.x,
            p.y,
            isSelf        // 👈 只有自己能动 only yourself can move
            );

            this.players.set(p.id, player);

            if (isSelf) {
                this.player = player; // 👈 关键！　point
            }
        });
    };

    create() {
        // this.player = new Player(this, 400, 300);

        gameEvents.on('init-players', this.onInitPlayers);
        gameEvents.on('player-move', this.onPlayerMove);
        gameEvents.on('player-joined', this.onPlayerJoined);
        gameEvents.on('player-left', this.onPlayerLeft);

        this.events.once(
        Phaser.Scenes.Events.SHUTDOWN,
        this.onShutdown,
        this
        );
    }

    private onPlayerMove = ({ clientId, payload }: any) => {
        if (clientId === this.myId) return;

        const player = this.players.get(clientId);
        player?.setPosition(payload.x, payload.y);
    }

    private onPlayerJoined = ({ player }: { player: PlayerState }) => {
        if (player.id === this.myId) return;

        const newPlayer = new Player(this, player.x, player.y);
        this.players.set(player.id, newPlayer);
    };

    private onPlayerLeft = ({ playerId }: { playerId: string }) => {
        const player = this.players.get(playerId);
        if (!player) return;

        player.destroy();
        this.players.delete(playerId);
    };

    override update() {
        if (!this.player) return;
        const moved = this.player.update();

        if (moved) {
            gameEvents.emit('send-player-move', {
            x: this.player.x,
            y: this.player.y,
            });
        }
    }

    private onShutdown() {
        gameEvents.off('init-players', this.onInitPlayers);
        gameEvents.off('player-move', this.onPlayerMove);
        gameEvents.off('player-joined', this.onPlayerJoined);
        gameEvents.off('player-left', this.onPlayerLeft);
    }
}