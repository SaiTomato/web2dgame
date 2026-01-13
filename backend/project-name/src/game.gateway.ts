import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { GameService } from './game.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  // Add this line to ensure the handshake is stable over the tunnel
  transports: ['websocket'],
})
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private gameService: GameService) {}

  handleConnection(client: any, ...args: any[]) {
    console.log('クライアントが接続しました:', client.id);
    this.gameService.addPlayer(client.id, { id: client.id, x: 0, y: 0 });
    client.emit('initPlayers', {
      selfId: client.id,
      players: this.gameService.getAllPlayers(),
    });

    console.log('已发送 initPlayers', client.id);
  }

  handleDisconnect(client: any) {
    console.log('クライアントが切断しました:', client.id);
    this.gameService.removePlayer(client.id);
  }

  @SubscribeMessage('playerMove')
  handleMovement(client: any, payload: any) {
    console.log('クライアントからの移動メッセージ:', payload);
    this.gameService.updatePlayer(client.id, payload.x, payload.y);
  }

  @SubscribeMessage('chat')
  handleMessage(client: any, payload: any) {
    console.log('クライアントからのチャットメッセージ:', payload);

    this.server.emit('chat', {
      clientId: client.id,
      payload,
    });
  }
}
