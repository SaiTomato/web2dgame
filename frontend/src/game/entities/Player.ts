import Phaser from 'phaser';

export class Player {
  readonly id: string;
  readonly isLocal: boolean;

  sprite: Phaser.GameObjects.Rectangle;
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor(
    private scene: Phaser.Scene,
    config: {
      id: string;
      x: number;
      y: number;
      color: number;
      isLocal: boolean;
    }
  ) {
    this.id = config.id;
    this.isLocal = config.isLocal;

    this.sprite = scene.add.rectangle(
      config.x,
      config.y,
      32,
      32,
      config.color
    );

    if (this.isLocal) {
      this.cursors = scene.input.keyboard!.createCursorKeys();
      this.sprite.setStrokeStyle(2, 0xffffff); //add border
    }
  }

  update(): boolean {
    if (!this.isLocal || !this.cursors) return false;

    const speed = 4;
    let moved = false;

    if (this.cursors.left.isDown) {
      this.sprite.x -= speed;
      moved = true;
    }
    if (this.cursors.right.isDown) {
      this.sprite.x += speed;
      moved = true;
    }
    if (this.cursors.up.isDown) {
      this.sprite.y -= speed;
      moved = true;
    }
    if (this.cursors.down.isDown) {
      this.sprite.y += speed;
      moved = true;
    }

    return moved;
  }

  destroy() {
    this.sprite.destroy();
  }

  setPosition(x: number, y: number) {
    this.sprite.setPosition(x, y);
  }

  get x() {
    return this.sprite.x;
  }

  get y() {
    return this.sprite.y;
  }
}

// function that set color from player's ID
export function colorFromId(id: string): number {
  // let hash = 0;
  // for (let i = 0; i < id.length; i++) {
  //   hash = id.charCodeAt(i) + ((hash << 5) - hash);
  // }

  // // Phaser use 0xRRGGBB
  // const color = hash & 0x00ffffff;
  // return color;

  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }

  const r = (hash >> 0) & 0xff;
  const g = (hash >> 8) & 0xff;
  const b = (hash >> 16) & 0xff;

  return (r << 16) | (g << 8) | b;
}