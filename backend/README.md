# Web2D Game - Backend Server

2D Multiplayer Game Backend built with NestJS and Socket.IO for real-time player movement and chat.

## Quick Start

```bash
cd project-name
npm install
npm run start:dev
```

Server runs on `http://localhost:3000`

---

## Frontend Integration Guide

### WebSocket Connection

Connect using Socket.IO client:

```javascript
import io from 'socket.io-client';

w

socket.on('connect', () => {
  console.log('Connected to game server!');
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});
```

### Events to Send (Client → Server)

#### Player Movement
Send when player position changes:
```javascript
socket.emit('playerMove', {
  x: 100,
  y: 200
});
```

#### Chat Message
Send chat messages:
```javascript
socket.emit('chat', {
  username: 'PlayerName',
  message: 'Hello world!',
  timestamp: Date.now()
});
```

### Events to Listen (Server → Client)

#### Player Move Broadcast
Receive when any player moves:
```javascript
socket.on('playerMove', (data) => {
  // data = { clientId: 'socket-id', payload: { x, y } }
  console.log(`Player ${data.clientId} moved to (${data.payload.x}, ${data.payload.y})`);
});
```

#### Chat Broadcast
Receive chat messages from all players:
```javascript
socket.on('chat', (data) => {
  // data = { clientId: 'socket-id', payload: { username, message, timestamp } }
  console.log(`${data.payload.username}: ${data.payload.message}`);
});
```

---

## Architecture

- **GameGateway** - Handles WebSocket connections and events
- **GameService** - Manages player state and game logic
- **Player Interface** - Tracks: id, x, y coordinates

## Features

✓ Real-time player movement synchronization  
✓ Chat messaging system  
✓ Player connection/disconnection tracking  
✓ CORS enabled for development  

## Configuration

Server listens on port **3000**. Update in `src/main.ts` if needed.

CORS is set to `*` (allow all origins) in `src/game.gateway.ts` - change for production.
