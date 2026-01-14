import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { GameService } from './game.service';
import { Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GameLog } from './entities/log.entity';
import { Repository } from 'typeorm';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
    // Add this line to ensure the handshake is stable over the tunnel
    transports: ['websocket'],
})
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect    {
    @WebSocketServer()
    server: Server;

    constructor(
        private gameService: GameService,
        @InjectRepository(GameLog)
        private gameLogRepository: Repository<GameLog>,
    ) { }

    async handleConnection(client: any, ...args: any[]) {
        console.log('クライアントが接続しました:', client.id);

        const log=this.gameLogRepository.create({
            clientId: client.id,
            action: 'connect',
        });

        await this.gameLogRepository.save(log);

        this.gameService.addPlayer(client.id, { id: client.id, x: 0, y: 0 });

        // Crucial: Tell the new player who everyone else is
        client.emit('initPlayers', {
            selfId: client.id,
            players: this.gameService.getAllPlayers(),
        });

        console.log('initPlayers送信済み', client.id);
    }
    
    handleDisconnect(client: any) {
        console.log('クライアントが切断しました:', client.id);
        console.log('現在時刻:', new Date());

        this.gameService.removePlayer(client.id);
    }

    @SubscribeMessage('playerMove')
    handleMovement(client: any, payload: any) {
        console.log('クライアントからの移動メッセージ:', payload);

        const log=this.gameLogRepository.create({
            clientId: client.id,
            action: 'playerMove',
            payload,
        });

        this.gameLogRepository.save(log);

        this.gameService.updatePlayer(client.id, payload.x, payload.y);
        this.server.emit('playerMove', {
            clientId: client.id,
            payload
        });
    }

    @SubscribeMessage('chat')
    asynchandleMessage(client: any, payload: any) {
        console.log('クライアントからのチャットメッセージ:', payload);

        const log=this.gameLogRepository.create({
            clientId: client.id,
            action: 'chat',
            payload,
        });

        this.gameLogRepository.save(log);

        this.server.emit('chat', {
            clientId: client.id,
            payload
        });
    }
}



