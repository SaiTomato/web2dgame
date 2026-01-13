import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({ providedIn: 'root' })
export class SocketService {
  private socket!: Socket;

  connect() {
    if (this.socket) return;

    this.socket = io('http://localhost:3000', {
      transports: ['websocket'],
    });
  }

  on(event: string, handler: (...args: any[]) => void) {
    this.socket.on(event, handler);
  }

  emit(event: string, data?: any) {
    this.socket.emit(event, data);
  }

  disconnect() {
    this.socket?.disconnect();
    this.socket = undefined as any;
  }
}