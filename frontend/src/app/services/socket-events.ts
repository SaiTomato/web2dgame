import { SocketService } from '@/app/services/socket.service';
import { gameEvents } from '@/game/events';

export function bindSocketEvents(socket: SocketService) {

  socket.on('initPlayers', data => {
    gameEvents.emit('init-players', data);
  });

  socket.on('playerMove', data => {
    gameEvents.emit('player-move', data);
  });

  gameEvents.on('send-player-move', payload => {
    socket.emit('playerMove', payload);
  });

  // new player join
  socket.on('playerJoined', data => {
    gameEvents.emit('player-joined', data);
  });

  // any player left
  socket.on('playerLeft', data => {
    gameEvents.emit('player-left', data);
  });
}