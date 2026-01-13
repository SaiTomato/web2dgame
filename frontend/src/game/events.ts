import mitt from 'mitt';

type GameEvents = {
  'init-players': {
    selfId: string;
    players: { id: string; x: number; y: number }[];
  };

  'player-move': {
    clientId: string;
    payload: { x: number; y: number };
  };

  // 👇 前端 → socket 用
  'send-player-move': {
    x: number;
    y: number;
  };
};

export const gameEvents = mitt<GameEvents>();