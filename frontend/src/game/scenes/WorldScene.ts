import Phaser from 'phaser';
import { colorFromId, Player } from '@/game/entities/Player';
import { Wall } from '@/game/entities/wall';
import { gameEvents, PlayerState } from '../events';


export class WorldScene extends Phaser.Scene {

    player!: Player;
    private walls: Wall[] = [];

    constructor() {
        super('world');
    }

    private myId!: string;
    private players = new Map<string, Player>();

    private onInitPlayers = (data: any) => {
        this.myId = data.selfId;

        data.players.forEach((p: any) => {
            const isLocal = p.id === this.myId;

            const player = new Player(this, {
                id: p.id,
                x: p.x,
                y: p.y,
                // color: isLocal ? 0x00ff00 : colorFromId(p.id),
                color: colorFromId(p.id),
                isLocal,
            });

            this.players.set(p.id, player);

            if (isLocal) {
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

        this.time.addEvent({
            delay: 2000, // 2秒ごとに
            callback: this.spawnWall,
            callbackScope: this,
            loop: true,
        });
    }

    private onPlayerMove = ({ clientId, payload }: any) => {
        if (clientId === this.myId) return;

        const player = this.players.get(clientId);
        player?.setPosition(payload.x, payload.y);
    }

    private onPlayerJoined = ({ player }: { player: PlayerState }) => {
        // if (player.id === this.myId) return;
        if (this.players.has(player.id)) return;

        const isLocal = player.id === this.myId;

        const newPlayer = new Player(this, {
            id: player.id,
            x: player.x,
            y: player.y,
            color: isLocal ? 0x00ff00 : colorFromId(player.id),
            isLocal,
        });

        this.players.set(player.id, newPlayer);

        if (isLocal) {
            this.player = newPlayer;
        }
    };

    private onPlayerLeft = ({ playerId }: { playerId: string }) => {
        const player = this.players.get(playerId);
        if (!player) return;

        player.destroy();
        this.players.delete(playerId);

        if (playerId === this.myId) {
            this.player = undefined!;
        }
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

        //WALL
        this.walls = this.walls.filter((wall) => wall.update());
    }

    private onShutdown() {
        gameEvents.off('init-players', this.onInitPlayers);
        gameEvents.off('player-move', this.onPlayerMove);
        gameEvents.off('player-joined', this.onPlayerJoined);
        gameEvents.off('player-left', this.onPlayerLeft);
    }

    private spawnWall() {
        const x = 800;
        const y = Phaser.Math.Between(50, 550);
        const id = Date.now(); // Unique ID based on timestamp 
        this.walls.push(new Wall(this, { id, x, y }));
    }
}

