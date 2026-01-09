import Phaser from 'phaser';
import { WorldScene } from './scenes/WorldScene';

let game: Phaser.Game | null = null;

export function startGame(container: HTMLElement) {
  if (game) {
    return game;
  }

  game = new Phaser.Game({
    type: Phaser.AUTO,
    parent: container,
    width: 800,
    height: 600,
    backgroundColor: '#1e1e1e',
    scene: [WorldScene],
  });

  return game;
}

export function stopGame() {
  game?.destroy(true);
  game = null;
}