import mitt from 'mitt';

type GameEvents = {
  'init-players': any;
  'player-move': any;
};

export const gameEvents = mitt<GameEvents>();