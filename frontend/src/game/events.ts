import mitt from 'mitt';

// Player struct
export type PlayerState = {
  id: string;
  x: number;
  y: number;
};

export type GameEvents = {
  // init player when login
  'init-players': {
    selfId: string;
    players: PlayerState[];
  };

  // any player moving (backend to frontend)
  'player-move': {
    clientId: string;
    payload: { x: number; y: number };
  };

  // self-player moving (frontend to backend)
  'send-player-move': {
    x: number;
    y: number;
  };

  // any player joining (backend to frontend)
  'player-joined': {
    player: PlayerState;
  };

  // any player leaving (backend to frontend)
  'player-left': {
    playerId: string;
  }
};

export const gameEvents = mitt<GameEvents>();